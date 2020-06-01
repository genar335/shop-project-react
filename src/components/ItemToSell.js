import React from 'react';
import "./componentStyles/ItemToSell.css"
import testIMG from '../GAssests/absolutes.png'
import testHeart from '../GAssests/heart.svg'

export class ItemToSell extends React.Component {

/*    constructor(props) {
        super(props);
        this.state = {};
    }
*/ 


    render() {
        return (
            <div id="mainContainer">
                <img src={testIMG} alt="here be kartinka" className="testImage"/>
                <div id="smallContainer">
                    <h2 className="sContainerText">Product Name</h2>
                    <p className="sContainerText">If you are not with me, then you are my enemy.</p>
                    <h3 className="sContainerText">$399</h3>
                </div>
                <div id="likesContainer">
                    <p id="pDescription">(...)</p>
                    <img src={testHeart} alt="here be like" id="fave"/>
                </div>
            </div>
        );
    }
np
}

export default ItemToSell;