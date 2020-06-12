import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.scss';
import ProductList from './components/ProductList';
import AccountInterface from './components/AccountInterface'
import SellInterface from './components/SellInterface';
import ProductCarousel from './components/ProductCarousel';

function App() {
  return (
      <Router>
        <div className="App">            
            <Navbar />
            
            <Route exact path="/" render={props => (
              <div>
                Some information regarding the site
              </div>
            )}/>

            <Route exact path="/about" render={props => (
              <div>
                Some more details about functionality
              </div>
            )}/>

            <Route exact path="/buy" render={props => (
                <div>
                  <ProductCarousel />
                  <ProductList />
                </div>
            )}/>

            <Route exact path="/sell" render={props => (
              <SellInterface />
            )}/>

            <Route exact path="/account" render={props => (
                <AccountInterface />
            )} />

            <Route exact path="/carousel" render={props => (
                <ProductCarousel />
            )} />
        </div>
      </Router>
  );
}

export default App;
