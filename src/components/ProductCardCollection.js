import React from 'react'
import ProductCard from './ProductCard'

export class ProductCardCollection extends React.Component {


    render() {        
        return this.props.products.map(ele => (
            <ProductCard
                id={ele.id}
                category={ele.Category}
                subcategory={ele.Subcategory}
                type={ele.Type}
                productImages={ele.productImages}
                productMainImage={ele.productMainImage}
                productImagesURL={[]}
                productName={ele.productName}
                productDescription={ele.productDescription}
            />
        ))
    }
}

export default ProductCardCollection