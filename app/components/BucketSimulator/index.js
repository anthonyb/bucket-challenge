import React from 'react';
import styles from './BucketSimulator.css';
import SimulationEngine from './SimulationEngine'
import SimulationForm from './SimulationForm'
import BucketDisplay from './BucketDisplay'

class BucketSimulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simulationState: "waiting",
      bigBucketSize: 12,
      smallBucketSize: 7,
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
    this.validateBucketSizes = this.validateBucketSizes.bind(this);
  }

  //---------------------------------

  updateBigBucketSize(size){
    if(this.state.simulationState != "waiting"){
      return;
    }

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
    if(this.state.simulationState != "waiting"){
      return;
    }

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
    if(this.state.simulationState != "waiting"){
      return;
    }

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

  runSimulation(){
    if(this.state.simulationState != "waiting"){
      return;
    }

    let leftCycleResults = null;
    let rightCycleResults = null;

    const simulationEngine = new SimulationEngine(
      this.state.bigBucketSize,
      this.state.smallBucketSize,
      this.state.targetAmount
    );

    if(this.validateBucketSizes() == true){
      this.state.simulationState = "simuating";
      leftCycleResults = simulationEngine.runCycleLeft();
      rightCycleResults = simulationEngine.runCycleRight();
    }else{
      return false;
    }

    //if for some odd reason only one of them worked...
    if(leftCycleResults || rightCycleResults){

      let shortestCycleLength = Infinity;
      let shortestCycle = null;

      if(leftCycleResults){
        if(leftCycleResults.length < shortestCycleLength){
          shortestCycle = leftCycleResults;
          shortestCycleLength = leftCycleResults.length;
        }
      }

      if(rightCycleResults){
        if(rightCycleResults.length < shortestCycleLength){
          shortestCycle = rightCycleResults;
          shortestCycleLength = rightCycleResults.length;
        }
      }

      console.log(shortestCycle);
      console.log(shortestCycleLength);


      const sleep = function(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      //should be viewable, but not tedious
      const frameDelay = 5000/shortestCycleLength;

      for(let index in shortestCycle){
        let cycle = shortestCycle[index];
        let delay = frameDelay * index;
        sleep(delay).then(() => {
          let newBigContains = cycle[0];
          let newSmallContains = cycle[1];
          this.setState({bigBucketContains: newBigContains});
          this.setState({smallBucketContains: newSmallContains});

          //once done, set it back to waiting and return true
          if(index==shortestCycle.length-1){
            this.state.simulationState = "waiting";
            return true;
          }
        });
      }

      //this shouldn't happen, but its a catchall for failed animation
      return true;
    }else{
      this.state.simulationState = "waiting";
      return false;
    }
  }

  //---------------------------------

  validateBucketSizes(){

    const bBS = this.state.bigBucketSize;
    const sBS = this.state.smallBucketSize;
    const tA = this.state.targetAmount;

    //---------------------------------
    //utilities for easy reability
    const isEven = function(n) {
      return n % 2 == 0;
    }

    //---------------------------------

    const isOdd = function(n) {
      return Math.abs(n % 2) == 1;
    }

    //Catch user input error first

    if(sBS < 2){
      console.log(`Small bucket has to be at least 2`);
      return false;
      //can't do that!
    }

    if(bBS < 3){
      console.log(`Big bucket has to be at least 3`);
      return false;
      //can't do that!
    }

    if(sBS >= bBS){
      console.log(`Small bucket has to be smaller than the big bucket`);
      return false;
      //can't do that!
    }

    if(tA >= bBS){
      console.log(`Target needs to be less than the big bucket`);
      return false;
      //can't do that!
    }

    if(tA == sBS){
      console.log(`Target needs to be a different size than the small bucket`);
      return false;
    }

    //Now filter out simple logic blocks

    if((bBS % sBS) == 0){
      if(tA < sBS){
        console.log(`Sorry! Even divisor can't yield anything less than the small bucket`);
        return false;
      }
      if(sbS % tA != 0){
        console.log(`Sorry! Even divisor can't yield anything that isn't a multiple of the small bucket`);
        return false;
      }
    }

    if(isEven(bBS) && isEven(sBS)){
      if(isOdd(tA)){
        console.log(`Sorry! Can't do that! - two even sized buckets can't make an odd amount`);
        return false;
      }
    }

    return true;
  }

  //---------------------------------

  render() {
    let containerHeight = 180;
    const displayMultiplier = 5;
    if((this.state.bigBucketSize * displayMultiplier)>180){
      containerHeight = this.state.bigBucketSize * displayMultiplier;
    }
    const bucketContainerStyleObj = {
      position: 'relative',
      height: containerHeight,
      marginBottom: 30,
      marginTop: 40
    }

    return (
      <div className="col-xs-8 col-xs-offset-2">
        <div style={bucketContainerStyleObj} className="row bucket-container">
          <BucketDisplay
            size={this.state.bigBucketSize}
            contains={this.state.bigBucketContains}
            leftAlign={'0%'}
          />
          <BucketDisplay
            size={this.state.smallBucketSize}
            contains={this.state.smallBucketContains}
            leftAlign={'50%'}
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
            runSimulation={this.runSimulation}
          />
        </div>
      </div>
    );
  }
}

export default BucketSimulator;
