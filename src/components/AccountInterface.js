import React, { Component } from 'react'
import SignInForm from './layout/SignInForm'
import Axios from 'axios'
import ProductCardCollection from './ProductCardCollection'

export class AccountInterface extends Component {

    constructor(props) {
        super(props)
        this.devURL = 'http://localhost:1337'
        this.state = {
            uName: '',
            email: '',
            createdAt: '',
            likedProducts: [],
            ownedProduct: []
        }
    }

    getSnapshotBeforeUpdate = () =>
        this.fetchUserData()

    fetchUserData = () => 
        Axios.get(`${this.devURL}/users/${sessionStorage.uID}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.jwtToken}`
            }
        })
            .then(res => this.workingWithUData(res.data))
            .catch(err => alert(err))
    
    
    workingWithUData = uData => {
        this.setState({ uName: uData.username })
        this.setState({ email: uData.email })
        this.setState({ createdAt: Date(uData.createdAt) })
        this.setState({ ownedProduct: uData.products })
        this.settingLikedProducts(uData.likedProducts.arrayOfIDs)
    }

    GetFilteredProducts = async likedProducts => {
        console.log('qwe')
        likedProducts = Array.from(new Set(likedProducts))
        const queryForLikedProducts = likedProducts.join('&id_in=')
        const answer = await Axios.get(`${this.devURL}/products?id_in=${queryForLikedProducts}`)
            .then(res => res.data)
            .catch(err => alert(err))
        return answer
    }

    settingLikedProducts = async likedProducts => {
        const filteredProducts = await this.GetFilteredProducts(likedProducts)
        console.log(filteredProducts)
        this.setState({ likedProducts: [filteredProducts] })
    }
        
    handleClick = e => {
        this.fetchUserData()
    }

    render() {

        if (!sessionStorage.jwtToken) {
            return <SignInForm />
        } else {
            return(
                <div className="accountContainer">
                    <h1>Hello, {this.state.uName}</h1>
                    <h2>Your email: {this.state.email}</h2>
                    <h2>Date of account creation: {this.state.createdAt}</h2>
                    <div id="likedProductsContainer">
                        <h2>You liked these:</h2>
                        <ProductCardCollection products={this.state.likedProducts} liked={true} />
                    </div> 
                    <div id="ownedProductsContainer">
                        <h2>Your items:</h2>
                        <ProductCardCollection products={this.state.ownedProduct}/>
                    </div>
                    <button onClick={this.handleClick} >sessionStorage</button>
                </div>
            )
        }

    }
}

export default AccountInterface