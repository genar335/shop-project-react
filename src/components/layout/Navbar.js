import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './layoutStyles/NavBar.css'
import burger from '../../GAssests/burger.svg'


export class Navbar extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount = () =>
        this.preppingLinkContainer()
    
    preppingLinkContainer = () => {
        const linkContainer = document.getElementById('link-container')
        const clientHeight = window.innerHeight
        const nav = document.getElementsByTagName('nav')[0]
        const navHeight = nav.clientHeight
        linkContainer.style.height = `${(clientHeight - navHeight)}px`
        linkContainer.style.top = `${navHeight}px`
        linkContainer.style.visibility = 'hidden'
    }
    
    burgerAppearance = event => {
        console.log(event)
        const burgerMenu = event.target
        console.log(burgerMenu)
        const linkMenu = document.getElementById('link-container')
        
        linkMenu.style.visibility === 'hidden' ? 
            linkMenu.style.visibility = 'visible' : 
            linkMenu.style.visibility = 'hidden'


        console.log(linkMenu.style.visibility)
        /* const animaDuration = 200 //in ms
        
        if ((linkMenu.style.opacity == 0) && (event.target.id != 'link-container')){
            linkMenu.animate([
                { opacity: 0 },
                { opacity: 1 }
            ], {
                duration: animaDuration,
                iterations: 1
            })
            linkMenu.onanimationend = linkMenu.style.opacity = 1
            linkMenu.style.visibility = 'visible'
        } else if (linkMenu.style.opacity == 1) {
            linkMenu.animate([
                { opacity: 1 },
                { opacity: 0 }
            ], {
                duration: animaDuration,
                iterations: 1
            })
            linkMenu.onanimationend = linkMenu.style.opacity = 0
            linkMenu.style.visibility = 'hidden'
        } */
        
    }


    render(){
        return(
            <nav>
                <h1>Cool name</h1>
                <img src={burger} alt="Oops..." id="burger-icon" onClick={this.burgerAppearance}/>
                <div id="link-container" onClick={this.burgerAppearance}>
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/search">Search</Link>
                    <Link className="nav-link" to="/buy">Buy</Link>
                    <Link className="nav-link" to="/sell">Sell</Link>
                    <Link className="nav-link" to="/account">Account</Link>
                </div>
            </nav>
        )
    }  
    
}

export default Navbar;