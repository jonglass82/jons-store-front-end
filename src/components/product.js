import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledCarousel, Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

class Product extends React.Component {

  constructor(props) {

    super(props);
    this.modalToggle = this.modalToggle.bind(this);
    this.state = {
        modal: false,
        visible: false,
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
      return <Button variant="contained" color="primary" disabled={true}>Already added to cart</Button>
    }
    else if(isSold){
      return <Button disabled={true}>SOLD OUT</Button>
    }
        return <Button variant="contained" color="primary" onClick={this.carted}>
              Add To Cart
            </Button>
  }

  pricePlusShipping = (item, shipping) => {
    const total = parseFloat(item) + parseFloat(shipping);
    return total.toFixed(2);
  }

  showProductControls = () => {
    if(window.innerWidth > 600){
      this.setState({
        visible: true
      })
    }
  }

  hideProductControls = () => {
    if(window.innerWidth > 600){
      this.setState({
        visible: false
      })
    }
  }


  render () {

    const product = this.props.product;
    const sold = product.sold === "yes";

    return (
      <div className="product">

        <div className="productDetails" onMouseEnter={this.showProductControls} onMouseLeave={this.hideProductControls} onClick={this.modalToggle}>

        <div className={sold ? "soldTag" : ""}> {sold ? "SOLD OUT" : ""} </div>

            <div className="productImageContainer" style={{textAlign:'center'}}>{this.props.images && this.props.images.length && <img alt="" src={this.props.images[0]} width="100%"></img> }</div>
            
            <div style={{visibility: this.state.visible ? 'visible' : 'hidden'}} className={this.state.visible ? "productControlsDiv productControlsShow" : "productControlsDiv"}>

              <p className="productTitle">
                <strong>{this.props.title}</strong>
              </p>
            
              <div>
               <strong>
                <h5>${this.props.price}</h5>
                </strong>
              </div>

            </div>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="md" centered={true} style={{height: 'auto'}}>
          
          <ModalHeader toggle={this.modalToggle} style={{'borderBottom': '0'}}>
            <b>{this.props.title}</b>
          </ModalHeader>

          <ModalBody className="rounded-0">

          <Container>

              <Row>

                <Col md="6">

                        <div className={sold ? "soldBanner" : ""}> {sold ? "(SOLD OUT)" : ""} </div>
           
                        <div className="modalImageContainer">
                            {this.props.images && this.props.images.length && 
                            <UncontrolledCarousel interval={null} items={this.props.images.map(image => {
                              return { src: image };
                                })}/>
                              }

                        </div>

                  </Col>

                  <Col md="6">

                        <p style={{'padding': '10px 5px 0px 5px'}}>{product.description}</p>


                            <ul style={{'textAlign':'right'}}>

                              <li>Price $<strong>{product.price}</strong></li>

                              <li>+ Shipping <strong>${product.shipping}</strong></li>

                              <li><div style={{'height': '1px', 'backgroundColor': 'black', 'marginTop': '5px'}}></div></li>

                              <li style={{'fontSize': '2rem'}}>$ {this.pricePlusShipping(product.price, product.shipping)}</li>

                            </ul>

                  </Col>

              </Row>

              </Container>

          </ModalBody>

          <ModalFooter style={{'borderTop': '0'}}>

            <Button variant="contained" color="secondary" style={{margin: '5px'}} onClick={this.modalToggle}>
                Back
            </Button>

            {this.addToCartButton(this.props.product._id, sold)}

        </ModalFooter>

      </Modal>
    </div>

    )
  }

}

export default Product;