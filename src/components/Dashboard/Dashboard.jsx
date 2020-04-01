import React, { Component } from 'react';
import { Card, CardContent, Button, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import strings from '../../assets/locales/strings';
import { OrganizationService, RaffleService } from '../../services';

const organizationId = 1;
class Dashboard extends Component {
  state = {
    organizationInfo: {},
    fiftyfiftyDraw: {},
    progressiveDraw: {}
  }

  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
  }

  componentDidMount() {
    //get organization data
    OrganizationService.getOrganizationInfo(organizationId).then((res) => {
      this.setState({organizationInfo: res});
    }).catch((err) => {
      console.log(err);
    });
    //get current raffle data
    RaffleService.getRaffle(organizationId).then((res) => {
      this.sortDraws(res);
    }).catch((err) => {
      console.log(err);
    });

    this.props.setOrganizationId(1);
    this.props.setRaffleId(1);
  }

  sortDraws = (draws) => {
    const sortedDraws = draws.filter((draw) => {
      return new Date(draw.draw_datetime) > new Date(Date.now());
    });

    if(sortedDraws[0].draw_type === "5050") {
      this.setState({fiftyfiftyDraw: sortedDraws[0]});
      this.setState({progressiveDraw: sortedDraws[1]});
    } else {
      this.setState({fiftyfiftyDraw: sortedDraws[1]});
      this.setState({progressiveDraw: sortedDraws[0]});
    }
  }

  render() {
    const {organizationInfo} = this.state;
    console.log('state: ',this.state);
    return (
      <div className="dashboard">
        <div className="dashboard-panel">
          {/* {organizationInfo.logo_url ? 
            <img className="dashboard-panel-img" src={organizationInfo.logo_url} alt=""/>
            : 
            <CircularProgress color="secondary"/>
            <PanoramaIcon className="dashboard-panel-icon" fontSize="large" />
          } */}
          <PanoramaIcon className="dashboard-panel-icon" fontSize="large" />
          
          <p className="dashboard-panel-text">
            {strings.dashboard.loremIpsum1}
          </p>
          <p className="dashboard-panel-text">
            {strings.dashboard.loremIpsum2}
          </p>
        </div>

        <div className="dashboard-buy">
          <Card>
            <CardContent className="dashboard-buy-container">
              <span className="dashboard-buy-header">Next Draw</span>
              <span className="dashboard-buy-content-sm">May 15th, 2020 at 4pm</span>
              <span className="dashboard-buy-header">Next 5050 jackpot</span>
              <span className="dashboard-buy-content">$1350</span>
              <span className="dashboard-buy-header">Progressive Jackpot</span>
              <span className="dashboard-buy-content">$5635</span>
              <Button className="dashboard-buy-button" variant="outlined" size="medium" onClick={this.navgiateToOrderInfo}>
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setOrganizationId: CheckoutActions.setOrganizationId,
    setRaffleId: CheckoutActions.setRaffleId,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Dashboard);
