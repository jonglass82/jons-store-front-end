import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';


class Products extends React.Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      products: [],
      activeTab: '1'
    }
  }

  getProducts() {
      axios.get('http://localhost:3001/api/products').then(res=>{
      const products = res.data;
      this.setState((state, props) => ({
        products: products
      }));
    })
  }

  componentDidMount() {
      this.getProducts();
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {

    return (
          <div id="all-products"> 

      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              All
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Clothing
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h1>All Items:</h1>

            <ul>

              {this.state.products.map((product) =>{
                return <li>{product} <a href="http://localhost:3001/api/product">show</a></li>
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
              </TabContent>
          </div>

          </div>
    )
  }
}

export default Products;