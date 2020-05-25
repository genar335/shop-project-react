import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={navbarStyle}>
            <h1>Cool name</h1>
            <Link style={linkStyle} to="/">Home</Link>
            <Link style={linkStyle} to="/about">About</Link>
            <Link style={linkStyle} to="/buy">Buy</Link>
            <Link style={linkStyle} to="/sell">Sell</Link>
            <Link style={linkStyle} to="/account">Account</Link>
        </nav>
    )
}

const navbarStyle = {
    textAlign: "ceneter",
    padding: "2em"
}

const linkStyle = {
    color: "black",
    textDecoration: "none",
    padding: "0 1em 0 1em"
}

export default Navbar;