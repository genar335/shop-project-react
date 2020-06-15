import React from 'react'
import Axios from 'axios'
import ProductCardCollection from '../ProductCardCollection'

import './layoutStyles/UserInfo.scss'

export class UserInfo extends React.Component {
    
    constructor(props) {
        super(props)
        this.devURL = 'http://localhost:1337'
        this.userID = sessionStorage.uID || undefined
        this.fetchySwitch = false
        this.state = {
            userInfo: {},
            ownedProductsObjs: [],
            likedProductsObjs: []
        }
    }

    fetchingUserData = () => 
        Axios.get(`${this.devURL}/users/me`,{
            headers: {
                Authorization: `Bearer ${sessionStorage.jwtToken}`
            }
        })
            .then(res => this.setState({ userInfo: res.data }))
            .catch(err => console.log(err))

    //

    fetchingAssociatedProducts = async (userInfo = this.state.userInfo) => {
        let {likedProducts, ownedProducts} = userInfo
        console.log(likedProducts, ownedProducts)
        ownedProducts = await Axios.get(`${this.devURL}/products?id_in=${ownedProducts.join('&id_in=')}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        this.setState({ ownedProductsObjs: ownedProducts })
        console.log(this.state.ownedProductsObjs)
    }    
    
    componentDidMount = () => {
        console.log(123)
        this.fetchingUserData()
        //this.fetchingAssociatedProducts() 
    }

    componentDidUpdate = () => {
        if (!this.fetchySwitch) {
            this.fetchingAssociatedProducts()
            this.fetchySwitch = true
        }
    }
        
    componentWillUnmount = () => 
        this.fetchySwitch = false
    //

    handleClick = e => 
        this.fetchingUserData()

    render() {
        if (this.state.userInfo.id) {
            return (
                <div id="user-info-container">
                    <h1>Hello, {this.state.userInfo.username}!</h1>
                    <h3>Your email: {this.state.userInfo.email}</h3>
                    <h3>Stuff you own:</h3>
                    <ProductCardCollection products={ this.state.ownedProductsObjs } /> 
                </div>
            )
        }
        return null
    }
}

export default UserInfo