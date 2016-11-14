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
      bucketDisplayMultiplier: 5,
      steps: [],
      targetStepHash: {}
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

    const bBS = this.state.bigBucketSize;
    const sBS = this.state.smallBucketSize;
    const tA = this.state.targetAmount;

    //Catch user input error first

    if(sBS >= bBS){
      return false;
      //can't do that!
    }

    if(tA > bBS){
      return false;
      //can't do that!
    }

    //Now filter out simple logic blocks

    if((bBS % sBS) == 0){
      if(tA < sBS){
        return false;
        //can't do that! - even divisor can't yield less than the small bucket
      }
    }

    if(isEven(bBS) && isEven(sBS)){
      if(isOdd(tA)){
        return false;
        //can't do that! - two even sized buckets can't make an odd amount
      }
    }

    //Possible: mod, mod - sm, lg - (mod - sm)



    if(newTargetAmount < this.state.bigBucketSize){

    }

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

    return true;
  }

  //---------------------------------

  runSimulation(){
    if(validateBucketSizes() == true){
      this.state.simulationState = "simuating";
      //prime the recursion and then run it.
      runSteps(this.state.bigBucketSize, 0, [[this.state.bigBucketSize,0]]);
      runSteps(0, this.state.smallBucketSize, [[0,this.state.smallBucketSize]]);
    }
    return false;
  }

  //---------------------------------

  runSteps(bigBucketContains, smallBucketContains, steps){
    const bbS = this.state.bigBucketSize;
    const sbS = this.state.smallBucketSize;

    const bbSpace = bbS - bigBucketContains;
    let sbSpace = sbS - smallBucketContains;

    //try the right op
    if (bigBucketContains > 0){
      let newSteps = []
      if (sbSpace == 0){
        // dump and then do it
        smallBucketContains = 0
        newSteps.push([bigBucketContains,smallBucketContains])
        sbSpace = sbS - smallBucketContains;
      }

      if(bigBucketContains > sbSpace){
        bigBucketContains -= sbSpace;
        smallBucketContains = sbS;
        newSteps.push([bigBucketContains,smallBucketContains])
      }
    }



    //try the left op


    let rightOpYield = (bigBucketContains - smallBucketContains)
    let leftOpYield = abs(smallBucketContains - bigBucketContains);
  }

  //---------------------------------
  //utilities for easy reability
  isEven(n) {
    return n % 2 == 0;
  }

  //---------------------------------

  isOdd(n) {
    return Math.abs(n % 2) == 1;
  }

  //---------------------------------

  render() {
    let containerHeight = 280;
    const displayMultiplier = 5;
    if((this.state.bigBucketSize * displayMultiplier)>280){
      containerHeight = this.state.bigBucketSize * displayMultiplier;
    }
    const bucketContainerStyleObj = {
      position: 'relative',
      height: containerHeight,
      marginBottom: 30,
      marginTop: 40
    }

    return (
      <div className="col-md-8 col-md-offset-2">
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
    const displayMultiplier = 5;
    const bucketHeight = this.props.size;
    const bucketHeightDisplay = bucketHeight * displayMultiplier;
    const waterHeight = this.props.contains;
    const waterHeightDisplay = waterHeight * displayMultiplier;
    const bucketDisplayStyle = {
      position: 'absolute',
      bottom: 20,
      left: this.props.leftAlign
    }
    const bucketStyle = {
      height: bucketHeightDisplay,
      width: '50%',
      border: '1px solid #888',
      borderTop: 'none',
      borderRadius: 5,
      margin: 'auto',
      background: `linear-gradient(0deg, #00A0FC ${waterHeightDisplay-3}px, #EEE ${waterHeightDisplay+3}px)`
    }

    const currentAmountStyle = {
      fontSize: 20
    }

    return(
      <div className="col-md-6 text-center bucket-display" style={bucketDisplayStyle}>
        <div className="bucket text-center" style={bucketStyle}></div>
        <span style={currentAmountStyle}>{waterHeight}</span>
      </div>
    );
  }
}

export default BucketSimulator;
