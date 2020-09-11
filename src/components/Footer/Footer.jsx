import React, { Component } from 'react';
import { Link } from '@material-ui/core';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://example@example.com">Rules</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://example@example.com">How it Works</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://example@example.com">Terms</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://example@example.com">Become a Sponsor</a>
        <a className="footer-link" target="_blank" rel="noopener noreferrer" href="https://example@example.com">Join Diamond Gaming</a>
      </div>
    );
  }
}

export default Footer;
