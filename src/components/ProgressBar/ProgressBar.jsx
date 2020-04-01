import React, { Component } from 'react';
import { Stepper, Step, StepLabel } from '@material-ui/core';

class GrowJackpot extends Component {
  
  state = {
    steps: ['Order', 'Payment', 'Confirmation', 'Share']
  }
  
  render() {
    const {steps} = this.state;
    const {activeStep} = this.props;

    return (
      <div className="progressbar">
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => {
            return (
              <Step className="progressbar-step" key={label}>
                <StepLabel className="progressbar-step-label">{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default GrowJackpot;