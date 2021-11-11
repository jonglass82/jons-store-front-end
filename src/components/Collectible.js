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

    const {title, description} = this.props;

    return (
      <div className="product">

        <div className="productDetails" onMouseEnter={this.showProductControls} onMouseLeave={this.hideProductControls} onClick={this.modalToggle}>

            <div className="productImageContainer" style={{textAlign:'center'}}><img alt="" src="http://res.cloudinary.com/dbln7wsqw/image/upload/v1576099500/l3v4jxx37xosn6svlhmc.jpg" width={160} height={160}></img></div>
            
            <div style={{visibility: this.state.visible ? 'visible' : 'hidden'}} className={this.state.visible ? "collectibleControlsDiv collectibleControlsShow" : "collectibleControlsDiv"}>

              <p style={{padding: '20px 5px 5px 5px'}}>
                <strong>{title}</strong>
              </p>

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
           
                        <div className="modalImageContainer">
       						
       						<img src=""/>

                        </div>

                  </Col>

                  <Col md="6">

                        <p style={{'padding': '10px 5px 0px 5px'}}>{title}</p>

                            <ul style={{'textAlign':'right'}}>

                              <li><div style={{'height': '1px', 'backgroundColor': 'black', 'marginTop': '5px'}}></div></li>

                              <li>{description}</li>

                            </ul>

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