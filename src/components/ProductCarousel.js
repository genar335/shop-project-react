import React from 'react'
import Axios from 'axios'
import Touch, { Swipeable, defineSwipe } from 'react-touch'
import circle from '../GAssests/circle.svg'
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
        this.swipe = defineSwipe({swipeDisctance: 50})
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
        const imgContainer = document.getElementById('Product-IMG-Cont')
        const productIMG = document.createElement('img')
        productIMG.src = `${element}`
        productIMG.classList.add("Feature-IMG")
        productIMG.id = `img-${index}`
        imgContainer.appendChild(productIMG)
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
            this.creatCircle(index)
            this.createProductImage(element, index)
        });
        this.interval = setInterval(() => {
            this.moveCarousel()
        }, 30);
    }

    moveCarousel = () => {
        const carouselIMG = document.getElementById('Product-IMG-Cont')
        carouselIMG.style.transform = `translateX(-${this.amount}px)`
        this.amount += 1
        console.log(carouselIMG.style)
    }
    

    handleLeftSwipe = () => {
        
    }

    render() {
        return(
            <Swipeable config={this.swipe} onSwipeLeft={this.handleLeftSwipe}>
                <div id="Carousel-Cont" onTouchStart={this.handleDrag}>
                    <div id="Product-IMG-Cont">
                    </div>
                    
                    <div id="IMG-indicators-cont">
                    </div>
                </div>
            </Swipeable>
        )
    }
}

export default ProductCarousel