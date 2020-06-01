import React from 'react';
import './componentStyles/ItemToSell.css';
import testHeart from '../GAssests/heart.svg';
import testDownArrow from '../GAssests/downArrow.svg'
import ItemToSellRefined from './ItemToSellRefined'

export class ItemToSell extends React.Component {

    constructor(props) {
        super(props);
        this.devURL = 'http://localhost:1337';
        this.state = {
            /* expanded property initially set to false */
            expanded: false 
        };
    }

    toggleCard = (eve) => {
        this.setState({expanded: !this.state.expanded})
        console.log(this.state)
    }

    refiningProductDescriptions = (desc) => {
        if ((desc) && (desc.length > 180)) {
            desc = desc.slice(0, 180) + '...'
        }
        return desc;
    }

    getMainImageURL = () => 
        (this.props.mainPhoto) ?
        this.devURL + this.props.mainPhoto.url :
        null

    render() {
        return (
            <div>
                <div id="mainContainer">
                    <img src={this.getMainImageURL()} alt="here be kartinka" className="itemImage"/>
                    <div id="smallContainer">
                        <h2 className="sContainerText">{this.props.name}</h2>
                        <p className="sContainerText">{this.refiningProductDescriptions(this.props.description)}</p>
                        <h3 className="sContainerText">{this.props.price}</h3>
                    </div>
                    <div id="picContainer">
                        <div id="likesContainer">
                            <p id="nrLikes">({this.props.likes})</p>
                            <img src={testHeart} alt="here be like" id="fave"/>
                        </div>
                        <img src={testDownArrow} alt="here be arrow" id="arrow" onClick={this.toggleCard}></img>
                    </div>
                </div>
                <div>
                    <ItemToSellRefined
                    expanded={this.state.expanded}
                    id = {this.props.id}
                    name = {this.props.name}
                    price = {this.props.price}
                    description = {this.props.description}
                    mainPhoto = {this.props.mainPhoto}
                    likes = {this.props.likes}
                    featured = {this.props.featured}
                    extraInfo = {this.props.extraInfo}
                    />
                </div>
            </div>
        );
    }
np
}

export default ItemToSell;