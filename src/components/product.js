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
      <li>{product}
        <Button outline color="danger" onClick={this.modalToggle}>{product}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>
            {product}
          </ModalHeader>
          <ModalBody>
            {product}
          </ModalBody>
          <ModalFooter>

            <Link to="/purchase">
              <Button outline color="primary" onClick={this.purchase}>
                Purchase
              </Button>
            </Link>{' '}
            <Button color="secondary" onClick={this.modalToggle}>
              Cancel
            </Button>
        </ModalFooter>
      </Modal>
    </li>
    )
  }

}

export default Product;