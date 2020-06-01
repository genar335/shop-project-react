import React from 'react'
import './componentStyles/ItemToSellRefined.css';
import testHeart from '../GAssests/heart.svg';
import testUpArrow from '../GAssests/upArrow.svg'

export class ItemToSellRefined extends React.Component {

    constructor(props) {
        super(props);
        this.devURL = 'http://localhost:1337';
        this.state = {
            /* expanded property initially set to false */
            //expanded: true 
        };
    }

    toggleCard = (eve) => {
        this.setState({expanded: !this.state.expanded})
        console.log(this.state)
    }

    getMainImageURL = () => 
        (this.props.mainPhoto) ?
        this.devURL + this.props.mainPhoto.url :
        null

    render(){
        if (this.props.expanded) {
            return(
                <div>
                    <div id="mainContainer">
                        <img src={this.getMainImageURL()} alt="here be kartinka" className="itemImage"/>
                        <div id="smallContainer">
                            <h2 className="sContainerText">{this.props.name}</h2>
                            <p className="sContainerText">{this.props.description}</p>
                            <h3 className="sContainerText">{this.props.price}</h3>
                            <p className="sContainerText">{this.props.extraInfo}</p>
                        </div>
                        <div id="picContainer">
                            <div id="likesContainer">
                                <p id="nrLikes">({this.props.likes})</p>
                                <img src={testHeart} alt="here be like" id="fave"/>
                            </div>
                            <img src={testUpArrow} alt="here be arrow" id="arrow" onClick={this.toggleCard}></img>
                        </div>
                    </div>
                </div>
            )
        } else { return null }
    }
}

export default ItemToSellRefined