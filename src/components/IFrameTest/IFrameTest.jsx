import React, { Component } from 'react';

class IFrameTest extends Component {
  render() {
    return (
      <div style={{ margin: '100px' }}>
        <iframe src="http://localhost:8082/widget/jackpots" width="500" height="348" />
      </div>
    );
  }
}

export default IFrameTest;
