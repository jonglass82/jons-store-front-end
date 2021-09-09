import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';


class AdminProduct extends React.Component{

  constructor(props) {
    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
        modal: false,
        newTitleValue: '',
        newDescriptionValue: '',
        newPriceValue: '',
        message: ''
     }
    this.onChange = this.onChange.bind(this);
   }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      newTitleValue: '',
      newDescriptionValue: '',
      newPriceValue: ''
    }));
  }


  reset() {
    this.setState({
      newTitleValue: '',
      newDescriptionValue: '',
      newPriceValue: ''
    })
  }


  initializeInput = (p) => {
    this.setState({
      newTitleValue: p.title,
      newDescriptionValue: p.description,
      newPriceValue: p.price
    })
  }


  updateProduct = (id) => {

    const instance = axios.create({
      headers: {"Access-Control-Allow-Origin": "*"}
    });

    const params = {
      newTitle: this.state.newTitleValue,
      newDescription: this.state.newDescriptionValue,
      newPrice: this.state.newPriceValue
    }

    instance.put(`${process.env.REACT_APP_API_STR}/api/update/`+ id, params).then(res => {   
        const message = res.data;
        const newProduct = {
          _id: id,
          title: params.newTitle,
          description: params.newDescription,
          price: params.newPrice
        }
        this.props.updateProduct(newProduct);
        this.props.getMessage(message)
      })
    this.modalToggle();
    this.reset();
  }


  render () {

    const product = this.props.product;

    return (
      <div>{this.props.title}
        <Button outline color="primary" onClick={this.modalToggle}>Edit
        </Button>

        <Modal isOpen={this.state.modal} toggle={this.modalToggle} className={this.props.className} onOpened={() => this.initializeInput(product)}>

          <ModalHeader toggle={this.modalToggle}>
            Editing: {this.props.title}
          </ModalHeader>

          <ModalBody>

            <h2>Title:</h2>
            <Input name="newTitleValue" defaultValue={this.props.title} type="text" onChange={this.onChange}></Input>
 
           <h2>Description:</h2>
           <Input name="newDescriptionValue" defaultValue={this.props.description} type="text" onChange={this.onChange}></Input>
  
           <h2>Price:</h2>
           <Input name="newPriceValue" defaultValue={this.props.price} type="text" onChange={this.onChange}></Input>

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

    </div>
    )
  }

}

export default AdminProduct;