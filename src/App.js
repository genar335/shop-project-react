import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import './App.css';
import ProductList from './components/ProductList';
import SignInForm from './components/layout/SignInForm';
import SellInterface from './components/SellInterface';
//import ItemToSell from './components/ItemToSell';
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
                <ProductList />
            )}/>

            <Route exact path="/sell" render={props => (
              <SellInterface />
            )}/>

            <Route exact path="/account" render={props => (
                <SignInForm />
            )} />

            <Route exact path="/carousel" render={props => (
                <ProductCarousel />
            )} />
        </div>
      </Router>
  );
}

export default App;
