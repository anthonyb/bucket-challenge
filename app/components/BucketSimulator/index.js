import React from 'react';
import SimulationEngine from './SimulationEngine'
import SimulationForm from './SimulationForm'
import BucketDisplay from './BucketDisplay'
import StepsDisplay from './StepsDisplay'
import ErrorDisplay from './ErrorDisplay'

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
      error: null
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

    this.setState({steps: []});
    this.setState({error: null});

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

      this.animateResults(shortestCycle).then(() =>{
        //once done, set it back to waiting and return true
        this.state.simulationState = "waiting";
        return true;
      });

    }else{
      let error = `Hmm, for some reason we couldn't make ${this.state.targetAmount}`;
      console.log(error);
      this.setState({error: error});
      this.state.simulationState = "waiting";
      return false;
    }
  }

  //---------------------------------

  animateResults(shortestCycle){

    let shortestCycleLength = shortestCycle.length;

    return new Promise((resolve) => {

      const sleep = function(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      //should be viewable, but not tedious
      const frameDelay = 5000/shortestCycleLength;

      //reset the animation
      this.setState({bigBucketContains: 0});
      this.setState({smallBucketContains: 0});

      for(let index in shortestCycle){
        let cycle = shortestCycle[index];
        let delay = frameDelay * index;
        if(index==0){
          delay = 250;
        }
        sleep(delay).then(() => {
          let newBigContains = cycle[0];
          let newSmallContains = cycle[1];

          this.state.steps.push([newBigContains,newSmallContains]);
          this.setState({steps: this.state.steps});
          this.setState({bigBucketContains: newBigContains});
          this.setState({smallBucketContains: newSmallContains});

          if(index>=shortestCycle.length-1){
            let success =
              `Success! We have yielded ${this.state.targetAmount}
              units of water in only ${shortestCycleLength} Steps!`;
            console.log(success);
            this.setState({error: success});
            resolve();
          }
        });
      }
    });
  }

  //---------------------------------

  validateBucketSizes(){

    const bigBucketSize = this.state.bigBucketSize;
    const smallBucketSize = this.state.smallBucketSize;
    const targetAmount = this.state.targetAmount;

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
    //Use short circuit style error handling

    if(smallBucketSize < 2){
      let error = `Small bucket has to be at least 2`;
      console.log(error);
      this.setState({error: error});
      return false;
      //can't do that!
    }

    if(bigBucketSize < 3){
      let error = `Big bucket has to be at least 3`;
      console.log(error);
      this.setState({error: error});
      return false;
      //can't do that!
    }

    if(smallBucketSize >= bigBucketSize){
      let error = `Small bucket has to be smaller than the big bucket`;
      console.log(error);
      this.setState({error: error});
      return false;
      //can't do that!
    }

    if(targetAmount >= bigBucketSize){
      let error = `Target needs to be less than the big bucket`;
      console.log(error);
      this.setState({error: error});
      return false;
      //can't do that!
    }

    if(targetAmount == smallBucketSize){
      let error = `Target needs to be a different size than the small bucket`;
      console.log(error);
      this.setState({error: error});
      return false;
    }

    //Now filter out simple logic blocks

    if((bigBucketSize % smallBucketSize) == 0){
      if(targetAmount < smallBucketSize){
        let error = `Sorry! Even divisor can't yield anything less than the small bucket`;
        console.log(error);
        this.setState({error: error});
        return false;
      }

      if((smallBucketSize % targetAmount != 0) && (targetAmount % smallBucketSize != 0)){
        let error = `Sorry! Even divisor can't yield anything that isn't a multiple of the small bucket`;
        console.log(error);
        this.setState({error: error});
        return false;
      }
    }

    if(isEven(bigBucketSize) && isEven(smallBucketSize)){
      if(isOdd(targetAmount)){
        let error = `Sorry! Two even sized buckets can't make an odd amount`;
        console.log(error);
        this.setState({error: error});
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
          <StepsDisplay
            leftAlign={'42%'}
            steps={this.state.steps}
          />
          <BucketDisplay
            size={this.state.smallBucketSize}
            contains={this.state.smallBucketContains}
            leftAlign={'50%'}
          />
        </div>
        <ErrorDisplay error={this.state.error} />
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
