import React, { Component } from 'react';
import { Button, TextField, Tooltip, Card, CardContent } from '@material-ui/core';
import { Facebook as FacebookIcon, Twitter as TwitterIcon, LinkedIn as LinkedInIcon, Reddit as RedditIcon, WhatsApp as WhatsAppIcon, Mail as MailIcon} from '@material-ui/icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StorageUtil } from '../../utility';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NavigateActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';
import { RouteConstants } from '../../constants';
import ProgressBar from '../ProgressBar';

class GrowJackpot extends Component {
  
  state = {
    shareLink: 'https://www.communityraffles.org/blahblahtesttest',
    copied: false,
    showTooltip: false,
  }

  navigateToDashboard = () => {
    this.props.navigate(RouteConstants.DASHBOARD);
  };

  copyURL = () => {
    this.setState({ copied: true, showTooltip: true });
  }

  handleTooltipClose = () => {
    this.setState({ showTooltip: false });
  };

  componentDidMount() {
    StorageUtil.clear();
  }
  
  render() {
    const { shareLink } = this.state;
    return (
      <Card className="grow-card" variant="outlined">
        <CardContent>
        <ProgressBar activeStep={3} />
        <div className="grow">
          <p className="grow-header">{strings.share.header}</p>
          <p className="grow-subtext">{strings.share.subtext}</p>
          <div className="grow-socials">
            <div className="grow-socials-row">
              <FacebookIcon className="grow-socials-fb" fontSize="large" />
              <TwitterIcon className="grow-socials-twitter" fontSize="large" />
              <LinkedInIcon className="grow-socials-linkedin" fontSize="large" />
            </div>
            <div className="grow-socials-row">
              <RedditIcon className="grow-socials-reddit" fontSize="large" />
              <WhatsAppIcon className="grow-socials-whatsapp" fontSize="large" />
              <MailIcon className="grow-socials-mail" fontSize="large" />
            </div>
          </div>
          <div className="grow-wrapper">
            <div className="grow-copy">
              <TextField
                className="grow-copy-input"
                id="standard-name"
                variant="outlined"
                value={shareLink}
              />
                <CopyToClipboard
                  text={shareLink}
                  onCopy={this.copyURL}>
                  <Tooltip
                    open={this.state.showTooltip}
                    onClose={this.handleTooltipClose}
                    title={<span className="grow-copy-button-tooltip">Copied to clipboard!</span>}
                    placement="right"
                    leaveDelay={1500}>
                    <Button className="grow-copy-button">Copy URL</Button>
                  </Tooltip>
                </CopyToClipboard>
            </div>
            <p className="grow-subtext">{strings.share.thanks}</p>
            <Button className="grow-back" onClick={this.navigateToDashboard}>Back to Raffle Page</Button>
          </div>
        </div>
        </CardContent>
      </Card>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    navigate: NavigateActions.navigate,
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(GrowJackpot);
