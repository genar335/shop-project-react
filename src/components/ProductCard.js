import React from 'react';
import PropTypes from 'prop-types';
import './componentStyles/ProductCard.css'
import Heart from '../GAssests/heart.svg'
import HeartIcon from './layout/HeartIcon'
import Axios from 'axios'


export class ProductCard extends React.Component {

    constructor(props){
        super(props)
        this.devURL = 'http://localhost:1337'
        this.state = {
            heartIsChecked: this.checkingWhetherTheProductIsLovedEnough()
        }
    }

    checkingWhetherTheProductIsLovedEnough = () => {
        if (this.props.liked) {
            return true
        } else {
            return false
        }
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

    handleHeart = e => {
        if (!this.state.heartIsChecked) {
            e.target.classList.add("heart-checked")
            this.testioGetto(e.target.parentNode.parentNode.id)
            // this.setState({ heartIsChecked: true })
        } else {
            e.target.classList.remove("heart-checked")
            // this.setState({ heartIsChecked: false })
        }
        this.setState({ heartIsChecked: !this.state.heartIsChecked })
    }

    testioGetto = idOfClikedHeart => {
        console.log(idOfClikedHeart)
        let likedProductsArray = []
        Axios.get(`http://localhost:1337/users/${sessionStorage.uID}`, {
            headers: {
                Authorization:
                    `Bearer ${sessionStorage.jwtToken}`
            },
        }).then(res => {
                likedProductsArray = res.data.likedProducts.arrayOfIDs
                this.updatingLikedProducts(likedProductsArray, idOfClikedHeart);
            })
          .catch(err => console.log(err))        
    }

    updatingLikedProducts(previousArrayOfLikeProducts, idOfClikedHeart) {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjQ1MjkwZTg2NTJiMTI2YjdiMTRmOSIsImlhdCI6MTU5MTU1Mjk5MywiZXhwIjoxNTk0MTQ0OTkzfQ.fGsuKb_SKnDpanH7IWb0rLO0maXr9lp6P9sVMzmv0kc");
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"likedProducts":{"arrayOfIDs":`${[previousArrayOfLikeProducts, idOfClikedHeart]}`}});

        let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://localhost:1337/users/5eb45290e8652b126b7b14f9", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    componentWillMount = () => 
        this.parsingLikedState()

    parsingLikedState = () => {
        if (this.props.liked) {
            this.setState({ heartIsChecked: true })
        } else if (this.props.liked === undefined) {
            this.setState({ heartIsChecked: false })
        }
    }
    render() { 
        this.getImagesURL()
        //this.parsingLikedState()
        console.log(this.props.liked)
        return(
            <div className="mainContainerWithACard" id={this.props.id} >
                <div className="smaller-cont">
                    <img src={`${this.getMainImg(this.props.productMainImage)}`} 
                        alt="" className="MainIMG"/>
                    {/* <img src={Heart} alt="Oops" id="heart" onClick={this.handleHeart} liked={this.props.liked} ></img> */}
                    <HeartIcon liked={this.state.heartIsChecked} />
                </div>
                <h2 id="product-description">{this.props.productName}</h2>
            </div>
        )
    }
}

export default ProductCard