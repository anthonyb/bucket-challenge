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

  }

  //---------------------------------

  render() {
    return (
      <div className={styles.app}>
        <SimulationForm
          bigBucketSize={this.state.bigBucketSize}
          smallBucketSize={this.state.smallBucketSize}
          targetAmount={this.state.targetAmount}
          updateBigBucketSize={this.updateBigBucketSize}
          updateSmallBucketSize={this.updateSmallBucketSize}
          updateTargetAmount={this.updateTargetAmount}
        />
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
        <input
          type="text"
          value={this.props.bigBucketSize}
          ref="bigBucketSize"
          onChange={this.updateBigBucketSize}
        />
        <input
          type="text"
          value={this.props.smallBucketSize}
          ref="smallBucketSize"
          onChange={this.updateSmallBucketSize}
        />
        <input
          type="text"
          value={this.props.targetAmount}
          ref="targetAmount"
          onChange={this.updateTargetAmount}
        />
        <input
          type="button"
          value="GO"
          onClick={this.runSimulation}
        />
      </form>
    );
  }
}

export default BucketSimulator;
