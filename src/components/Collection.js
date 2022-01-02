import React from 'react';
import axios from 'axios';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Collectible from './Collectible';


class Collection extends React.Component{

	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			collectibles: [],
			activeTab: '1'
		}
	}

	toggle(tab) {
	    if (this.state.activeTab !== tab) {
	      this.setState({
	        activeTab: tab,
	      });
	    }
  	};

	getCollectibles = () => {
		axios.get(`${process.env.REACT_APP_API_STR}/api/collectibles`).then((res)=>{
			const collectibles = res.data;
			this.setState({
				collectibles: collectibles
			})
		})
	}

	componentDidMount = () => {
		this.getCollectibles();
    window.scrollTo(0, 0);
	}

	render (){
		return <div className="projectsDiv">

		<h2>My collection</h2>

		<div className="all-products"> 
            
          <div>
              
              <Nav tabs className="nav nav-tabs nav-justified">

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}>

                    All

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}>

                    Skateboards

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '3' })}
                    onClick={() => { this.toggle('3'); }}>

                    Oddities

                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '4' })}
                    onClick={() => { this.toggle('4'); }}>

                    Artwork

                  </NavLink>
                </NavItem>

        </Nav>

        
        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <Row>
              <Col sm="12">

                    <div className="grid-container">

                        {this.state.collectibles.map((collectible) => {
                          
                          return ( <div>

                         	<Collectible
                              key={collectible._id}
                              title = {collectible.Title}
                              description = {collectible.Description}
                              image = {collectible.Image}
                            />

                          	</div>

                          )
                          
                        })}

                    </div>
                      
                </Col>
              </Row>
            </TabPane>


            <TabPane tabId="2">
              <Row>    
                <Col sm="12">


                      <div className="grid-container">

                      {this.state.collectibles.filter((c)=>{return c.Category === "Skateboards"}).map((collectible) => {

                          return (<div>
                          	<Collectible
                              key={collectible._id}
                              title = {collectible.Title}
                              description = {collectible.Description}
                              image = {collectible.Image}
                            />
                          	</div> 
                      
                          )
                        
                      })}

                    </div>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="3">
              <Row>    
                <Col sm="12">

                      <div className="grid-container">

                        {this.state.collectibles.filter((c)=>{return c.Category === "Oddities"}).map((collectible) => {

                          return (<div>
                          	<Collectible
                              key={collectible._id}
                              title = {collectible.Title}
                              description = {collectible.Description}
                              image = {collectible.Image}
                            />
                          	</div> 
                           
                          )
                        
                      })}

                    </div>
                </Col>
              </Row>
             </TabPane>


            <TabPane tabId="4">
              <Row>    
                <Col sm="12">

                      <div className="grid-container">

                        {this.state.collectibles.filter((p)=>{return p.category === "Artwork"}).map((collectible) => {

                          return (<div>
                          	<Collectible
                              key={collectible._id}
                              title = {collectible.Title}
                              description = {collectible.Description}
                              image = {collectible.Image}
                            />
                          	</div> 
                            
                          )
                        
                      })}

                    </div>

                </Col>
              </Row>
             </TabPane>

            </TabContent>

          </div>

      </div>

		</div>
	}

}

export default Collection;