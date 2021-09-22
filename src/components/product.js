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
    this.setState({
      visible: true
    })
  }

  hideProductControls = () => {
    this.setState({
      visible: false
    })
  }



  render () {

    const product = this.props.product;
    const sold = product.sold === "yes";

    return (
      <div className="product">

        <div className="productDetails" onMouseEnter={this.showProductControls} onMouseLeave={this.hideProductControls}>

            <div className={sold ? "soldTag" : ""} style={{height: '25px'}}> {sold ? "SOLD" : ""} </div>

            <div className="productImageContainer" style={{textAlign:'center'}}>{this.props.images && this.props.images.length && <img alt="" src={this.props.images[0]} width={160} height={160}></img> }</div>
            
            <div style={{visibility: this.state.visible ? 'visible' : 'hidden'}} className={this.state.visible ? "productControlsDiv productControlsShow" : "productControlsDiv"}>

              <div className="productTitle">{this.props.title}</div>
            
              <div>${this.props.price}</div>

              <button onClick={this.modalToggle} block>View</button>

            </div>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="md" centered="true" style={{height: 'auto'}}>
          
          <ModalHeader toggle={this.modalToggle} style={{'borderBottom': '0'}}>
            {this.props.title}
          </ModalHeader>

          <ModalBody className="rounded-0">

          <Container>

              <Row>

                <Col md="6">

                        <div className={sold ? "soldTag" : ""} style={{height: '25px'}}> {sold ? "SOLD" : ""} </div>
           
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

            <Button variant="contained" color="secondary" onClick={this.modalToggle}>
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