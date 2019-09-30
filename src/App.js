import React from 'react';
import './App.css';
import axios from 'axios';
import Products from './components/products.js';
import Header from './components/header.js';
import Checkout from './components/checkout.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Home() {
  return <div>
            <Header></Header>
            <Products></Products>
        </div>
  }

function Purchase() {
  return <Checkout></Checkout>
}


function App() {

  return (
            <Router>
              <div className="App">

                <nav>
                  <ul>
                     <li> <Link to="/">Home</Link></li>
                     <li><Link to="/purchase">Checkout</Link></li>

                  </ul>
                </nav>

        <Switch>
          <Route path="/purchase">
            <Purchase />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>

              </div>
            </Router>
  );
}

export default App;
