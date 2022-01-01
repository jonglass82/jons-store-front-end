import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Product from './product';
import Header from './header';

class Products extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
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

  render() {

    return (<div>
      
        <Header />
          
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

                    <div className="grid-container">

                        {this.props.products.map((product) => {
                          
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


                      <div className="grid-container">

                      {this.props.products.filter((p)=>{return p.category == "clothing"}).map((product) => {

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

                      <div className="grid-container">

                        {this.props.products.filter((p)=>{return p.category == "collectibles"}).map((product) => {

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

                      <div className="grid-container">

                        {this.props.products.filter((p)=>{return p.category == "artwork"}).map((product) => {

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