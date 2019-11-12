import React from 'react'
import axios from 'axios'
import AdminProduct from './AdminProduct'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


class Dashboard extends React.Component {

constructor(props){
  super(props);
  this.modalToggle = this.modalToggle.bind(this);
  this.state = {
    products: [],
    productTitle: "",
    productDescription: "",
    productPrice: "",
    modal: false, 
    selectedProduct: [],
    message: ''
  }
  this.onChange = this.onChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updateProduct = (newProduct) => {
    const products = this.state.products.map(product => {
      if (product._id === newProduct._id) {
        return newProduct
      }
      return product
    });
    console.log(newProduct, products)

    this.setState({
      products: products
    })
  }

  getMessage = (text) => {
    this.setState({
      message: text
    });
    setTimeout(() => this.setState({
      message: ''
    }), 3000)
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res => {
      const products = res.data;
      this.setState((state, props) => ({
        products: products
      }));
    })
  };

  componentDidMount() {
      this.getProducts();
  };

createProduct = () => {

  const instance = axios.create({
    headers: {"Access-Control-Allow-Origin": "*"}
  });

  const params = {
    title: this.state.productTitle,
    description: this.state.productDescription,
    price: this.state.productPrice, 
    auth: localStorage.getItem('token')

  }

  instance.post('http://localhost:3001/api/create', params).then(res => {   
    console.log("Product created!");
  })
}

  handleSubmit = () => {
    this.createProduct();
  }


  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res => {
      const products = res.data;
      this.setState((state, props) => ({
        products: products
      }));
    })
  };

  componentDidMount() {
      this.getProducts();
  };


render() {

  return  <div className="container">

    <h1>Dashboard</h1>

    <div className="message">{this.state.message}</div>

      <div>

      <h2>Create a new product</h2>

      <Form onSubmit={this.handleSubmit}>

      <FormGroup>
        <Label>
          Title:
          <Input type="text" name="productTitle" value={this.state.productTitle} onChange={this.onChange} />
        </Label>
      </FormGroup>

      <FormGroup>
        <Label>
          Description:
          <Input type="text" name="productDescription" value={this.state.productDescription} onChange={this.onChange} />
        </Label>
      </FormGroup>

      <FormGroup>
        <Label>
          Price:
          <Input type="text" name="productPrice" value={this.state.productPrice} onChange={this.onChange} />
        </Label>
      </FormGroup>

        <input type="submit" value="Submit" />

      </Form>

      </div>

        <h3>Current Products:</h3>

      <div id="currently-listed-products" className="grid-container">

                {this.state.products.map((product) => {
                  
                  return ( 
                    <AdminProduct
                      id = {product._id}
                      key = {product._id}
                      product = {product}
                      title = {product.title}
                      description = {product.description}
                      price = {product.price}
                      updateProduct = {this.updateProduct}
                      getMessage = {this.getMessage}
                    />
                  ) 

                })
              }
              
      </div>

    </div>

 }

}

export default Dashboard;

