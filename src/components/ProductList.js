import React from 'react'
import ProductCardCollection from './ProductCardCollection'
import PropTypes, { element } from 'prop-types'

import './componentStyles/ProductList.css'



export class ProductList extends React.Component {
    
    constructor(props) {
        super(props)
        this.devURL = 'http://localhost:1337/';
    }

    state = {
        products: []
    }


    /* componentDidMount() {
        Axios.get(`${this.devURL}products`)
            .then(response => {
                this.setState.products = response.data
                console.log(response.data)
            })
    } */
    componentDidMount() {
        fetch(`${this.devURL}products`)
            .then(response => response.json())
            .then(data => this.setState({ products: Array.from(data) }))
    }

    render() {
        return(
            <div id="Big-Container-for-Cards">
                <ProductCardCollection
                    products={this.state.products}
                />
            </div>
        )
    }
}

export default ProductList