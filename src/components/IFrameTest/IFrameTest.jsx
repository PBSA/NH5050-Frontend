import React, { Component } from 'react';
import { Config } from '../../utility';

class IFrameTest extends Component {
  render() {
    return (
      <div style={{ margin: '100px' }}>
        <iframe title="New Hampshire Marine Corps League 50-50/50 Raffle" src={`${Config.baseRoute}/widget/jackpots`} width="450" height="589" />
      </div>
    );
  }
}

export default IFrameTest;
