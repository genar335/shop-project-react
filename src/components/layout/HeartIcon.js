import React, { Component } from 'react'
import Axios from 'axios'
// Importing heart  icons
import HeartFilled100 from '../../GAssests/Favorites/heart-100.png'
import HeartFilled50 from '../../GAssests/Favorites/heart-50.png'
import HeartBroken100 from '../../GAssests/Favorites/broken-heart-100.png'
import HeartBroken50 from '../../GAssests/Favorites/broken-heart-50.png'
import HeartOutline100 from '../../GAssests/Favorites/heart-outline-100.png'
import HeartOutline50 from '../../GAssests/Favorites/heart-outline-50.png'
// Import style 
import '../componentStyles/HeartStyle.scss'

// Defining the Class
export class HeartIcon extends Component {
    constructor(props) {
        super(props)
        this.devURL = 'http://localhost:1337/'
        this.state = {
            heartState: this.props.liked || false
        }
    }

    linkingProductToAHeart = async () => {
        console.log(this.props.productInfo.id)
        const pData = await Axios.get(`${this.devURL}products/${this.props.productInfo.id}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        console.log(pData)
        
    }

    activatingHeart = idOfItem => {
        console.log(idOfItem)
        this.setState({ heartState: true })
        this.linkingProductToAHeart()
    }

    deactivatingTheHeart = idOfItem => {
        console.log(idOfItem)
        this.setState({ heartState: false })
    }

    handleHeartIconClick = e => 
        (this.state.heartState === true) ? 
            this.deactivatingTheHeart() :
            this.activatingHeart()
    

    render() {
        if (this.state.heartState) {
            return(
                <img src={HeartFilled100} 
                     alt="Smth went really wrong"
                     id="heartIconFilled"
                     className="heartIcon"
                     onClick={this.handleHeartIconClick}
                />
            )
        } else if (this.state.heartState === false) {
            return(
                <img src={HeartOutline100} 
                     alt="Smth went really wrong"
                     id="heartIconEmpty"
                     className="heartIcon"
                     onClick={this.handleHeartIconClick}
                />
            )
        }
    }
}

export default HeartIcon