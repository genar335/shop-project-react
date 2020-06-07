import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group'
import './layoutStyles/NavBar.css'
import burger from '../../GAssests/burger.svg'



export class Navbar extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    
    
    burgerAppearance = (e) => {
        this.setState({ visible: !this.state.visible }) 
           
    }

    render(){
        if (this.state.visible) {
            return(
                <nav>
                    <h1>Cool name</h1>
                    <img src={burger} alt="Oops..." id="burger-icon" onClick={this.burgerAppearance}/>
                    
                        <div id="link-container" onClick={this.burgerAppearance} >
                            
                            <Link className="nav-link" to="/home">Home</Link>
                            <Link className="nav-link" to="/search">Search</Link>
                            <Link className="nav-link" to="/buy">Buy</Link>
                            <Link className="nav-link" to="/sell">Sell</Link>
                            <Link className="nav-link" to="/account">Account</Link>
                        </div>  

                </nav>
            )
        } else {
            return(
                <nav>
                    <h1>Cool name</h1>
                    <img src={burger} alt="Oops..." id="burger-icon" onClick={this.burgerAppearance}/>    
                </nav>
            )
        }
    }  
    
}

export default Navbar;