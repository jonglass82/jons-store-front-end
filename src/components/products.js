import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
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
      });
    }
  };

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

    return (<div>
      
                <div className="header">
                  A Cool Breeze
                </div>
          
        <div className="all-products"> 
            
          <div>
              
              <Nav tabs className="nav nav-tabs nav-justified">

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

              <div style={{padding:'20px'}}>
                <h3>All Items:</h3>
              </div>

                    <div className="grid-container">

                        {this.state.products.map((product) => {
                          
                          return ( 
                            <Product
                              key={product._id}
                              product = {product}
                              title = {product.title}
                              description = {product.description}
                              price = {product.price}
                              images = {product.images}
                              addToCart={this.props.addToCart}
                            />
                          )
                          
                        })}

                    </div>
                      
                </Col>
              </Row>
            </TabPane>


            <TabPane tabId="2">
              <Row>    
                <Col sm="12">

                      <div style={{padding:'20px'}}>
                          <h3>All Clothing</h3>
                      </div>

                      <div className="grid-container">

                      {this.state.products.map((product) => {
                        
                        return ( 
                          <Product
                            key={product._id}
                            product = {product}
                            title = {product.title}
                            description = {product.description}
                            price = {product.price}
                            images = {product.images}
                            addToCart={this.props.addToCart}
                          />
                        )
                        
                      })}

                    </div>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="3">
              <Row>    
                <Col sm="12">

                      <div style={{padding:'20px'}}>
                          <h3>All collectibles</h3>
                      </div>

                      <div className="grid-container">

                        {this.state.products.map((product) => {
                          
                          return ( 
                            <Product
                              key={product._id}
                              product = {product}
                              title = {product.title}
                              description = {product.description}
                              price = {product.price}
                              images = {product.images}
                              addToCart={this.props.addToCart}
                            />
                          )
                        
                      })}

                    </div>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="4">
              <Row>    
                <Col sm="12">

                      <div style={{padding:'20px'}}>
                          <h3>All artwork</h3>
                      </div>

                      <div className="grid-container">

                        {this.state.products.map((product) => {
                          
                          return ( 
                            <Product
                              key={product._id}
                              product = {product}
                              title = {product.title}
                              description = {product.description}
                              price = {product.price}
                              images = {product.images}
                              addToCart={this.props.addToCart}
                            />
                          )
                        
                      })}

                    </div>

                </Col>
              </Row>
             </TabPane>

            </TabContent>

          </div>

      </div>
      </div>
    )
  }
}

export default Products;