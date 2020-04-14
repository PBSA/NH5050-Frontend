import React, { Component } from 'react';
import {
  Card, CardContent
} from '@material-ui/core';

export default class AdminTicketDetails extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          ticket details
        </CardContent>
      </Card>
    );
  }

}
