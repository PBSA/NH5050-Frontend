import React, { Component } from 'react';
import { Config } from '../../utility';

class IFrameTest extends Component {
  render() {
    return (
      <div style={{ margin: '100px' }}>
        <iframe title="Diamond Gaming 50-50/50 Raffle" src={`${Config.baseRoute}/widget/jackpots`} width="350" height="455" />
      </div>
    );
  }
}

export default IFrameTest;
