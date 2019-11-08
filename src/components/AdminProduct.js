import React from 'react';
import axios from 'axios';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


class AdminProduct extends React.Component{

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

  updateProduct = (id) => {

    const instance = axios.create({
      headers: {"Access-Control-Allow-Origin": "*"}
    });

    const params = {
      newTitle: "new item",
      newDescription: "a cool new item",
      newPrice: "$1"
    }

    instance.put('http://localhost:3001/api/update/'+ id, params).then(res => {   
      console.log("Product created!");
    })

  }

  render () {

    const product = this.props.product;

    return (
      <li>{this.props.title}
        <Button outline color="primary" onClick={this.modalToggle}>View
        </Button>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className}>
          <ModalHeader toggle={this.modalToggle}>
            Editing: {this.props.title}
          </ModalHeader>
          <ModalBody>
            <h3>Image</h3>

            <h3>Description:</h3>
              {product.description}
              {this.props.id}

            <h3>Price:</h3>

            <h3>Shipping:</h3>

          </ModalBody>

          <ModalFooter>

              <Button outline color="primary" onClick={() => this.updateProduct(this.props.id)}>
                Save Changes
              </Button>

            <Button color="secondary" onClick={this.modalToggle}>
              Cancel
            </Button>
        </ModalFooter>
      </Modal>

    </li>
    )
  }

}

export default AdminProduct;