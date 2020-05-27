import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={navbarStyle}>
            <h1>Cool name</h1>
            <div style={linkContainerStyle}>
                <Link style={linkStyle} to="/">Home</Link>
                <Link style={linkStyle} to="/about">About</Link>
                <Link style={linkStyle} to="/buy">Buy</Link>
                <Link style={linkStyle} to="/sell">Sell</Link>
                <Link style={linkStyle} to="/account">Account/Sign In</Link>
            </div>
        </nav>
    )
}

const navbarStyle = {
    textAlign: "ceneter",
    padding: "0 2em 0 2em",
    height: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}

const linkStyle = {
    color: "black",
    textDecoration: "none",
    padding: "0 1em 0 1em"
}

const linkContainerStyle = {

}

export default Navbar;