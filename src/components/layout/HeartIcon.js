import React, { Component } from 'react'
// Importing heart  icons
import HeartFilled100 from '../../GAssests/Favorites/heart-100.png'
import HeartFilled50 from '../../GAssests/Favorites/heart-50.png'
import HeartBroken100 from '../../GAssests/Favorites/broken-heart-100.png'
import HeartBroken50 from '../../GAssests/Favorites/broken-heart-50.png'
import HeartOutline100 from '../../GAssests/Favorites/heart-outline-100.png'
import HeartOutline50 from '../../GAssests/Favorites/heart-outline-50.png'

// Defining the Class
export class HeartIcon extends Component {
    constructor(props) {
        super(props)
        this.setState = {
            heartState: this.props.liked || false
        }
    }

    render() {
        if (this.state.heartState) {
            return(
                <img src={HeartFilled100} 
                     alt="Smth went really wrong"
                     id="heart"
                />
            )
        } else {
            return(
                <img src={HeartOutline100} 
                     alt="Smth went really wrong"
                     id="heart"
                />
            )
        }
    }
}

export default HeartIcon