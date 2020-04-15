import React, { Component } from 'react';
import {
  Card, CardContent, Tabs, Tab, CircularProgress
} from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { NavigateActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';

import Beneficiaries from './Beneficiaries';
import Sellers from './Sellers';
import Raffles from './Raffles';
import Tickets from './Tickets';
import { RouteConstants } from '../../constants';
import { RaffleService } from '../../services';

const tabs = [
  { id: 'beneficiaries', label: strings.adminDashboard.tabs.beneficiaries, route: RouteConstants.ADMIN_BENEFICIARIES },
  { id: 'sellers', label: strings.adminDashboard.tabs.sellers, route: RouteConstants.ADMIN_SELLERS },
  { id: 'raffles', label: strings.adminDashboard.tabs.raffles, route: RouteConstants.ADMIN_RAFFLES },
  { id: 'tickets', label: strings.adminDashboard.tabs.tickets, route: RouteConstants.ADMIN_TICKETS },
];

class AdminDashboard extends Component {
  
  constructor(props) {
    super(props);

    let tabIndex = 0;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].route === props.path) {
        tabIndex = i;
      }
    }

    this.state = { 
      tabIndex,
      timeToDraw: '',
      timeToProgressiveDraw: '',
     };
  }

  setTabIndex = (index) => {
    this.setState({tabIndex: index});
  }

  tick = () => {
    this.setState({
      timeToDraw: this.timeToDraw(this.props.raffle.draw_datetime),
      timeToProgressiveDraw: this.timeToDraw(this.props.progressiveRaffle.draw_datetime)
    });
  }

  timeToDraw = (drawdate) => {
    const diff = moment.duration(moment(drawdate).diff(moment()));

    let days = moment(drawdate).diff(moment(), 'days');
    return `${days}d ${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`;
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000);
  }

  componentWillUnmount() {
    if(this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  renderDashboard(raffle, timeToDraw, progressiveRaffle, timeToProgressiveDraw) {
    if(raffle && timeToDraw && Object.keys(progressiveRaffle).length !== 0 && timeToProgressiveDraw) {
      return (
        <div className="confirmation-jackpots">
          <div className="confirmation-jackpots-5050">
            <span className="confirmation-jackpots-header"> {strings.confirmationPage.jackpot} </span>
            <span className="confirmation-jackpots-amount"> ${raffle.total_jackpot} </span>
            <span className="confirmation-jackpots-header"> {timeToDraw} </span>
            <span className="confirmation-jackpots-date"> {strings.confirmationPage.drawn} {moment(raffle.draw_datetime).format('ha ddd, MMM D, YYYY')} </span>
          </div>
          <div className="confirmation-jackpots-progressive">
            <span className="confirmation-jackpots-header"> {strings.confirmationPage.progressivejackpot} </span>
            <span className="confirmation-jackpots-amount"> ${progressiveRaffle.total_progressive_jackpot} </span>
            <span className="confirmation-jackpots-header"> {timeToProgressiveDraw} </span>
            <span className="confirmation-jackpots-date"> {strings.confirmationPage.drawn} {moment(progressiveRaffle.draw_datetime).format('ha ddd, MMM D, YYYY')} </span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="admin-loader">
          <CircularProgress color="secondary" />
        </div>
      );
    }
  }

  render() {
    const { organizationId, raffle, path, progressiveRaffle } = this.props;
    const { timeToDraw, timeToProgressiveDraw } = this.state;
    const tabIndex = path === RouteConstants.ADMIN ? false : this.state.tabIndex;
    const activeTab = path === RouteConstants.ADMIN ? false : tabs[tabIndex].id;

    return (
      <Card className="admin" variant="outlined">
        <CardContent>
          <Tabs value={tabIndex} onChange={(e, index) => this.setTabIndex(index)} centered>
            {tabs.map(({ id, label, route }) => <Tab onClick={() => this.props.navigate(route)} key={id} label={label} />)}
          </Tabs>
          {activeTab === 'beneficiaries' && <Beneficiaries organizationId={organizationId} />}
          {activeTab === 'sellers' && <Sellers organizationId={organizationId} />}
          {activeTab === 'raffles' && <Raffles organizationId={organizationId} />}
          {activeTab === 'tickets' && <Tickets organizationId={organizationId} />}
          {activeTab === false ? 
            this.renderDashboard(raffle, timeToDraw, progressiveRaffle, timeToProgressiveDraw)
          : null}
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    organizationId: state.getIn(['checkout', 'organizationId']),
    path: state.getIn(['router', 'location', 'pathname']),
    organization: state.getIn(['checkout', 'organization']),
    raffle: state.getIn(['checkout', 'raffle']),
    progressiveRaffle: state.getIn(['checkout', 'progressiveRaffle'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);