import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


class Dashboard extends React.Component {

constructor(props){
  super(props);
  this.state = {
    products: [],
    productTitle: "",
    productDescription: "",
    productPrice: ""
  }
  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


createProduct = () => {

  const instance = axios.create({
    headers: {"Access-Control-Allow-Origin": "*"}
  });

  const params = {
    title: this.state.productTitle,
    description: this.state.productDescription,
    price: this.state.productPrice
  }

  instance.post('http://localhost:3001/api/create', params).then(res => {   
    console.log("Product created!");
  })
}


handleSubmit = () => {
  this.createProduct();
}



render() {
  return  <div>

    <h1>Dashboard</h1> 

    <h3>Title:{this.state.productTitle}</h3>
     <h3>Description:{this.state.productDescription}</h3>
      <h3>Price:{this.state.productPrice}</h3>

      <form onSubmit={this.handleSubmit}>

        <label>
          Title:
          <input type="text" name="productTitle" value={this.state.productTitle} onChange={this.onChange} />
        </label>

        <label>
          Description:
          <input type="text" name="productDescription" value={this.state.productDescription} onChange={this.onChange} />
        </label>

        <label>
          Price:
          <input type="text" name="productPrice" value={this.state.productPrice} onChange={this.onChange} />
        </label>

        <input type="submit" value="Submit" />

      </form>

    </div>

}


}

export default Dashboard;

