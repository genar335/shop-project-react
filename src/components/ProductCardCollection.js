import React from 'react'
import ProductCard from './ProductCard'

export class ProductCardCollection extends React.Component {


    render() {       
        console.log(this.props)
        return this.props.products.map(ele => (
            <ProductCard
                id={ele.id}
                category={ele.category}
                subcategory={ele.subcategory}
                type={ele.Type}
                productImages={ele.photos}
                productMainImage={ele.mainPhoto}
                productImagesURL={[]}
                productName={ele.name}
                productDescription={ele.description}
                liked={this.props.liked}
            />
        ))
    }
}

export default ProductCardCollection