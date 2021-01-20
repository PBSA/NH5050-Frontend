import React, { Component } from 'react';
import {
  FormControl, Input, InputAdornment,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Visibility, VisibilityOff } from '@material-ui/icons';

class StripeForm extends Component {

  state = {
    showPassword: false,
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword});
  }

  render() {
    const { showPassword } = this.state;

    return (
      <FormControl>
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

export default StripeForm;
