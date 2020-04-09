import React, { Component } from 'react';
import { Link } from '@material-ui/core';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/raffle-rules/">Rules</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/raffle-rules/how-it-works/">How it Works</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/raffle-rules/terms-conditions/">Terms</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/support-the-your-local-seacoast-marines/sponsor-raffles/">Become a Sponsor</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://www.seacoastmarines.org/membership/">Join the Marine Corps</a>
      </div>
    );
  }
}

export default Footer;
