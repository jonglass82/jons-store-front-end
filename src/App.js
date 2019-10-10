import React from 'react';
import './App.css';
import Products from './components/products.js';
import Header from './components/header.js';
import Login from './components/login.js';
import Checkout from './components/checkout.js';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Home(props) {
  return <div>
            <Header></Header>
            <Products handlePurchase={props.handlePurchase}></Products>
        </div>
  }


function Purchase(props) {
  return <Checkout selectedProduct={props.selectedProduct}></Checkout>
}

function Signin(props) {
  return <Login></Login>
}


  class App extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
          selectedProduct: ''
      }
    }

    selectProduct = (product) => {
      console.log(product)
      this.setState({ 
        selectedProduct: product
      })
    }

    render (){

      return (
            <Router>
              <div className="App">

                <nav>
                  <ul>
                     <li> <Link to="/">Home</Link></li>
                  </ul>
                </nav>

            <Switch>

              <Route path="/login">
                <Signin></Signin>
              </Route>

              <Route path="/purchase">
                <Purchase selectedProduct={this.state.selectedProduct}/>
              </Route>

              <Route path="/">
                <Home handlePurchase={this.selectProduct} />
              </Route>

            </Switch>

          </div>
        </Router>
  )
 }
}

export default App;
