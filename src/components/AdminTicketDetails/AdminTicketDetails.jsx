import React, { Component } from 'react';
import { Card, CardContent, Box } from '@material-ui/core';
import { RaffleService } from '../../services';

function padZeros(num, totalDigitsRequired) {
  let str = `${num}`;
  while (str.length < totalDigitsRequired) str = `0${str}`;
  return str;
}

function TicketData({ label, value }) {
  return (
    <div className="admin-ticket-data">
      <label>{label}</label>
      <div>{value}</div>
    </div>
  );
}

function getTicketId(ticket) {
  const { ticket_sales: { id, raffle_id } } = ticket;
  return `R${padZeros(raffle_id, 2)}T${padZeros(id, 4)}`;
}

export default class AdminTicketDetails extends Component {
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
    console.log('TICKET DETAILS RENDERED: ', ticket);
    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          {ticket && (
          <Box display="flex" flexDirection="row">
            <Box>
              <TicketData label="Ticket ID" value={getTicketId(ticket)} />
              <TicketData label="First Name" value={ticket.ticket_sales.player.firstname} />
              <TicketData label="Last Name" value={ticket.ticket_sales.player.lastname} />
              <TicketData label="Email Address" value={ticket.ticket_sales.player.email} />
              <TicketData label="Mobile Phone" value={ticket.ticket_sales.player.mobile} />
              <TicketData label="Detachment" value={ticket.ticket_sales.beneficiary.user.name} />
            </Box>
            <Box>
              <label>Entries</label>
              <div>
                {ticket.entries.map((entry) => (
                  <div key={entry.id}>
                    {getTicketId(ticket)}
                    E
                    {padZeros(entry.id, 5)}
                  </div>
                ))}
              </div>
            </Box>
          </Box>
          )}
        </CardContent>
      </Card>
    );
  }
}
