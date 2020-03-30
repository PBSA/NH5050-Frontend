import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigateActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';
import { RouteConstants } from '../../constants';
import ProgressBar from '../ProgressBar';

class ConfirmationPage extends Component {
  state = {
    tickets: [
      'R01T001E00001',
      'R01T001E00002',
      'R01T001E00003',
      'R01T001E00004',
      'R01T001E00005',
      'R01T001E00006',
      'R01T001E00007',
      'R01T001E00008',
      'R01T001E00009',
      'R01T001E00010',
    ]
  }

  navigateToOrder = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
  }

  navigateToShare = () => {
    this.props.navigate(RouteConstants.GROW_JACKPOT);
  }
  
  render() {
    const { tickets } = this.state;
    return (
      <div>
        <ProgressBar activeStep={2}/>
        <div className="confirmation">
          <span className="confirmation-header">{strings.confirmationPage.header}</span>
          <span className="confirmation-subtext">{strings.confirmationPage.subtext1}</span>
          <span className="confirmation-subtext">{strings.confirmationPage.subtext2}</span>
          <div className="confirmation-tickets">
            {tickets.map((ticket) => <span className="confirmation-tickets-ticket">{ticket}</span>)}
          </div>

          <div className="confirmation-jackpots">
            <div className="confirmation-jackpots-5050">
              <span className="confirmation-jackpots-header"> 5050 Jackpot </span>
              <span className="confirmation-jackpots-amount"> $1350 </span>
              <span className="confirmation-jackpots-header"> 20d 3h 35m 10s </span>
              <span className="confirmation-jackpots-date"> Drawn 4pm Fri, May 15, 2020 </span>
            </div>
            <div className="confirmation-jackpots-progressive">
              <span className="confirmation-jackpots-header"> Progressive Jackpot </span>
              <span className="confirmation-jackpots-amount"> $5640 </span>
              <span className="confirmation-jackpots-header"> 119d 6h 17m 33s </span>
              <span className="confirmation-jackpots-date"> Drawn 4pm Wed, Nov 11, 2020 </span>
            </div>
          </div>

          <div className="confirmation-buttons">
              <Button className="confirmation-buttons-order" onClick={this.navigateToOrder}>Order More</Button>
              <Button className="confirmation-buttons-print" onClick={() => window.print()}>Print This Page</Button>
              <Button className="confirmation-buttons-grow" onClick={this.navigateToShare}endIcon={<ArrowRightAltIcon />}>Grow the Jackpot</Button>
            </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(ConfirmationPage);
