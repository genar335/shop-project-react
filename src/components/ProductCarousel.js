import React from 'react'
import Axios from 'axios'
// A premade Carousel
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, ButtonPlay, Image, Dot, DotGroup } from 'pure-react-carousel';import circle from '../GAssests/circle.svg'
import 'pure-react-carousel/dist/react-carousel.es.css';
import './componentStyles/ProductCarousel.css'

export class ProductCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.urlForProducts = 'http://localhost:1337/products'
        this.devURL = 'http://localhost:1337'
        this.state = {
            feauterdImgSrc: [],
            ImgObjects: [],
            ImgIndicators: []
        }
        this.amount = 10
        
    }

    getProductsData = (url) => { // Returns an arrray of products in JSON from
        Axios.get(url)
            .then(res => this.mappingImages(res.data))
            .catch(error => alert(error))
    }

    componentDidMount = () => {
        this.getProductsData(this.urlForProducts)
    } 

    componentWillUnmount = () =>
        clearInterval(this.interval)

    mappingImages = (arrayOfProducts) => {
        const feauterdImgSrc = arrayOfProducts.map(ele => 
            // Only get a URL if the product is feautured
            // Otherwise return undefined
            ((ele.featured) && (ele.mainPhoto !== undefined)) ? 
                this.devURL + ele.mainPhoto.url :
                undefined            
        // Filter out the undefined elements of the array
        ).filter(ele => ele !== undefined)
        this.setState({ feauterdImgSrc: feauterdImgSrc })
        this.appendFeaturedImages()
    }

    createProductImage(element, index) {
        const productIMG = document.createElement('img')
        productIMG.src = `${element}`
        productIMG.classList.add("Feature-IMG")
        productIMG.id = `img-${index}`
        this.setState({ ImgObjects: [...this.state.ImgObjects, productIMG] })
    }

    creatCircle(index) {
        const circleContainer= document.getElementById('IMG-indicators-cont')
        const circleElement = document.createElement('img')
        circleElement.src = circle
        circleElement.classList.add("circleInd")
        circleElement.id = `circle-${index}`
        circleContainer.appendChild(circleElement)
        this.setState({ ImgIndicators: [...this.state.ImgIndicators, circleElement] })
    }

    appendFeaturedImages = () => {
        this.state.feauterdImgSrc.forEach( (element, index) => {
            //this.creatCircle(index)
            this.createProductImage(element, index)
        });
    }


    

    render() {
        return(
            <CarouselProvider className="Carousel"
                naturalSlideHeight={300}
                naturalSlideWidth={400}
                // Is it moving
                isPlaying={true}
                playDirection={"forward"}
                totalSlides={this.state.ImgObjects.length}
                // Speed at which slides are animated
                interval={3000}
                dragEnabled={true}
                touchEnabled={true}
            >
                <Slider className="tcarousel-r">
                    {this.state.ImgObjects.map( (ele, mapIndex) => (
                        <Slide index={mapIndex}>
                            
                            <Image 
                                src={ele.src}
                                alt="Null"
                                className="Feature-IMG"
                            />
                            
                        </Slide>
                    ))}
                    
                </Slider>
                <DotGroup 
                    className="Ind"
                    showAsSelectedForCurrentSlideOnly="true"
                    >
                        {/* {this.state.ImgObjects.map( (ele, index) => (
                            <Dot slide={index}>
                                {index+1}
                            </Dot>
                        ))} */}
                </DotGroup>
                <ButtonBack className="c-btn">Back</ButtonBack>
                <ButtonPlay className="c-btn">Play</ButtonPlay>
                <ButtonNext className="c-btn">Next</ButtonNext>
            </CarouselProvider>
        )
    }
}

export default ProductCarousel