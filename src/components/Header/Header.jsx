import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  TelegramShareButton, TelegramIcon,
  RedditShareButton, RedditIcon,
  WhatsappShareButton, WhatsappIcon,
  EmailShareButton, EmailIcon,
} from 'react-share';
import { NavigateActions, CheckoutActions, AdminActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import { RaffleService, OrganizationService } from '../../services';
import { Config, StorageUtil } from '../../utility';

const organizationId = 1;
class Header extends Component {

  state = {
    loaded: false,
    errors: {},
    shareLink: `${Config.baseRoute}/dashboard`
  };

  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.DASHBOARD);
    this.props.setRoute(RouteConstants.DASHBOARD);
    this.props.resetCheckout();
  }

  navigateToAdminHome = () => {
    this.props.navigate(RouteConstants.ADMIN);
  }

  navigateToLogin = () => {
    this.props.setLoggedIn(false);
    this.props.navigate(RouteConstants.ADMIN_LOGIN);
  }

  componentDidMount = () => {
    this.getOrganization();
    this.getRaffles();
    //set interval to get raffle updates every 30 seconds
    setInterval(async () => {
      this.getRaffles();
    }, 30000);
  }

  getOrganization = () => {
    OrganizationService.getOrganizationInfo(organizationId).then((organization) => {
      this.setState({loaded: true});
      this.props.setOrganization(organization);
      this.props.setOrganizationId(organization.id)
    }).catch((err) => {
      this.setState({
        loaded: true,
        error: {
          ...this.state.errors,
          organization: err
        }
      })
    });
  }

  getRaffles = () => {
    //get current raffle data
    RaffleService.getRaffle(organizationId).then((raffle) => {
      this.sortDraws(raffle);
      this.setState({loaded: true});
    }).catch((err) => {
      this.setState({
        error: {
          ...this.state.errors,
          raffle: err
        }
      })
    });
  }

  getProgressiveRaffle = (id) => {
    RaffleService.getRaffleById(id).then((progressiveRaffle) => {
      this.props.setProgressiveRaffle(progressiveRaffle);
    }).catch((err) => {
      console.log(err);
    });
  }

  sortDraws = (draws) => {
    const sortedDraws = draws.filter((draw) => {
      return (new Date(draw.draw_datetime) > new Date(Date.now()) && new Date(draw.start_datetime) < new Date(Date.now()) && draw.draw_type === "5050");
    });

    if(!sortedDraws[0]) {
      return;
    }

    this.getProgressiveRaffle(sortedDraws[0].progressive_draw_id);
    this.props.setRaffleId(sortedDraws[0].id)
    this.props.setRaffle(sortedDraws[0]);
  }

  renderAdminHeader = () => {
    if(this.props.path !== RouteConstants.ADMIN_LOGIN) {
      return (
        <div className="header-admin">
          <span onClick={this.navigateToAdminHome} className={this.props.path === RouteConstants.ADMIN ? "header-admin-item-disabled" : "header-admin-item"}>Admin Home</span>
          <span onClick={this.navigateToLogin}className="header-admin-item">Logout</span>
        </div>
      )
    }
  }

  render() {
    const { organization, raffle } = this.props;
    const { shareLink } = this.state;

    return (
      <AppBar className="header" position="static">
        <Toolbar className="header-wrapper">
          <div className="header-socials-wrapper">
            <div className="header-icon-wrapper">
              <img className="header-icon" onClick={this.navgiateToOrderInfo} src={organization.logo_url} alt="" />
            </div>
            <div className="header-text">
              <span>{organization.name}</span>
              <span>{raffle.raffle_name}</span>
            </div>
          </div>
          {!this.props.path.includes('/admin') && this.props.path !== RouteConstants.ADMIN_LOGIN
            ? (
              <div className="header-socials">
                <span className="header-socials-text">SHARE</span>
                <FacebookShareButton url={shareLink}>
                  <FacebookIcon size={32} borderRadius={5} />
                </FacebookShareButton>
                <TwitterShareButton url={shareLink}>
                  <TwitterIcon size={32} borderRadius={5} />
                </TwitterShareButton>
                <TelegramShareButton url={shareLink}>
                  <TelegramIcon size={32} borderRadius={5} />
                </TelegramShareButton>
                <RedditShareButton url={shareLink}>
                  <RedditIcon size={32} borderRadius={5} />
                </RedditShareButton>
                <WhatsappShareButton url={shareLink}>
                  <WhatsappIcon size={32} borderRadius={5} />
                </WhatsappShareButton>
                <EmailShareButton url={shareLink}>
                  <EmailIcon size={32} borderRadius={5} />
                </EmailShareButton>
              </div>
            )
            : this.renderAdminHeader()}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  organization: state.getIn(['checkout', 'organization']),
  raffle: state.getIn(['checkout', 'raffle']),
  path: state.getIn(['router', 'location', 'pathname']),
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setOrganization: CheckoutActions.setOrganization,
    setRaffle: CheckoutActions.setRaffle,
    setProgressiveRaffle: CheckoutActions.setProgressiveRaffle,
    setOrganizationId: CheckoutActions.setOrganizationId,
    setRaffleId: CheckoutActions.setRaffleId,
    setRoute: CheckoutActions.setCheckoutRoute,
    resetCheckout: CheckoutActions.resetCheckout,
    setLoggedIn: AdminActions.setLoggedIn
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
