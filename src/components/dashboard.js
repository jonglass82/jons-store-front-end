import React from 'react'
import axios from 'axios'
import AdminProduct from './AdminProduct'
import { Form, FormGroup, Label, Input } from 'reactstrap';


class Dashboard extends React.Component {

constructor(props){
  super(props);
  this.modalToggle = this.modalToggle.bind(this);
  this.state = {
    products: [],
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productShipping: "",
    productSold: "no",
    productAvailable: "yes",
    productCategory: "",
    productImage1: "",
    productImage2: "",
    productImage3: "",
    productImage4: "",
    productImage5: "",
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
    shipping: this.state.productShipping,
    sold: this.state.productSold,
    available: this.state.productAvailable, 
    category: this.state.productCategory, 
    image1: this.state.productImage1, 
    image2: this.state.productImage2,
    image3: this.state.productImage3,
    image4: this.state.productImage4,
    image5: this.state.productImage5, 
    auth: localStorage.getItem('token')
  }

  instance.post('http://localhost:3001/api/create', params).then(res => {   
    console.log("Product created!");
  })
}

  handleSubmit = () => {
    this.createProduct();
  }


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

      <FormGroup>
        <Label>
          Shipping:
          <Input type="text" name="productShipping" value={this.state.productShipping} onChange={this.onChange} />
        </Label>
      </FormGroup>

      <FormGroup>
        <Label>
          Sold?
          <Input type="select" name="productSold" onChange={this.onChange}>
          <option value="no" >No</option>
          <option value="yes" >Yes</option>
          </Input>
        </Label>
      </FormGroup>

            {this.state.productAvailable}

      <FormGroup>
        <Label>
          Available?
          <Input type="select" name="productAvailable" value={this.state.productAvailable} onChange={this.onChange}>
          <option value="yes" >Yes</option>
          <option value="no" >No</option>
          </Input>
        </Label>
      </FormGroup>

      <FormGroup>
        <Label>
          Category
          <Input type="select" name="productCategory" onChange={this.onChange}>
          <option value="" selected="selected" disabled>Select a category:</option>
          <option value="clothing" >Clothing</option>
          <option value="collectibles" >Collectibles</option>
          <option value="artwork" >Artwork</option>
          </Input>
        </Label>
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile">Image 1</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>

            <FormGroup>
        <Label for="exampleFile">Image 2</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>

            <FormGroup>
        <Label for="exampleFile">Image 3</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>

            <FormGroup>
        <Label for="exampleFile">Image 4</Label>
        <Input type="file" name="file" id="exampleFile" />
      </FormGroup>

            <FormGroup>
        <Label for="exampleFile">Image 5</Label>
        <Input type="file" name="file" id="exampleFile" />
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

