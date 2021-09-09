import React from 'react'
import axios from 'axios';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      products: [], 
      myCart: []
     }
   }

  getProducts() {
      axios.get(`${process.env.REACT_APP_API_STR}/api/products`).then(res => {

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
      this.props.updateCartCount(newArray.length);
    })
  };

   componentDidMount(){
    this.getProducts();
   }

   removeProduct = (item) => {
      localStorage.removeItem(JSON.stringify(item));
      this.getProducts();
      window.location.href="/purchase";
   }

   getTax = (cart) => {
      let total = 0; 
      this.state.myCart.forEach((item)=>{
        total += parseFloat(item.price);
      })
      const tax = total * 0.0625;
      return tax.toFixed(2);
   }

   getShipping = (cart) => {
      let shipping = 0;
      this.state.myCart.forEach((item)=>{
        shipping += parseFloat(item.shipping);
      })
      return shipping.toFixed(2);
   }

   getSubTotal = (cart) => {
      let subtotal = 0; 
      this.state.myCart.forEach((item)=>{
        subtotal += parseFloat(item.price);
      })
      return subtotal.toFixed(2);
   }

   getTotal = (cart) => {
    if(cart.length === 0){
      return "0.00"
    }
    else{
      let total = 0; 
      let shipping = 0;
      this.state.myCart.forEach((item)=>{
        total += parseFloat(item.price);
        shipping += parseFloat(item.shipping);
      })
      total = total + shipping;
      return total.toFixed(2);
    }
   }


render (){

  return  (<div>

              <div style={{textAlign:'center', padding:'10px', fontSize:'18pt'}}>
                Items: ({this.state.myCart.length})
              </div>

             <div className="checkout">

                  <div className="shopping-cart">

                  {this.state.myCart.length > 0 ? this.state.myCart.map((product) => {
                    return <div>

                    <Container>
                      <Row xs="4" className="checkoutItem">
                        <Col style={{padding:'5px'}}><img src={product.images[0]} width={120}/></Col>
                        <Col style={{'textAlign':'left'}}>{product.title}</Col>
                        <Col style={{'textAlign':'left'}}>
                          <ul>
                            <li>${product.price}</li>
                            <li style={{'fontSize':'12px'}}><em>+ Shipping ${product.shipping}</em></li>
                          </ul>
                          </Col>
                        <Col style={{textAlign:'right', padding:'5px'}}><Button onClick={()=>{this.removeProduct(product._id)}}>Remove</Button></Col>
                      </Row>
                    </Container>

                  </div>

                  }) : <div className="noItemsDiv"> 

                  <h4>There are no items in your cart</h4> 

                  <Link to="/">Continue shopping</Link>

                  </div>}

                  </div>

             </div>

              <div className="checkoutFooter">

                <div className="breakdownHeader"></div>

                <div className="checkoutBreakdown">
                      <ul>
                        <li>Item Total: ${this.getSubTotal(this.state.myCart)}</li>
                        <li>Shipping ${this.getShipping(this.state.myCart)}</li>
                        <li style={{'marginTop':'-10px'}}>___________________________</li>
                        <li style={{fontSize:'25px'}}><strong>Order Total: ${this.getTotal(this.state.myCart)}</strong></li> 
                      </ul>
                </div>
              
                  <Link to={this.state.myCart.length > 0 ? "/purchase-info" : "#"}>
                    <Button size="large" disabled={this.state.myCart.length > 0 ? false : true} variant="contained" color="secondary" block>Checkout $<strong>{this.getTotal(this.state.myCart)}</strong></Button>
                  </Link>

              </div>

          </div>
    )
  }

}

export default Checkout;