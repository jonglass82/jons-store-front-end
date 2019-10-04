import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import Product from './product';


class Products extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      products: [],
      activeTab: '1'
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        carted_products: "jon"
      });
    }
  };

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res=>{
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

    return (
          
        <div id="all-products"> 
            
          <div>
              
              <Nav tabs>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}>

                    All

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}>

                    Clothing

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}>

                    Collectibles

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}>

                    Artwork

                  </NavLink>
                </NavItem>

        </Nav>

        
        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h1>All Items:</h1>

                    <ul>

                      {this.state.products.map((product) => {
                        
                        return ( 
                          <Product
                            key={product}
                            product={product}
                            handlePurchase={this.props.handlePurchase}
                          />
                        )
                        
                      })}

                    </ul>
                      
                </Col>
              </Row>
            </TabPane>


            <TabPane tabId="2">
              <Row>    
                <Col sm="12">

                      <h1>All Clothing</h1>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="3">
              <Row>    
                <Col sm="12">

                      <h1>All collectibles</h1>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="4">
              <Row>    
                <Col sm="12">

                      <h1>All artwork</h1>

                </Col>
              </Row>
             </TabPane>

            </TabContent>

          </div>

      </div>
    )
  }
}

export default Products;