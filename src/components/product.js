import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";


class Product extends React.Component {

  constructor(props) {
    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    // this.purchase = this.purchase.bind(this);
    this.state = {
        modal: false
     }
   }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  purchase = () => {
    this.props.handlePurchase(this.props.product);
    this.modalToggle();
  }


  render () {

    const product = this.props.product;

    return (
      <div>

        <div>
        <ul>
      <li><h2>{this.props.title}</h2></li>
      <li>{this.props.description}</li>
      <li>${this.props.price}</li>
        <Button outline color="primary" onClick={this.modalToggle}>View
        </Button>
        </ul>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>

            <h3>Description:</h3>
              {product.description}

            <h3>Price:</h3>
              {product.price}

          </ModalBody>

          <ModalFooter>

            <Link to="/purchase">
              <Button outline color="primary" onClick={this.purchase}>
                Purchase
              </Button>
            </Link>{' '}


           <Button outline color="info" onClick={this.modalToggle}>
              Add To Cart
            </Button>

          <Button color="secondary" onClick={this.modalToggle}>
              Cancel
          </Button>

        </ModalFooter>
      </Modal>
    </div>
    )
  }

}

export default Product;