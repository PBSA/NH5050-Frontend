import React, { Component } from 'react';
import { Link } from '@material-ui/core';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Link className="footer-link" href="https://www.seacoastmarines.org/raffle-rules/">Rules</Link>
        <Link className="footer-link" href="https://www.seacoastmarines.org/raffle-rules/how-it-works/">How it Works</Link>
        <Link className="footer-link" href="https://www.seacoastmarines.org/raffle-rules/terms-conditions/">Terms</Link>
        <Link className="footer-link" href="https://www.seacoastmarines.org/support-the-your-local-seacoast-marines/sponsor-raffles/">Become a Sponsor</Link>
        <Link className="footer-link" href="https://www.seacoastmarines.org/membership/">Join the Marine Corps</Link>
      </div>
    );
  }
}

export default Footer;
