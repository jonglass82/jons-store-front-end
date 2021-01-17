import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCarousel } from 'reactstrap';


class Product extends React.Component {

  constructor(props) {

    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
        modal: false,
        images: []
     }
   }

  modalToggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  carted = () => {
    this.props.addToCart(this.props.product._id, this.props.product);
    this.modalToggle();
  }

  addToCartButton = (props) => {
    const inCart = localStorage.getItem(JSON.stringify(props))

    if(inCart){
      return <Button outline color="primary" disabled={true}>Already added to cart!</Button>
    }
        return <Button outline color="primary" onClick={this.carted}>
              Add To Cart
            </Button>
  }



  render () {

    const product = this.props.product;

    return (
      <div className="product">

        <div className="productDetails">

            <div style={{textAlign:'center'}}>{this.props.images && this.props.images.length && <img src={this.props.images[0]} width={175} height={175}></img> }</div>
            <div>{this.props.title}</div>
            <div>${this.props.price}</div>

            <Button outline color="primary" onClick={this.modalToggle} block>View</Button>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="sm">
          
          <ModalHeader toggle={this.modalToggle}>
            {this.props.title}
          </ModalHeader>

          <ModalBody>
     
            <div className="modalImageContainer">
                {this.props.images && this.props.images.length && 
                <UncontrolledCarousel items={this.props.images.map(image => {
                  return { src: image };
                    })}/>
                  }

            </div>

                  <span>Description:</span>

                    {product.description}

                  <h5>Price:</h5>

                    {product.price}

          </ModalBody>

          <ModalFooter>

            {this.addToCartButton(this.props.product._id)}

            <Button color="secondary" onClick={this.modalToggle}>
                Back
            </Button>

        </ModalFooter>

      </Modal>
    </div>


    )
  }

}

export default Product;