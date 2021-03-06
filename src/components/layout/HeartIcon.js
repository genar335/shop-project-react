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
        this.state = {
            heartState: this.props.liked || false
        }
    }

    addingMoreLove = (arrayToAdd) => {
        Axios({
            method: 'put',
            url: `http://localhost:1337/users/${sessionStorage.uID}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.jwtToken}`
            },
            data: {
                likedProducts: {
                    arrayOfIDs: arrayToAdd
                }
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }
    
    destroyingLove = (arrayToModify, idToRemove) => {
        const arrayToAdd = arrayToModify.filter(ele => ele !== idToRemove)
        Axios({
            method: 'put',
            url: `http://localhost:1337/users/${sessionStorage.uID}`,
            headers: {
                Authorization: `Bearer ${sessionStorage.jwtToken}`
            },
            data: {
                likedProducts: {
                    arrayOfIDs: arrayToAdd
                }
            }
        })
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
    }

    fetchingExistingLove = (idOfClikedHeart, tag) => {
        console.log(idOfClikedHeart)
        let likedProductsArray = []
        Axios.get(`http://localhost:1337/users/${sessionStorage.uID}`, {
            headers: {
                Authorization:
                    `Bearer ${sessionStorage.jwtToken}`
            },
        }).then(res => {
                likedProductsArray = [...res.data.likedProducts.arrayOfIDs, idOfClikedHeart]
                likedProductsArray = Array.from(new Set(likedProductsArray))
                console.log(likedProductsArray)
                tag ?
                this.addingMoreLove(likedProductsArray) :
                this.destroyingLove(likedProductsArray, idOfClikedHeart)
            })
          .catch(err => console.log(err))        
    }

    activatingHeart = eventTarget => {
        this.setState({ heartState: true })
        console.log(eventTarget)
        this.fetchingExistingLove(eventTarget.parentNode.parentNode.id, true)
    }

    deactivatingTheHeart = eventTarget => {
        this.setState({ heartState: false })
        console.log('heya')
        console.log(eventTarget.parentNode.parentNode.id)
        this.fetchingExistingLove(eventTarget.parentNode.parentNode.id, false)
    }

    handleHeartIconClick = e => 
        (this.state.heartState === true) ? 
            this.deactivatingTheHeart(e.target) :
            this.activatingHeart(e.target)
    

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