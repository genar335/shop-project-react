import React, { Component } from 'react'
import SignInForm from './layout/SignInForm'
import UserInfo from './layout/UserInfo'

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

    render() {

        if (!sessionStorage.jwtToken) {
            return <SignInForm />
        } else {
            return <UserInfo />
        }

    }
}

export default AccountInterface