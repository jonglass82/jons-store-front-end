import React from 'react';
import {CardElement} from 'react-stripe-elements';

class CardSection extends React.Component {
  render() {
    return (<div>

      <label>
      card number
        <CardElement style={{base: 
          {fontSize: '16px',
          color: '#424770',
          fontFamily: 'Open Sans, sans-serif',
          letterSpacing: '0.025em',
        }}} />
      </label>

      </div>
    );
  }
}

export default CardSection;
