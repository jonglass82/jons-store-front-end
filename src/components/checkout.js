import React from 'react'

class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      
     }
   }

render (){

  return  (<div>

    <div>Checkout page</div>

    <h1>You are purchasing:</h1>
      <p>{this.props.selectedProduct.title}</p>
    </div>

    )
}

}

export default Checkout;