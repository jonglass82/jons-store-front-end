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

  addToCartButton = (props, isSold) => {
    const inCart = localStorage.getItem(JSON.stringify(props))

    if(inCart){
      return <Button outline color="primary" disabled={true}>Already added to cart</Button>
    }
    else if(isSold){
      return <Button disabled={true}>SOLD OUT</Button>
    }
        return <Button outline color="primary" onClick={this.carted}>
              Add To Cart
            </Button>
  }



  render () {

    const product = this.props.product;
    const sold = product.sold === "yes";

    return (
      <div className="product">

        <div className="productDetails">

            
        <div className={sold ? "soldTag" : ""} style={{height: '25px'}}> {sold ? "SOLD" : ""} </div>
            <div className="productImageContainer" style={{textAlign:'center'}}>{this.props.images && this.props.images.length && <img src={this.props.images[0]} width={160} height={160}></img> }</div>
            <div className="productTitle">{this.props.title}</div>
            <div>${this.props.price}</div>

            <Button className="viewProductButton" outline color="primary" onClick={this.modalToggle} block>View</Button>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="sm" centered="true" style={{width:'100%'}}>
          
          <ModalHeader toggle={this.modalToggle}>
            {this.props.title}
          </ModalHeader>

          <ModalBody>

                  <div className={sold ? "soldTag" : ""} style={{height: '25px'}}> {sold ? "SOLD" : ""} </div>

     
            <div className="modalImageContainer">
                {this.props.images && this.props.images.length && 
                <UncontrolledCarousel interval={null} items={this.props.images.map(image => {
                  return { src: image };
                    })}/>
                  }

            </div>


                    {product.description}

                    <h4>$ {product.price}</h4>

          </ModalBody>

          <ModalFooter>

            {this.addToCartButton(this.props.product._id, sold)}

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