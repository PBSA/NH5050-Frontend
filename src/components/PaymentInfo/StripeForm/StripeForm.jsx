import React, { Component } from 'react';
import {FormControl, FormHelperText, Input, InputAdornment} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {ElementsConsumer, CardElement} from '@stripe/react-stripe-js';

const createOptions = () => ({
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Open Sans, sans-serif',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#c23d4b',
    },
  },
});

class StripeForm extends Component {

  state = {
    showPassword: false,
  }

  componentDidUpdate() {
    this.props.stripeCallback(this.props.stripe, this.props.elements);
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  render() {
    const {showPassword} = this.state;

    return (
      <FormControl>
        <div className='stripe-header'>
          <FormHelperText className="stripe-helpertext">
            Card details
          </FormHelperText>
          <div className="stripe">
            <CardElement
              onChange={this.props.handleChange}
              {...createOptions()}
            />
          </div>
        </div>
        <div className='stripe-header'>
          <FormHelperText className="stripe-helpertext">
            Name on Card
          </FormHelperText>
          <div className="stripe">
            <input className="stripe-input" placeholder="Name" onChange={this.props.handleNameChange}/>
          </div>
        </div>
        <div className="stripe-pw">
          <Input
            disableUnderline
            className="stripe-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Seller Password (Admin Only)"
            onChange={this.props.handleSellerPasswordChange}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </div>
      </FormControl>
    );
  }
}

export default function InjectedCheckoutForm(props) {
  return (
    <ElementsConsumer>
      {({stripe, elements}) => (
        <StripeForm stripeCallback={props.stripeCallback} 
        handleSellerPasswordChange={props.handleSellerPasswordChange} 
        handleNameChange={props.handleNameChange}
        handleChange={props.handleChange}
        stripe={stripe} 
        elements={elements} />
      )}
    </ElementsConsumer>
  );
}
