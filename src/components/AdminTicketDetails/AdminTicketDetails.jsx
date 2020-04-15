import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card, CardContent, Box, Button,
} from '@material-ui/core';
import { RaffleService } from '../../services';
import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';

function padZeros(num, totalDigitsRequired) {
  let str = `${num}`;
  while (str.length < totalDigitsRequired) str = `0${str}`;
  return str;
}

function TicketData({ label, value }) {
  return (
    <div className="ticket-detail-data">
      <span>{label}</span>
      <span className="ticket-detail-data-value">{value}</span>
    </div>
  );
}

function getTicketId(ticket) {
  const { ticket_sales: { id, raffle_id } } = ticket;
  return `R${padZeros(raffle_id, 2)}T${padZeros(id, 4)}`;
}

class AdminTicketDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ticket: null,
    };
  }

  componentDidMount() {
    const { match: { params: { ticket_id } } } = this.props;
    RaffleService.getTicketDetails(ticket_id)
      .then((ticket) => this.setState({ ticket }));
  }

  render() {
    const { ticket } = this.state;
    return (
      <Card className="ticket-detail" variant="outlined">
        <CardContent>
          {ticket && (
          <Box className="ticket-detail-wrapper" display="flex" flexDirection="row">
            <Box>
              <TicketData label="Ticket ID" value={getTicketId(ticket)} />
              <TicketData label="First Name" value={ticket.ticket_sales.player.firstname} />
              <TicketData label="Last Name" value={ticket.ticket_sales.player.lastname} />
              <TicketData label="Email Address" value={ticket.ticket_sales.player.email} />
              <TicketData label="Mobile Phone" value={ticket.ticket_sales.player.mobile} />
              <TicketData label="Detachment" value={ticket.ticket_sales.beneficiary.user.name} />
            </Box>
            <Box>
              <div className="ticket-detail-data">
                <span className="ticket-detail-header">Entries</span>
                {ticket.entries.map((entry) => (
                  <span className="ticket-detail-data-value" key={entry.id}>
                    {getTicketId(ticket)}
                    E
                    {padZeros(entry.id, 5)}
                  </span>
                ))}
              </div>
            </Box>
          </Box>
          )}
          <Button className="ticket-detail-button" type="button" onClick={() => this.props.navigate(RouteConstants.ADMIN_TICKETS)}>Back</Button>
        </CardContent>
      </Card>
    );
  }
}


export default (connect(null, (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
))(AdminTicketDetails));
