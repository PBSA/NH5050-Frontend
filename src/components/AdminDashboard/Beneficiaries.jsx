import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

export default function Beneficiaries() {
  const rows = [{
    name: 'New Hampshire Marine Corps League',
    type: 'Organization',
    proceeds: '$775'
  }, {
    name: 'Detachment #345',
    type: 'Beneficiary',
    proceeds: '$525'
  }, {
    name: 'Detachment #550',
    type: 'Beneficiary',
    proceeds: '$600'
  }];

  return (
    <TableContainer component={Paper}>
      <Table className="beneficiaries-table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Beneficiaries Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Proceeds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.proceeds}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell component="th" scope="row">Total</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">$1900</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}