import React, { Component } from 'react';
import {
  TableContainer, Table, TablePagination, TableHead, TableBody, TableRow, TableCell, Paper,
} from '@material-ui/core';

class AdminTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      rowsPerPage: 15
    };
  }

  changePage = (e, index) => {
		e.preventDefault();
		this.setState({ currentPage: index });
  }

  changeRowsPerPage = event => {
		this.setState({rowsPerPage: event.target.value});
		this.changePage(event, 0);
  };

  renderTableRow = (rowData, styleClass) => {
    const { columns } = this.props;

    return columns.map((column, index) => {
      const el = column.render ? column.render(rowData) : rowData[column.id];
      const isActive = column.active && column.active(rowData);

      return <TableCell className={`admin-table-cell ${styleClass}`} 
        align={index > 0 ? "right" : "left"} key={index}>
        <div>
          {column.active && <span className={isActive ? 'admin-table-dot-active' : 'admin-table-dot'}></span>}
          {el}
        </div>
      </TableCell>;
    });
  }

  render() {
    const { columns, rows, extraRows, onRowClick } = this.props;
    const { currentPage, rowsPerPage } = this.state;
    const tableLength = rows ? rows.length : 15;
    
    return (
      <>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow hover>
                {columns.map((column, index) =>
                  <TableCell className="admin-table-header" align={index > 0 ? 'right' : 'left'} key={index}>
                    {column.label}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage).map((rowData, i) => (
                <TableRow hover key={i} onClick={e => onRowClick && onRowClick(rowData)}>
                  {this.renderTableRow(rowData)}
                </TableRow>
              ))}
              {extraRows && extraRows.map((rowData, index) => <TableRow hover key={index}>
                {rowData.map((cellData, index2) =>
                  <TableCell align={index2 > 0 ? 'right' : 'left'} key={index2} className="admin-table-cell admin-table-footer">
                    {cellData}
                  </TableCell>
                )}
              </TableRow>)}
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
