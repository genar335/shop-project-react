import React, { useState } from 'react';
import Axios from 'axios';
import './componentStyles/SellForm.scss';

function SellForm(props) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [extraInfo, setExtraInfo] = useState('');

    const handleChangeOfValueItemName = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setName(event.target.value);
        console.log('---');
    }

    const handleChangeOfValueItemDescription = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setDescription(event.target.value);
        console.log('---');
    }

    const handleChangeOfValueItemPrice = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setPrice(event.target.value);
        console.log('---');
    }

    const handleChangeOfValueItemExtraInfo = (event) => {
        console.log(event.target);
        console.log(event.target.value);
        setExtraInfo(event.target.value);
        console.log('---');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitForm();
    }

    const submitForm = () => {
        //let itemObj;
        if((name.length > 0) && (description.length > 0) && (price.length > 0)) {
            Axios.post('http://localhost:1337/products', {
                Name: name,
                description: description,
                price: price,
                extraInfo: extraInfo
            }).then(res => {
                //itemObj = res;
                console.log(res);
            }).catch(error => {
                console.log(error);
                alert(`${error}`);
            });
        } /*else {
            alert('You can\'t sell nothing.');
            return;
        }*/
    }

    
        return (
            <div className="modalContainerBackground" id="testModal" onSubmit={handleSubmit}>
                <div className="modalContainer">
                    <form className="itemForm">
                        <h3 id="sellFormHeader">Sell something!</h3>
                        <div className="inputDiv" id="nameField">
                            <label className="itemNameInput">Name:</label>
                            <input type="text" name="itemName" className="itemInput" onChange={handleChangeOfValueItemName}></input>
                        </div>
                        <div className="inputDiv" id="descriptionField">
                            <label className="itemDescriptionInput">Description:</label>
                            <input type="text" name="itemDescription" className="itemInput" onChange={handleChangeOfValueItemDescription}></input>
                        </div>
                        <div className="inputDiv" id="priceField">
                            <label className="itemPriceInput">Price:</label>
                            <input type="text" name="itemPrice" className="itemInput" onChange={handleChangeOfValueItemPrice}></input>
                        </div>
                        <div className="inputDiv" id="extraInfoField">
                            <label className="itemExtraInfoInput">Extra Info:</label>
                            <input type="text" name="itemExtraInfo" className="itemInput" onChange={handleChangeOfValueItemExtraInfo}></input>
                        </div>
                        <div className="buttonContainer">
                            <input type="submit" name="submittedData" id="submitButton" value="Submit!"></input>
                            
                        </div>
                    </form>
                </div>
            </div>
        )
    
}

export default SellForm 