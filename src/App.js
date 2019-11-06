import React from 'react';
import './App.css';
import Products from './components/products.js';
import Header from './components/header.js';
import Login from './components/login.js';
import Dashboard from './components/dashboard.js';
import Checkout from './components/checkout.js';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

function Home(props) {
  return <div>
            <Header></Header>
            <Products handlePurchase={props.handlePurchase}></Products>
        </div>
  }


function Purchase(props) {
  return <Checkout selectedProduct={props.selectedProduct}></Checkout>
}

// function Signin(props) {
//   return <Login></Login>
// }

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
          selectedProduct: '',
          loggedIn: false
      }
    }

    componentDidMount() {
      const token = localStorage.getItem('token');
      if (token) {
        this.setState({
          loggedIn: true
        })
      }
    }

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

    render (){

      return (
            <Router>
              <div className="App">

                <nav>
                  <ul>
                     <li><Link to="/">Home</Link></li>
                     { this.state.loggedIn && (         
                      <li><a href="#" onClick={this.handleLogout}>logout</a></li>
                      )}
                  </ul>
                </nav>

            <Switch>

              <Route path="/dashboard">
                <ProtectedRoute component={AdminDashboard} loggedIn={this.state.loggedIn}/>
              </Route>

              <Route path="/login">
                <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/>
              </Route>

              <Route path="/purchase">
                <Purchase selectedProduct={this.state.selectedProduct}/>
              </Route>

              <Route path="/">
                <Home 
                  handlePurchase={this.selectProduct}
                  />
              </Route>

            </Switch>

          </div>
        </Router>
  )
 }
}

export default App;
