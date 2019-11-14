import React from 'react'

class Checkout extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
      myCart: []
     }
   }

   getMyItems() {

    const newArray = []

    Object.keys(localStorage).forEach(function(key){
       newArray.push(localStorage.getItem(key));
    });

    this.setState({
      myCart: newArray
    })
    console.log(localStorage.length);
   }

   componentDidMount(){
    this.getMyItems();
   }

render (){

  return  (<div>

    <h1> My Shopping Cart:</h1>

          {this.state.myCart.map((item) => {
            return( <h6>{JSON.parse(item).title}...${JSON.parse(item).price}</h6> )
          })}

    </div>

    )
  }

}

export default Checkout;