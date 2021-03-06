import React from 'react';
import './App.css';
import axios from 'axios';
import Products from './components/products.js';
import Navbar from './components/Navbar.js';
import Header from './components/header.js';
import Login from './components/login.js';
import Info from './components/info.js';
import Dashboard from './components/dashboard.js';
import Checkout from './components/checkout.js';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import {StripeProvider} from 'react-stripe-elements';
import { Alert } from 'reactstrap';


function Home(props) {
  return <div>
            <Products message={props.message} addToCart={props.addToCart}></Products>
        </div>
}

function Purchase(props) {
  return <Checkout updateCartCount={props.updateCartCount}></Checkout>
}

function EnterInfo(props){
   return <Info updateCartCount={props.updateCartCount}></Info>
}


function AdminDashboard(props) {
  return <Dashboard></Dashboard>
}

function ProtectedRoute(props) {
  return props.loggedIn ? <props.component /> : <Redirect to='/login' />
}


  class App extends React.Component {

    constructor(props) {
      super(props);
        this.state = {
          loggedIn: false,
          cartCount: 0,
          products: [], 
          message:''      
        }
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      if (token) {
        this.setState({
          loggedIn: true
        })
      }
      this.getProducts();
    }

    getProducts() {
        axios.get('http://localhost:3001/api/products').then(res => {

        const products = res.data;
        let newCount = 0

        products.map((product) => {
        if( localStorage.getItem(JSON.stringify(product._id))){
          newCount = newCount + 1
        }
      })

        this.setState((state, props) => ({
          products: products,
          cartCount: newCount
        }));
        
      })
    };

    selectProduct = (product) => {
      this.setState({ 
        selectedProduct: product
      })
    }

    handleLogin = (token) => {
      localStorage.setItem('token', token)
      this.setState({
        loggedIn: true
      })
    }

    handleLogout = () => {
      localStorage.removeItem("token")
      this.setState({
        loggedIn: false
      })
    }

    addToCart = (itemKey, item) => {

      localStorage.setItem(JSON.stringify(itemKey), JSON.stringify(item));

       const cartCount = this.state.cartCount + 1;
       this.setState({
         cartCount: cartCount,
         message: <Alert style={{transition:'0.3s', textAlign:'center', position:'fixed', zIndex:'100', width:'100%', top:'8%'}} color='success'><strong>Item has been added to your cart!</strong></Alert>
       })

       setTimeout(()=>{
        this.setState({message: ''})
       }, 2000);
    }

    updateCartCount = (items) => {
      this.setState({
        cartCount: items
      })
    }


    render (){

      return (
            <Router>
              <div className="App">

                <Navbar
                    cartCount={this.state.cartCount}
                > </Navbar>


                {this.state.message}

            <Switch>

              <Route path="/dashboard">
                <ProtectedRoute component={AdminDashboard} loggedIn={this.state.loggedIn}/>
              </Route>

              <Route path="/login">
                <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
              </Route>

              <Route path="/purchase">
                <Purchase updateCartCount={this.updateCartCount}/>
              </Route>

              <Route path="/purchase-info">
                <EnterInfo/>
              </Route>

              <Route path="/">
                <Home 
                  addToCart={this.addToCart}
                  message={this.state.message}
                  />
              </Route>

            </Switch>

          </div>
        </Router>
  )
 }
}

export default App;
