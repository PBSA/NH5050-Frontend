import React, { Component } from 'react';
import {
  Card, CardContent, Tabs, Tab,
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
    for (const tab of tabs) {
      if (tab.route === props.path) {
        break;
      }

      tabIndex++;
    }
    this.state = { 
      tabIndex,
      progressiveRaffle: {},
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
      timeToProgressiveDraw: this.timeToDraw(this.state.progressiveRaffle.draw_datetime)
    });
  }

  timeToDraw = (drawdate) => {
    const diff = moment.duration(moment(drawdate).diff(moment()));

    let days = moment(drawdate).diff(moment(), 'days');
    return `${days}d ${diff.hours()}h ${diff.minutes()}m ${diff.seconds()}s`;
  }

  getProgressiveRaffle() {
    const progressiveId = this.props.raffle.progressive_draw_id
    RaffleService.getRaffleById(progressiveId).then((progressiveRaffle) => {
      this.setState({progressiveRaffle});
    });
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000);
  }

  componentDidUpdate(prevProps) {
    
    if(prevProps.raffle !== this.props.raffle) {
      this.getProgressiveRaffle()
    }
  }

  componentWillUnmount() {
    if(this.intervalID) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  }

  render() {
    const { organizationId, raffle } = this.props;
    const { tabIndex, progressiveRaffle, timeToDraw, timeToProgressiveDraw } = this.state;
    const activeTab = tabIndex < 4 ? tabs[tabIndex].id : false;

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
    raffle: state.getIn(['checkout', 'raffle'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
