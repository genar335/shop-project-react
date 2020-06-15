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
        let {liked_products, ownedProducts} = userInfo
        console.log(liked_products, ownedProducts)
        ownedProducts = await this.fetchingOwnedProducts(ownedProducts)
        liked_products = await this.fetchingLikedProducts(liked_products)
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

    async fetchingLikedProducts(liked_products) {
        liked_products = await Axios.get(`${this.devURL}/products?id_in=${liked_products.join('&id_in=')}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        this.setState({ likedProductsObjs: liked_products })
        return liked_products
    }

    async fetchingOwnedProducts(ownedProducts) {
        ownedProducts = await Axios.get(`${this.devURL}/products?id_in=${ownedProducts.join('&id_in=')}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        this.setState({ ownedProductsObjs: ownedProducts })
        return ownedProducts
    }

    //

    render() {
        if (this.state.userInfo.id) {
            return (
                <div id="user-info-container">
                    <h1>Hello, {this.state.userInfo.username}!</h1>
                    <h3>Your email: {this.state.userInfo.email}</h3>
                    <h3>Stuff you own:</h3>
                    <ProductCardCollection products={ this.state.ownedProductsObjs } /> 
                    <h3>Stuff you like:</h3>
                    <ProductCardCollection 
                        products={ this.state.likedProductsObjs } 
                        liked={true}
                        />
                </div>
            )
        }
        return null
    }
}

export default UserInfo