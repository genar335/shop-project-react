import React from 'react';
import Axios from 'axios';
import './componentStyles/SellForm.scss';

export class SellForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            extraInfo: ''
        };
    }

    handleChangeOfValueItemName = (event) => {
        console.log(event.target);
        this.setState({name: event.target.value});
        console.log('---');
    }

    handleChangeOfValueItemDescription = (event) => {
        console.log(event.target);
        this.setState({description: event.target.value});
        console.log('---');
    }

    handleChangeOfValueItemPrice = (event) => {
        console.log(event.target);
        this.setState({price: event.target.value});
        console.log('---');
    }

    handleChangeOfValueItemExtraInfo = (event) => {
        console.log(event.target);
        this.setState({extraInfo: event.target.value});
        console.log('---');
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.submitForm();
    }

    submitForm = () => {
        let itemObj;
        if((this.state.name > 0) && (this.state.description > 0) && (this.state.price > 0)) {
            Axios.post('http://localhost:1337/products', {
                Name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                extraInfo: this.state.extraInfo
            }).then(res => {
                console.log(res);
                itemObj = res;
            }).catch(error => {
                console.log(error);
                alert(`${error}`);
            });
        } else {
            console.log(this.props.formVisibility);
            alert('You can\'t sell nothing.');
            return;
        }
    }

    render() {
        return(
            <div className="modalContainerBackground">
                <div className="modalContainer" onSubmit={this.handleSubmit}>
                    <form className="itemForm">
                        <h3 id="sellFormHeader">Sell something!</h3>
                        <div className="inputDiv" id="nameField">
                            <label className="itemNameInput">Name:</label>
                            <input type="text" name="itemName" className="itemInput" onChange={this.handleChangeOfValueItemName}></input>
                        </div>
                        <div className="inputDiv" id="descriptionField">
                            <label className="itemDescriptionInput">Description:</label>
                            <input type="text" name="itemDescription" className="itemInput" onChange={this.handleChangeOfValueItemDescription}></input>
                        </div>
                        <div className="inputDiv" id="priceField">
                            <label className="itemPriceInput">Price:</label>
                            <input type="text" name="itemPrice" className="itemInput" onChange={this.handleChangeOfValueItemPrice}></input>
                        </div>
                        <div className="inputDiv" id="extraInfoField">
                            <label className="itemExtraInfoInput">Extra Info:</label>
                            <input type="text" name="itemExtraInfo" className="itemInput" onChange={this.handleChangeOfValueItemExtraInfo}></input>
                        </div>
                        <input type="submit" name="submittedData" id="submitButton" value="Submit!"></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default SellForm;