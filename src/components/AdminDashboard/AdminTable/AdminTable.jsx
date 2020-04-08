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

  renderTableRow = (rowData, i) => {
    const rowArray = Object.values(rowData);
    let row;
    row = rowArray.map(el => { return <TableCell key={el}>{el}</TableCell> });
    return row;
  }

  render() {
    const {tableData} = this.props;
    const {currentPage, rowsPerPage} = this.state;
    let pages = Math.ceil(tableData.length/rowsPerPage);
    console.log('totalRows: ', pages);
    console.log('state: ', this.state);
    return (
      <>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
              {this.generateHeadCells().map(headCell =>
  					    <TableCell key={headCell.id}>
                  {headCell.label}
                </TableCell>
              )}
              </TableRow>
            </TableHead>
            <TableBody>
                {tableData && tableData.slice( currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((rowData, i) =>
                  <TableRow>
                    {this.renderTableRow(rowData, i)}
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 25, 50]}
          component="div"
          count={tableData.length}
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
