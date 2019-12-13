import React from 'react'
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class Info extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      products: [],
      myCart: []
    }
}

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res => {

      const products = res.data;
      const newArray = [...this.state.myCart]

      products.map((product) => {
        if( localStorage.getItem(JSON.stringify(product._id))){
          newArray.push(product);
        }
      })

      this.setState((state, props) => ({
        products: products,
        myCart: newArray
      }));
    })
  };

   componentDidMount(){
     this.getProducts();
   }

  render(){
    return <div className="container">

              <h3>Order Summary:</h3>

                  {this.state.myCart.map((product) => {
      return <ul>

      <li><h4>{product.title}</h4></li>

      </ul>
    })}

    <h1>Enter your info:</h1>

    <Form>

     <FormGroup>
      <Label for="firstName">First Name</Label>
        <Input type="text" name="firstName" id="firstName" placeholder="First Name" />
      </FormGroup>

           <FormGroup>
      <Label for="lastName">Last Name</Label>
        <Input type="text" name="lastName" id="lastName" placeholder="Last Name" />
      </FormGroup>

      <FormGroup>
        <Label for="Email">Email</Label>
        <Input type="email" name="email" id="Email" placeholder="Email" />
      </FormGroup>

      <FormGroup>
        <Label for="firstName">Phone Number</Label>
          <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number"/>
      </FormGroup>

      <h1>Shipping address:</h1>

      <FormGroup>
        <Label for="address">Address</Label>
          <Input type="text" name="address" id="address" placeholder="Address" />
      </FormGroup>

        <FormGroup>
          <Label for="aptNo">Apt number/suite (optional)</Label>
            <Input type="text" name="aptNo" id="aptNo" placeholder="aptNo" />
      </FormGroup>

      <FormGroup>
        <Label for="city">City</Label>
        <Input type="text" name="city" id="city" placeholder="city" />
      </FormGroup>

      <FormGroup>
        <Label for="state">State</Label>
          <Input type="text" name="state" id="state" placeholder="state"/>
      </FormGroup>

      <FormGroup>
        <Label for="zip">Zip Code</Label>
          <Input type="text" name="zip" id="zip" placeholder="zip code"/>
      </FormGroup>

         <h4>Notes or instructions (optional)</h4>

      <FormGroup>
        <Input type="textarea" name="text" id="exampleText" placeholder="Notes or instructions (optional)"/>
      </FormGroup>

      </Form>

          <Button color="primary">Enter Payment Info</Button>

    </div>
 }

}

export default Info;