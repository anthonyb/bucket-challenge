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
    let containerHeight = 250;
    if((this.state.bigBucketSize * 5)>250){
      containerHeight = this.state.bigBucketSize * 5;
    }
    const bucketContainerStyleObj = {
      position: 'relative',
      height: containerHeight,
      marginBottom: 50,
      marginTop: 50
    }

    return (
      <div className="col-md-8 col-md-offset-3">
        <div style={bucketContainerStyleObj} className="row bucket-container">
          <BucketDisplay
            size={this.state.bigBucketSize}
            contains={this.state.bigBucketContains}
            leftAlign={0}
          />
          <BucketDisplay
            size={this.state.smallBucketSize}
            contains={this.state.smallBucketContains}
            leftAlign={380}
          />
        </div>
        <div className="row bucket-form-container">
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
    const buttonRowStyleObj = {
      marginTop: 20
    }

    return (
      <form>
        <div className="row">
          <div className="col-md-4 text-center">
            <label>Big Bucket Capacity</label>
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
            <label>Small Bucket Capacity</label>
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
            <label>Target Amount</label>
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
        <div style={buttonRowStyleObj} className="row">
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
    const bucketHeight = this.props.size * 5;
    const waterHeight = 2 * 10;
    const bucketDisplayStyleObj = {
      position: 'absolute',
      bottom: 20,
      left: this.props.leftAlign
    }
    const bucketStyleObj = {
      height: bucketHeight,
      width: '50%',
      border: '1px solid #888',
      borderTop: 'none',
      borderRadius: 5,
      margin: 'auto',
      background: `linear-gradient(0deg, #00A0FC ${waterHeight-5}px, #EEE ${waterHeight+5}px)`
    }
    return(
      <div className="col-md-6 text-center bucket-display" style={bucketDisplayStyleObj}>
        <div className="bucket text-center" style={bucketStyleObj}></div>
      </div>
    );
  }
}

export default BucketSimulator;
