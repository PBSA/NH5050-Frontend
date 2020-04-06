import React, { Component } from 'react';
import { Button, TextField, Tooltip, Card, CardContent } from '@material-ui/core';
import { FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  LinkedinShareButton, LinkedinIcon,
  RedditShareButton, RedditIcon,
  WhatsappShareButton, WhatsappIcon,
  EmailShareButton, EmailIcon } from 'react-share';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StorageUtil } from '../../utility';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NavigateActions, CheckoutActions } from '../../redux/actions';
import strings from '../../assets/locales/strings';
import { RouteConstants } from '../../constants';
import ProgressBar from '../ProgressBar';
import { Config } from '../../utility';

class GrowJackpot extends Component {
  
  state = {
    shareLink: `${Config.baseRoute}/dashboard`,
    copied: false,
    showTooltip: false,
  }

  navigateToDashboard = () => {
    this.props.navigate(RouteConstants.DASHBOARD);
    this.props.setRoute(RouteConstants.DASHBOARD);
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
              <FacebookShareButton url={shareLink}>
                <FacebookIcon borderRadius={5} size={50}/>
              </FacebookShareButton>
              <TwitterShareButton url={shareLink}>
                <TwitterIcon borderRadius={5} size={50}/>
              </TwitterShareButton>
              <LinkedinShareButton url={shareLink}>
                <LinkedinIcon borderRadius={5} size={50}/>
              </LinkedinShareButton>
            </div>
            <div className="grow-socials-row">
              <RedditShareButton url={shareLink}>
                <RedditIcon borderRadius={5} size={50}/>
              </RedditShareButton>
              <WhatsappShareButton url={shareLink}>
                <WhatsappIcon borderRadius={5} size={50}/>
              </WhatsappShareButton>
              <EmailShareButton url={shareLink}>
                <EmailIcon borderRadius={5} size={50}/>
              </EmailShareButton>
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
    setRoute: CheckoutActions.setCheckoutRoute
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(GrowJackpot);
