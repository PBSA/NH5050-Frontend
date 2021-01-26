import React, { Component } from 'react';
import {
  Card, CardContent, CircularProgress, Checkbox,
  TextField, Button, IconButton, InputAdornment,
  Select, MenuItem, InputLabel, FormControlLabel,
  Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Alert } from '@material-ui/lab';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import moment from 'moment';
import strings from '../../assets/locales/strings';

import { RaffleService } from '../../services';

class CreateLottery extends Component {
  state = {
    raffleName: '',
    raffleDescription: '',
    slug: '',
    startDatetime: new Date(),
    endDatetime: new Date(),
    drawDatetime: new Date(),
    drawType: '5050',
    progressiveDrawId: 0,
    adminFeesPercent: 13,
    donationPercent: 5,
    raffleDrawPercent: 20.5,
    progressiveDrawPercent: 20.5,
    organizationPercent: 4.1,
    beneficiaryPercent: 36.9,
    progressiveDraws: [],
    isSellable: false,
    isTransferable: false,
    deleteTicketsAfterDraw: true,
    ticketBundles: [{
      quantity: 0,
      price: 0.0
    }],
    errorText: null,
    loading: false,
  };

  componentDidMount() {
    this.getRaffles();
  }

  getRaffles = () => {
    // get current raffle data
    RaffleService.getRaffle(this.props.organizationId).then((raffle) => {
      this.getProgressiveDraws(raffle);
    }).catch((err) => {
      this.setState({
        errorText: err,
      });
    });
  }

  getProgressiveDraws = (draws) => {
    const progressiveDraws = draws.filter((draw) => {
      return (moment().diff(moment(draw.draw_datetime)) < 0 && draw.draw_type === "progressive");
    });

    if(!progressiveDraws[0]) {
      return;
    }

    this.setState({
      progressiveDraws,
      progressiveDrawId: progressiveDraws[0].id
    });
  }

  addTicketBundle() {
    let bundles = this.state.ticketBundles;
    bundles.push({quantity: 0, price: 0.0});

    this.setState({
      ticketBundles: bundles
    });
  }

  deleteTicketBundle(index) {
    if(this.state.ticketBundles.length == 1) {
      return;
    }

    let bundles = this.state.ticketBundles;
    bundles.splice(index, 1);

    this.setState({
      ticketBundles: bundles
    })
  }

  validateDecimalInteger(decimalInt) {
    var regexp = /^[0-9]+([,.][0-9]+)?$/g;

    return !regexp.test(decimalInt);
  }

  async createOrUpdateSeller(e) {
    e.preventDefault();

    this.setState({
      errorText: ''
    });

    if(this.state.raffleName.trim().length < 5) {
      this.setState({
        errorText: 'Raffle name should be 5 to 50 characters long'
      });
      return;
    }

    if(this.state.raffleName.match(/^\d/)) {
      this.setState({
        errorText: 'Raffle name should start with an alphabet'
      });
      return;
    }

    if(this.state.raffleDescription.trim().length === 0) {
      this.setState({
        errorText: 'Raffle description is required'
      });
      return;
    }

    if(this.state.slug.trim().length === 0) {
      this.setState({
        errorText: 'Slug is required'
      });
      return;
    }

    if(moment(this.state.startDatetime).diff(moment()) < 0) {
      this.setState({
        errorText: 'Start date should be greater than current date and time'
      });
      return;
    }

    if(moment(this.state.endDatetime).diff(moment(this.state.startDatetime)) < 0) {
      this.setState({
        errorText: 'End date should be greater than start date'
      });
      return;
    }

    if(moment(this.state.drawDatetime).diff(moment(this.state.endDatetime)) < 0) {
      this.setState({
        errorText: 'Draw date should be greater than end date'
      });
      return;
    }

    if(this.state.drawType === '5050') {
      const progressiveDraw = this.state.progressiveDraws.filter((draw) => draw.id === this.state.progressiveDrawId);
      if(moment(progressiveDraw[0].draw_datetime).diff(moment(this.state.drawDatetime)) < 0) {
        this.setState({
          errorText: 'Draw date of the draw should be less than the draw date of the progressive draw'
        });
        return;
      }

      if(Number(this.state.adminFeesPercent) + Number(this.state.donationPercent) + Number(this.state.raffleDrawPercent) + Number(this.state.progressiveDrawPercent) + Number(this.state.organizationPercent) + Number(this.state.beneficiaryPercent) !== 100.0) {
        this.setState({
          errorText: 'Sum of percentages should always be 100 for a 5050 raffle'
        });
        return;
      }

      this.state.ticketBundles.forEach((bundle) => {
        if(bundle.quantity === 0) {
          this.setState({
            errorText: 'Quantity cannot be 0'
          });
          return;
        }
  
        if(bundle.price === 0) {
          this.setState({
            errorText: 'Price cannot be 0'
          });
          return;
        }
      });
    }

    let body;

    if (this.state.drawType === 'progressive') {
      body = {
        raffle_name: this.state.raffleName.trim(),
        raffle_description: this.state.raffleDescription.trim(),
        organization_id: this.props.organizationId,
        slug: this.state.slug.trim(),
        start_datetime: this.state.startDatetime.toISOString(),
        end_datetime: this.state.endDatetime.toISOString(),
        draw_datetime: this.state.drawDatetime.toISOString(),
        draw_type: this.state.drawType,
        is_sellable: this.state.isSellable,
        is_transferable: this.state.isTransferable,
        delete_tickets_after_draw: this.state.deleteTicketsAfterDraw
      };
    } else {
      body = {
        raffle_name: this.state.raffleName.trim(),
        raffle_description: this.state.raffleDescription.trim(),
        organization_id: this.props.organizationId,
        slug: this.state.slug.trim(),
        start_datetime: this.state.startDatetime.toISOString(),
        end_datetime: this.state.endDatetime.toISOString(),
        draw_datetime: this.state.drawDatetime.toISOString(),
        draw_type: this.state.drawType,
        progressive_draw_id: this.state.progressiveDrawId,
        admin_fees_percent: this.state.adminFeesPercent,
        donation_percent: this.state.donationPercent,
        raffle_draw_percent: this.state.raffleDrawPercent,
        progressive_draw_percent: this.state.progressiveDrawPercent,
        organization_percent: this.state.organizationPercent,
        beneficiary_percent: this.state.beneficiaryPercent,
        is_sellable: this.state.isSellable,
        is_transferable: this.state.isTransferable,
        delete_tickets_after_draw: this.state.deleteTicketsAfterDraw
      };
    }

    try {
      this.setState({loading: true});
      const response = await RaffleService.createOrUpdateRaffle(body);

      if(this.state.drawType === '5050') {
        for(let i = 0; i < this.state.ticketBundles.length; i++) {
          await RaffleService.createTicketBundle({
            ...this.state.ticketBundles[i],
            raffle_id: response.id
          });
        }
      }

      this.setState({loading: false});
      this.props.navigate(RouteConstants.ADMIN_RAFFLES);
    } catch (err) {
      console.error(err);
      
      if(err.hasOwnProperty('data')) {
        if(err.status === 400 && typeof err.data.error !== 'string') {
          let errText = '';
          Object.keys(err.data.error).map((key)=>{
              errText += err.data.error[key] + '\n'
          });
          this.setState({
            errorText: errText,
            loading: false
          });
        } else {
          this.setState({
            errorText: err.data.error,
            loading: false
          });
        }
      } else {
        this.setState({
          errorText: err.message,
          loading: false
        });
      }
    }
  }

  render() {
    const {
      errorText, raffleName, raffleDescription, slug, startDatetime, endDatetime,
      drawDatetime, drawType, progressiveDrawId, adminFeesPercent, donationPercent,
      raffleDrawPercent, progressiveDrawPercent, organizationPercent, beneficiaryPercent,
      progressiveDraws, ticketBundles, isSellable, isTransferable, deleteTicketsAfterDraw
    } = this.state;

    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <div>
          <Card className="order" variant="outlined">
            <CardContent>
              <form className="lottery-form" onSubmit={(e) => this.createOrUpdateSeller(e)}>
                {errorText && <Alert className="lottery-form-alert" severity="error">{errorText}</Alert>}
                <div className="lottery-form-info">
                  <TextField
                    className="lottery-form-info-input"
                    label={strings.createLottery.raffleName}
                    variant="outlined"
                    value={raffleName}
                    inputProps={{ maxLength: 50 }}
                    onChange={(e) => this.setState({ raffleName: e.target.value })}
                  />
                  <TextField
                    className="lottery-form-info-input"
                    label={strings.createLottery.raffleDescription}
                    variant="outlined"
                    value={raffleDescription}
                    multiline
                    rows={6}
                    inputProps={{ maxLength: 1500 }}
                    onChange={(e) => this.setState({ raffleDescription: e.target.value })}
                  />
                  <TextField
                    className="lottery-form-info-input"
                    label={strings.createLottery.slug}
                    variant="outlined"
                    value={slug}
                    inputProps={{ maxLength: 20 }}
                    onChange={(e) => this.setState({ slug: e.target.value })}
                  />
                  <DateTimePicker
                    className="lottery-form-info-input"
                    label={strings.createLottery.startDate}
                    inputVariant="outlined"
                    disablePast
                    showTodayButton
                    value={startDatetime}
                    onChange={(date) => this.setState({ startDatetime: date.set('second', 0).set('milliseconds', 0) })}
                  />
                  <DateTimePicker
                    className="lottery-form-info-input"
                    label={strings.createLottery.endDate}
                    inputVariant="outlined"
                    disablePast
                    showTodayButton
                    value={endDatetime}
                    onChange={(date) => this.setState({ endDatetime: date.set('second', 0).set('milliseconds', 0) })}
                  />
                  <DateTimePicker
                    className="lottery-form-info-input"
                    label={strings.createLottery.drawDate}
                    inputVariant="outlined"
                    disablePast
                    showTodayButton
                    value={drawDatetime}
                    onChange={(date) => this.setState({ drawDatetime: date.set('second', 0).set('milliseconds', 0) })}
                  />
                  <InputLabel>Draw Type</InputLabel>
                  <Select
                    className="lottery-form-info-input"
                    value={drawType}
                    variant="outlined"
                    onChange={(e) => this.setState({ drawType: e.target.value })}
                  >
                    <MenuItem value="progressive">Progressive</MenuItem>
                    <MenuItem value="5050">Normal</MenuItem>
                  </Select>
                  {drawType === '5050' ?
                  <div>
                    {progressiveDraws && progressiveDraws.length > 0 && <>
                      <InputLabel>Progressive Draw</InputLabel>
                      <Select
                        className="lottery-form-info-input"
                        value={progressiveDrawId}
                        variant="outlined"
                        onChange={(e) => this.setState({ progressiveDrawId: e.target.value })}
                      >
                        {progressiveDraws.map((draw, index) =>
                          <MenuItem key={index} value={draw.id}>{draw.raffle_name}</MenuItem>
                        )}
                      </Select>
                    </>}
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.adminFeesPercent}
                      error={this.validateDecimalInteger(adminFeesPercent)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(adminFeesPercent) ? 'Only numbers allowed' : ''}
                      value={adminFeesPercent}
                      onChange={(e) => this.setState({ adminFeesPercent: e.target.value })}
                    />
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.donationPercent}
                      error={this.validateDecimalInteger(donationPercent)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(donationPercent) ? 'Only numbers allowed' : ''}
                      value={donationPercent}
                      onChange={(e) => this.setState({ donationPercent: e.target.value })}
                    />
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.raffleDrawPercent}
                      error={this.validateDecimalInteger(raffleDrawPercent)}
                      InputProps={{
                        endAdornment:<InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(raffleDrawPercent) ? 'Only numbers allowed' : ''}
                      value={raffleDrawPercent}
                      onChange={(e) => this.setState({ raffleDrawPercent: e.target.value })}
                    />
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.progressiveDrawPercent}
                      error={this.validateDecimalInteger(progressiveDrawPercent)}
                      InputProps={{
                        endAdornment:<InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(progressiveDrawPercent) ? 'Only numbers allowed' : ''}
                      value={progressiveDrawPercent}
                      onChange={(e) => this.setState({ progressiveDrawPercent: e.target.value })}
                    />
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.organizationPercent}
                      error={this.validateDecimalInteger(organizationPercent)}
                      InputProps={{
                        endAdornment:<InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(organizationPercent) ? 'Only numbers allowed' : ''}
                      value={organizationPercent}
                      onChange={(e) => this.setState({ organizationPercent: e.target.value })}
                    />
                    <TextField
                      className="lottery-form-info-input"
                      label={strings.createLottery.beneficiaryPercent}
                      error={this.validateDecimalInteger(beneficiaryPercent)}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                      }}
                      variant="outlined"
                      helperText={this.validateDecimalInteger(beneficiaryPercent) ? 'Only numbers allowed' : ''}
                      value={beneficiaryPercent}
                      onChange={(e) => this.setState({ beneficiaryPercent: e.target.value })}
                    />
                    <div className="lottery-form-info">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isSellable}
                            onChange={(e) => this.setState({isSellable: e.target.checked})}
                          />
                        }
                        label="The buyer can sell the bought tickets"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isTransferable}
                            onChange={(e) => this.setState({isTransferable: e.target.checked})}
                          />
                        }
                        label="The buyer can transfer the tickets"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={deleteTicketsAfterDraw}
                            onChange={(e) => this.setState({deleteTicketsAfterDraw: e.target.checked})}
                          />
                        }
                        label="The tickets should be burned after the draw date"
                      />
                    </div>
                    <InputLabel>Ticket Bundles</InputLabel>
                    <TableContainer component={Paper} className="lottery-form-info-input">
                      <Table aria-label="ticket-bundles">
                        <TableHead>
                          <TableRow>
                            <TableCell>Quantity</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">
                              <IconButton onClick={() => this.addTicketBundle()} aria-label="add">
                                <AddCircleIcon fontSize="large" style={{color: '#ec2a32'}}/>
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ticketBundles.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <TextField
                                  value={row.quantity}
                                  onChange={(e) => {
                                    ticketBundles[index].quantity = e.target.value;
                                    this.setState({ticketBundles});
                                  }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <TextField
                                    value={row.price}
                                    InputProps={{
                                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                                    }}
                                    onChange={(e) => {
                                      ticketBundles[index].price = e.target.value;
                                      this.setState({ticketBundles});
                                    }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <IconButton onClick={() => this.deleteTicketBundle(index)} aria-label="delete">
                                  <DeleteForeverIcon fontSize="large" style={{color: '#ec2a32'}} />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                  : null}
                  <div className="lottery-form-button-wrapper">
                    <Button
                      className="lottery-form-button"
                      type="submit"
                    >
                      {strings.adminSellerForm.save}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          {this.state.loading && <div className='payment-backdrop'>
            <CircularProgress color="secondary"/>
          </div>}
        </div>
      </MuiPickersUtilsProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.getIn(['admin', 'isLoggedIn']),
  organizationId: state.getIn(['checkout', 'organizationId']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(CreateLottery);
