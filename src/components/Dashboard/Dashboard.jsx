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
    progressiveDraw: {},
    loaded: false,
    error: {
      organization: null,
      raffle: null,
    }
  }

  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.ORDER_INFO);
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

  displayImage = () => {
    const {fiftyfiftyDraw, loaded} = this.state;

    if(!loaded) {
      return <CircularProgress color="secondary"/>;
    } else if (fiftyfiftyDraw.image_url) {
      return <img className="dashboard-panel-img" src={fiftyfiftyDraw.image_url} alt=""/>;
    } else {
      return <PanoramaIcon className="dashboard-panel-icon" fontSize="large" />;
    }
  }

  formatDate = (drawDate) => {
    //format date to output in the following format: October 29, 2019, hh:mm
    let date, formattedDate;
    date = new Date(drawDate);
    const twelveHourOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'};
    const twentyFourHourOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

    if(this.state.organizationInfo.time_format === '24h') {
      formattedDate = date.toLocaleDateString('en-ZA', twentyFourHourOptions);
    } else {
      formattedDate = date.toLocaleDateString('en-US', twelveHourOptions);
    }

    return formattedDate;
  }

  componentDidMount() {
    //get organization data
    OrganizationService.getOrganizationInfo(organizationId).then((res) => {
      this.setState({organizationInfo: res, loaded: true});
    }).catch((err) => {
      this.setState({
        loaded: true,
        error: {
          ...this.state.errors,
          organization: err
        }
      })
    });
    //get current raffle data
    RaffleService.getRaffle(organizationId).then((res) => {
      this.sortDraws(res);
    }).catch((err) => {
      this.setState({
        loaded: true,
        error: {
          ...this.state.errors,
          raffle: err
        }
      })
    });

    this.props.setOrganizationId(1);
    this.props.setRaffleId(1);
  }

  render() {
    const {fiftyfiftyDraw, progressiveDraw} = this.state;
    console.log('state: ',this.state);
    return (
      <div className="dashboard">
        <div className="dashboard-panel">
          {this.displayImage()}
          <p className="dashboard-panel-text">
            {fiftyfiftyDraw.raffle_description}
          </p>
        </div>

        <div className="dashboard-buy">
          <Card>
            <CardContent className="dashboard-buy-container">
              <span className="dashboard-buy-header">Next Draw</span>
              <span className="dashboard-buy-content-sm">{this.formatDate(fiftyfiftyDraw.draw_datetime)}</span>
              <span className="dashboard-buy-header">Next 5050 jackpot</span>
              <span className="dashboard-buy-content">${fiftyfiftyDraw.total_jackpot}</span>
              <span className="dashboard-buy-header">Progressive Jackpot</span>
              <span className="dashboard-buy-content">${progressiveDraw.total_progressive_jackpot}</span>
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
