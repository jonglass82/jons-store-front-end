import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

class Collectible extends React.Component {

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

    const {title, description, image} = this.props;

    return (
      <div className="product">

        <div className="productDetails" onMouseEnter={this.showProductControls} onMouseLeave={this.hideProductControls} onClick={this.modalToggle}>

            <div className="productImageContainer" style={{textAlign:'center'}}><img alt="" src={image} width={200} height={200}></img></div>
            
            <div style={{visibility: this.state.visible ? 'visible' : 'hidden'}} className={this.state.visible ? "collectibleControlsDiv collectibleControlsShow" : "collectibleControlsDiv"}>

              <p style={{padding: '20px 5px 5px 5px'}}>
                <strong>{title}</strong>
              </p>

            </div>

        </div>


        <Modal isOpen={this.state.modal} toggle={this.modalToggle} size="md" centered="true" style={{height: 'auto'}}>
          
          <ModalHeader toggle={this.modalToggle} style={{'borderBottom': '0'}}>
            <b>{this.props.title}</b>
          </ModalHeader>

          <ModalBody className="rounded-0">

          <Container>

              <Row>

                <Col md="6">
           
                        <div className="modalImageContainer">
       						
       						         <img src={image} alt="" width={250}/>

                        </div>

                  </Col>

                  <Col md="6">

                      <li>{description}</li>

                  </Col>

              </Row>

              </Container>

          </ModalBody>

          <ModalFooter style={{'borderTop': '0'}}>

            <Button variant="contained" color="secondary" onClick={this.modalToggle}>
                Back
            </Button>

        </ModalFooter>

      </Modal>
    </div>

    )
  }

}

export default Collectible;