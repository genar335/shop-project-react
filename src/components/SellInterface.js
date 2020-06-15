import React from 'react';
import Axios from 'axios';
import './componentStyles/SellInterface.css';
import ItemToSell from './ItemToSell';
import SellForm from './SellForm';

export class SellInterface extends React.Component {

    constructor(props) {
        super(props);
        this.devURL = 'http://localhost:1337/products';

        this.state = {
            productObjs: [],
            sellFormVisible: false
        };
    }

    getItemsData = (url) => {
        Axios.get(url)
        .then(res => this.setState({productObjs: res.data}))
        .catch(error => alert(error));
    }

    componentDidMount = () => {
        this.getItemsData(this.devURL);
    }

    showSellForm = () => {
        this.setState({sellFormVisible: true});
    }
    
    render() {
        console.log(this.state);

        return (
            <div>
                <h1>Sell your shit</h1>
                <button onClick={this.showSellForm} id="addButton">+ Add some shit</button>
                {this.state.sellFormVisible ?
                <SellForm
                    formVisibility = {this.state.sellFormVisible}
                />
                :
                null}
                {this.state.productObjs.map(ele => (
                <ItemToSell
                    id = {ele.id}
                    name = {ele.name}
                    price = {ele.price}
                    description = {ele.description}
                    mainPhoto = {ele.mainPhoto}
                    likes = {ele.likes}
                    featured = {ele.featured}
                    extraInfo = {ele.extraInfo}
                />
                ))}
            </div>
        );
    }
}

export default SellInterface;