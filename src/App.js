import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import ProductCard from './components/ProductCard';
import './App.css';
import ProductList from './components/ProductList';

function App() {
  return (
      <Router>
        <div className="App">
          <div className="Main-container">
            
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
                <ProductList />
              </div>
            )}/>

            <Route exact path="/sell" render={props => (
              <div>
                Interface for selling an object
              </div>
            )}/>

            <Route exact path="/account" render={props => (
              <div>
                Interface for imteracting with user account
              </div>
            )} />

          </div>
        </div>
      </Router>

  );
}

export default App;
