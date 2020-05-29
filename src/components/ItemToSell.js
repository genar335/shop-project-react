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
                    <h2>Product Name</h2>
                    <p>If you are not with me, then you are my enemy.</p>
                </div>
                <div id="likesContainer">
                    <p>(...)</p>
                    <img src={testHeart} alt="here be like" id="fave"/>
                </div>
            </div>
        );
    }
np
}

export default ItemToSell;