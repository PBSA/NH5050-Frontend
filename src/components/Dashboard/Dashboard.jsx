import React, { Component } from 'react';
import { Card, CardContent, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PanoramaIcon from '@material-ui/icons/Panorama';
import { NavigateActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import strings from '../../assets/locales/strings';

class Dashboard extends Component {

  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-panel">
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
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(Dashboard);
