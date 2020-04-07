import React, { Component } from 'react';
import {
  TableContainer, Table, TablePagination, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core';
import { RouteConstants } from '../../../constants';

class AdminTable extends Component {
  
  state = {
    currentPage: 0,
    rowsPerPage: 15,
  }

  changePage = (e, index) => {
		e.preventDefault();
		this.setState({ currentPage: index });
  }

  changeRowsPerPage = event => {
		this.setState({rowsPerPage: event.target.value});
		this.changePage(event, 0);
  };
  
  generateHeadCells = () => {
  	switch(this.props.route) {
  		case RouteConstants.ADMIN_BENEFICIARIES:
  			return [
  				{id: 'beneficiaries_name', label: 'Beneficiaries Name'},
  				{id: 'beneficiaries_type', label: 'Type'},
  				{id: 'beneficiaries_proceeds', label: 'Proceeds'}
  			];
        case RouteConstants.ADMIN_SELLERS:
  			return [
  				{id: 'seller_name', label: 'Seller Name'},
  				{id: 'seller_sales', label: 'Ticket Sales'},
  				{id: 'seller_funds', label: 'Funds Raised'},
  			];
  		case RouteConstants.ADMIN_RAFFLES:
  			return [
  				{id: 'raffles_name', label: 'Raffle Name'},
  				{id: 'raffles_entries', label: 'Entries'},
  				{id: 'raffles_jackpot', label: 'Jackpot'},
        ];
      case RouteConstants.ADMIN_TICKETS:
        return [
          {id: 'ticket_id', label: 'Ticket Id'},
          {id: 'ticket_player', label: 'Player'},
          {id: 'ticket_entries', label: 'Entries'},
          {id: 'ticket_value', label: 'Value'}
        ];
  		default:
  			return [];
  	}
  }

  render() {
    const {tableData} = this.props;
    const {currentPage, rowsPerPage} = this.state;
    let totalRows = Math.ceil(tableData.length/rowsPerPage);
    console.log('route: ', this.props);
    return (
      <>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
              {this.generateHeadCells(tableType).map(headCell =>
  					    <TableCell key={headCell.id} sortDirection={sortType}>
                  {headCell.label}
                </TableCell>
              )}
              </TableRow>
            </TableHead>
            <TableBody>
            {tableData && tableData.slice( currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((rowData, i) =>
  			      <TableCell>test!</TableCell>
  			    )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          onChangePage={this.changePage}
          onChangeRowsPerPage={this.changeRowsPerPage}
        />
      </>
    );
  }
}

export default AdminTable;
