import React from 'react';
import styles from './BucketSimulator.css';

class BucketSimulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationState: "waiting",
      bigBucketSize: 5,
      smallBucketSize: 3,
      targetAmount: 4,
      bigBucketContains: 0,
      smallBucketContains: 0,
      steps: []
    };

    this.updateBigBucketSize = this.updateBigBucketSize.bind(this);
    this.updateSmallBucketSize = this.updateSmallBucketSize.bind(this);
    this.updateTargetAmount = this.updateTargetAmount.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
  }

  //---------------------------------

  updateBigBucketSize(size){
    const newSize = parseInt(size);
    if(!isNaN(newSize)){
      if(newSize < 100){
        this.setState({
          bigBucketSize: parseInt(size)
        });
      }
    }else{
      this.setState({
        bigBucketSize: 0
      });
    }
  }

  //---------------------------------

  updateSmallBucketSize(size){
    const newSize = parseInt(size);
    if(!isNaN(newSize)){
      if(newSize < 100){
        this.setState({
          smallBucketSize: newSize
        });
      }
    }else{
      this.setState({
        smallBucketSize: 0
      });
    }
  }

  //---------------------------------

  updateTargetAmount(targetAmount){
    const newTargetAmount = parseInt(targetAmount);
    if(!isNaN(newTargetAmount)){
      this.setState({
        targetAmount: newTargetAmount
      });
    }else{
      this.setState({
        targetAmount: 0
      });
    }
  }

  //---------------------------------

  validateBucketSizes(){
    if(newTargetAmount < this.state.bigBucketSize){

    }else if(newTargetAmount == this.state.bigBucketSize){
      //this makes no sense
    }else if(newTargetAmount == this.state.smallBucketSize){
      //this makes no sense
    }else if(newTargetAmount > this.state.bigBucketSize){
      //can't do that!
    }else if(newTargetAmount < this.state.smallBucketSize){
      //can't do that!
    }
  }

  //---------------------------------

  runSimulation(){
    if(validateBucketSizes() == true){
      return runSteps(
        this.state.bigBucketSize,
        this.state.smallBucketSize,
        this.state.targetAmount
      )
    }
    return false;
  }

  //---------------------------------

  runSteps(bigBucketSize, smallBucketSize, targetAmount){
    return true;
  }

  //---------------------------------

  render() {
    return (
      <div className="col-md-8 col-md-offset-3">
        <div className="row">
          <BucketDisplay
            size={this.state.bigBucketSize}
            contains={this.state.bigBucketContains}
          />
          <BucketDisplay
            size={this.state.smallBucketSize}
            contains={this.state.smallBucketContains}
          />
        </div>
        <div className="row">
          <SimulationForm
            bigBucketSize={this.state.bigBucketSize}
            smallBucketSize={this.state.smallBucketSize}
            targetAmount={this.state.targetAmount}
            updateBigBucketSize={this.updateBigBucketSize}
            updateSmallBucketSize={this.updateSmallBucketSize}
            updateTargetAmount={this.updateTargetAmount}
          />
        </div>
      </div>
    );
  }
}

//--------------------------------------------------------

class SimulationForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateBigBucketSize = this.updateBigBucketSize.bind(this);
    this.updateSmallBucketSize = this.updateSmallBucketSize.bind(this);
    this.updateTargetAmount = this.updateTargetAmount.bind(this);
    this.runSimulation = this.runSimulation.bind(this);
  }

  //---------------------------------

  updateBigBucketSize() {
    this.props.updateBigBucketSize(
      this.refs.bigBucketSize.value
    );
  }

  //---------------------------------

  updateSmallBucketSize() {
    this.props.updateSmallBucketSize(
      this.refs.smallBucketSize.value
    );
  }

  //---------------------------------

  updateTargetAmount() {
    console.log("updateTargetAmount1");
    this.props.updateTargetAmount(
      this.refs.targetAmount.value
    );
  }

  //---------------------------------

  runSimulation() {
    this.props.runSimulation();
  }

  //---------------------------------

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-md-4 text-center">
            <label for="basic-url">Big Bucket</label>
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                type="text"
                value={this.props.bigBucketSize}
                ref="bigBucketSize"
                onChange={this.updateBigBucketSize}
              />
            </div>
          </div>
          <div className="col-md-4 text-center">
            <label for="basic-url">Small Bucket</label>
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                type="text"
                value={this.props.smallBucketSize}
                ref="smallBucketSize"
                onChange={this.updateSmallBucketSize}
              />
            </div>
          </div>
          <div className="col-md-4 text-center">
            <label for="basic-url">Target Amount</label>
            <div className="input-group input-group-lg">
              <input
                className="form-control"
                type="text"
                value={this.props.targetAmount}
                ref="targetAmount"
                onChange={this.updateTargetAmount}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <a className="btn btn-lg btn-primary" onClick={this.runSimulation} role="button">GO</a>
          </div>
        </div>
      </form>
    );
  }
}

class BucketDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const height = this.props.size * 10;
    const styleObj = {
      width: '200px',
      height: `${height}px`
    }
    return(
      <div className="col-md-6 text-center bucket-container">
      X
      </div>
    );
  }
}

export default BucketSimulator;
