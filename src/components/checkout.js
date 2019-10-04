import React from 'react'

class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      carted_product: []
     }
   }

render (){


  return  (<div>

    <div>Checkout page</div>
      <p>{this.props.selectedProduct}</p>
    </div>

    )
}

}

export default Checkout;