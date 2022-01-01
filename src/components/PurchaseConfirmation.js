import React from 'react';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import { Link } from "react-router-dom";
import axios from 'axios';
import Button from '@material-ui/core/Button';


class PurchaseConfirmation extends React.Component{

	constructor(props){
		super(props);
		this.state = {}
	}

	clearCart() {
        axios.get(`${process.env.REACT_APP_API_STR}/api/products`).then(res => {
	        const products = res.data;
	        products.map((product) => {
		        if(localStorage.getItem(JSON.stringify(product._id))){
		          localStorage.removeItem(JSON.stringify(product._id));
		        }
      		})
	    })
    };

	componentDidMount(){
		this.clearCart();
		this.props.updateCartCount(0);
		window.scrollTo(0, 0);
	}

	render(){

		  return <div>

                <div id="checkoutConfirmation">

                  <h2>Your purchase is complete!</h2>

                  <div style={{padding: "20px 0px 20px 0px"}}>
                    <CheckCircleOutlinedIcon style={{fontSize:'150px', color:'green'}}></CheckCircleOutlinedIcon>
                  </div>

                  <p>An email receipt has been sent to {this.props.customerEmail}</p>

                  <a href="/">back home</a>

                </div>

          </div>
	}

}

export default PurchaseConfirmation;