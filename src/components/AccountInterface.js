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

    handleClick = e => 
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
        console.log(uData)
        this.setState({ uName: uData.username })
        this.setState({ email: uData.email })
        this.setState({ createdAt: Date(uData.createdAt) })
        this.setState({ ownedProduct: uData.products })
        this.setState({ likedProducts: this.formattingLikedProducts(uData.likedProducts.arrayOfIDs.split(',')) })
        console.log(this.state)
    }

    formattingLikedProducts = likedProducts => {
        console.log(likedProducts)
        // ⬇️⬆️ Array of ids of products which user has liked
        // ⬇️   Same array without duplicates
        let likedProductsFiltered = Array.from(new Set(likedProducts))
        console.log(`Set of like products:`)
        console.log(likedProductsFiltered)
        // Fetching all the products
        console.log(this.fetchAllProducts())
       
        return []
    }
        
    fetchAllProducts = () =>  {
        Axios.get(`${this.devURL}/products`)
            .then(res =>  console.log(res))
            .catch(err => alert(err))
    }

    // testio = data => data.forEach(ele => console.log(ele))

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
                        {this.state.likedProducts.map(ele => (
                            <p>{ele}</p>
                        ))}
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