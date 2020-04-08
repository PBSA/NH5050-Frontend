import React, { Component } from 'react';
import {
  Card, CardContent,
  TextField, Button,
  Select, MenuItem, InputLabel
} from '@material-ui/core';
import strings from '../../assets/locales/strings';

import { OrganizationService } from '../../services';

export default class SellerForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      status: 'active',
      password: '',
      errorText: null,
      ...props
    };
  }

  async createOrUpdateSeller(e) {
    e.preventDefault();

    try {
      const response = await OrganizationService.createOrUpdateSeller({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobile: this.state.mobile,
        status: this.state.status,
        password: this.state.password
      });

      console.log(response);
    } catch (err) {
      this.setState({errorText: err.message});
    }
  }

  render() {
    const { errorText, firstName, lastName, email, mobile, status, password } = this.state;

    return (
      <Card className="order" variant="outlined">
        <CardContent>
          <form className="seller-form" onSubmit={e => this.createOrUpdateSeller(e)}>
            {errorText && <Alert className="seller-form-alert" severity="error">{errorText}</Alert>}
            <div className="seller-form-info">
              <TextField
                className="seller-form-info-input"
                label={strings.orderInfo.firstNameLabel}
                variant="outlined"
                value={firstName}
                onChange={(e) => this.setState({firstName: e.target.value})}
              />
              <TextField
                className="seller-form-info-input"
                label={strings.orderInfo.lastNameLabel}
                variant="outlined"
                value={lastName}
                onChange={(e) => this.setState({lastName: e.target.value})}
              />
              <TextField
                className="seller-form-info-input"
                label={strings.orderInfo.emailLabel}
                variant="outlined"
                value={email}
                onChange={(e) => this.setState({email: e.target.value})}
              />
              <TextField
                className="seller-form-info-input"
                label={strings.orderInfo.phoneLabel}
                variant="outlined"
                value={mobile}
                onChange={(e) => this.setState({mobile: e.target.value})}
              />
              <InputLabel>Status</InputLabel>
              <Select
                className="seller-form-info-input"
                value={status}
                variant="outlined"
                onChange={e => this.setState({status: e.target.value})}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
              <TextField
                className="seller-form-info-input"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => this.setState({password: e.target.value})}
              />
              <div className="seller-form-button-wrapper">
                <Button
                  className="seller-form-button"
                  type="submit"
                >
                  {strings.adminSellerForm.save}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }
}
