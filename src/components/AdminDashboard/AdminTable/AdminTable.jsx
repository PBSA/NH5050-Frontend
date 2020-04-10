import React, { Component } from 'react';
import {
  TableContainer, Table, TablePagination, TableHead, TableBody, TableRow, TableCell, Paper,
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

  renderTableRow = (rowData, styleClass) => {
    const rowArray = Object.values(rowData);
    let row;
    row = rowArray.map((el, index) => { return <TableCell className={`admin-table-cell ${styleClass}`} align={index > 0 ? "right" : "left"} key={`${el}${index}`}>{el}</TableCell> });
    return row;
  }

  render() {
    const { tableData, sumRowData } = this.props;
    const { currentPage, rowsPerPage } = this.state;
    const tableLength = tableData ? tableData.length : 15;
    // const pages = Math.ceil(tableLength/rowsPerPage);
    return (
      <>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
                {this.generateHeadCells().map((headCell, index) => (
                  <TableCell className="admin-table-header" align={index > 0 ? 'right' : 'left'} key={headCell.id}>
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData && tableData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((rowData, i) => (
                <TableRow hover key={i}>
                  {this.renderTableRow(rowData)}
                </TableRow>
              ))}
              {sumRowData
                ? (
                  <TableRow hover>
                    {this.renderTableRow(sumRowData, 'admin-table-footer')}
                  </TableRow>
                )
                : null}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[15, 25, 50]}
            component="div"
            count={tableLength}
            rowsPerPage={rowsPerPage}
            page={currentPage}
            onChangePage={this.changePage}
            onChangeRowsPerPage={this.changeRowsPerPage}
          />
        </TableContainer>
      </>
    );
  }
}

export default AdminTable;
