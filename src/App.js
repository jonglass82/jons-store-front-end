import React from 'react';
import './App.css';
import axios from 'axios';
import Products from './components/products.js';
import Navbar from './components/Navbar.js';
import Header from './components/header.js';
import MusicPage from './components/MusicPage.js';
import Collection from './components/Collection.js';
import Projects from './components/Projects.js';
import Login from './components/login.js';
import Info from './components/info.js';
import Dashboard from './components/dashboard.js';
import Checkout from './components/checkout.js';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";
import {StripeProvider} from 'react-stripe-elements';
import { Alert } from 'reactstrap';


function Home(props) {
  return <Products message={props.message} products={props.products} addToCart={props.addToCart}></Products>
}

function Purchase(props) {
  return <Checkout updateCartCount={props.updateCartCount}></Checkout>
}

function EnterInfo(props){
   return <Info updateCartCount={props.updateCartCount}></Info>
}

function Music(props){
  return <MusicPage></MusicPage>
}

function NotForSale(props){
  return <Collection></Collection>
}

function MyProjects(props){
  return <Projects></Projects>
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
      console.log('App.js mounted');
    }

    getProducts() {
        axios.get(`${process.env.REACT_APP_API_STR}/api/products`).then(res => {
          console.log('get products called');
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

      var obj = {value: item.title, timestamp: new Date().getTime() + 1000}
      localStorage.setItem(JSON.stringify(itemKey), JSON.stringify(obj));

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

              <Route path="/music">
                <Music/>
              </Route>

              <Route path="/not-for-sale">
                <NotForSale/>
              </Route>

              <Route path="/projects">
                <MyProjects/>
              </Route>

              <Route path="/purchase-info">
                <EnterInfo updateCartCount={this.updateCartCount} />
              </Route>

              <Route exact path="/">
                <Home addToCart={this.addToCart} message={this.state.message} products={this.state.products}/>
              </Route>

            </Switch>

          </div>

          <div style={{'height': '200px'}}></div>

        </Router>
  )
 }
}

export default App;
