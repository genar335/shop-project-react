import React from 'react';
import PropTypes from 'prop-types';
import './componentStyles/ProductCard.css'


export class ProductCard extends React.Component {

    constructor(props){
        super(props)
        this.devURL = 'http://localhost:1337'
    }

    getImagesURL = () => {
        if (this.props.productImages.length > 0) {
            this.props.productImages.map(ele => {
                this.props.productImagesURL.push(ele.url)
            })
        }
    }

    getMainImg = (mIMG) => {
        let url
        if (mIMG) {
            url = this.devURL + mIMG.url
        }       
        return url
    }

    refiningProductDescriptions = (pd) => {
        if ((pd) && (pd.length > 180)) {
            pd = pd.slice(0, 180) + '...'
        }
        return pd;
    }

    render() { 
        this.getImagesURL()
        //console.log(this.props)


        return(
            <div id="mainContainer">
                
                <div className="smaller-cont">
                    <img src={`${this.getMainImg(this.props.productMainImage)}`} 
                        alt="" className="MainIMG"/>
                </div>
                <h2 id="product-description" >{this.props.productName}</h2>
            </div>
        )
    }
}

export default ProductCard