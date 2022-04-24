import React from 'react';


class Header extends React.Component {

	constructor(props){
	  super(props);
	  this.state={}
	}

    render (){
      return (

      <div className="header">

          <img src="/chair.png" height='100%'></img>

      </div> 
       
      )
    }

}

export default Header; 