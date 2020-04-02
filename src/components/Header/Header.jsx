import React, { Component } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, Reddit as RedditIcon, WhatsApp as WhatsAppIcon, Mail as MailIcon } from '@material-ui/icons';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import { RouteConstants } from '../../constants';
import { RaffleService, OrganizationService } from '../../services';
import marineCorpsLogo from '../../assets/images';

const organizationId = 1;
class Header extends Component {
  
  state = {
    loaded: false,
    errors: {}
  };

  navgiateToOrderInfo = () => {
    this.props.navigate(RouteConstants.DASHBOARD);
  }

  componentDidMount = () => {
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

  sortDraws = (draws) => {
    const sortedDraws = draws.filter((draw) => {
      return (new Date(draw.draw_datetime) > new Date(Date.now()) && draw.draw_type === "5050");
    });

    if(sortedDraws[0].draw_type === "5050") {
      this.props.setRaffleId(sortedDraws[0].id)
      this.props.setRaffle(sortedDraws[0]);
    }
  }


  render() {
    const {organization, raffle} = this.props;
    return (
      <AppBar className="header" position="static">
        <Toolbar className="header-wrapper">
          <div className="header-socials-wrapper">
            <img className="header-icon" onClick={this.navgiateToOrderInfo} src={organization.logo_url} alt="" />
            <div className="header-text">
              <span>{organization.name}</span>
              <span>{raffle.raffle_name}</span>
            </div>
          </div>
          <div className="header-socials">
            <span className="header-socials-text">SHARE</span>
            <FacebookIcon className="header-socials-fb" fontSize="large" />
            <TwitterIcon className="header-socials-twitter" fontSize="large" />
            <LinkedInIcon className="header-socials-linkedin" fontSize="large" />
            <RedditIcon className="header-socials-reddit" fontSize="large" />
            <WhatsAppIcon className="header-socials-whatsapp" fontSize="large" />
            <MailIcon className="header-socials-mail" fontSize="large" />
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    organization: state.getIn(['checkout', 'organization']),
    raffle: state.getIn(['checkout', 'raffle'])
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
    setOrganization: CheckoutActions.setOrganization,
    setRaffle: CheckoutActions.setRaffle,
    setOrganizationId: CheckoutActions.setOrganizationId,
    setRaffleId: CheckoutActions.setRaffleId,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
