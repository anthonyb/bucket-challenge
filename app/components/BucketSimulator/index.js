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
    this.validateBucketSizes = this.validateBucketSizes.bind(this);
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

    if(sBS >= bBS){
      console.log(`Small bucket has to be. . .smaller`);
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

    //Possible: mod, mod - sm, lg - (mod - sm)

    return true;
  }

  //---------------------------------

  runSimulation(){
    let leftCycleResults = null;
    let rightCycleResults = null;
    if(this.validateBucketSizes() == true){
      this.state.simulationState = "simuating";
      leftCycleResults = this.runCycleLeft(this.state.bigBucketSize, 0);
      rightCycleResults = this.runCycleRight(0, this.state.smallBucketSize);
    }

    console.log(leftCycleResults);
    console.log(rightCycleResults);

    //if for some odd reason only one of them worked...
    if(leftCycleResults || rightCycleResults){

      const shortestCycleLength = Math.Infinity;
      let shortestCycle = null;

      if(leftCycleResults){
        if(leftCycleResults.length() < shortestCycleLength){
          shortestCycle = leftCycleResults;
        }
      }

      if(rightCycleResults){
        if(rightCycleResults.length() < shortestCycleLength){
          shortestCycle = rightCycleResults;
        }
      }

      console.log(shortestCycle);

      //animate here...

      //this.setState({bigBucketContains: bigC});
      //this.setState({smallBucketContains: smallC});
      //console.log(this.state)

      //
    }else{
      return false;
    }
  }

  //---------------------------------


  runCycleLeft(bigBucketContains, smallBucketContains){
    const initBigBucket = bigBucketContains;
    const initSmallBucket = smallBucketContains;

    const bigBucketSize = this.state.bigBucketSize;
    const smallBucketSize = this.state.smallBucketSize;
    const targetAmount = this.state.targetAmount;

    const stateStack = [[bigBucketContains,smallBucketContains]];

    let smallC = smallBucketContains;
    let bigC = bigBucketContains;

    let sbSpace = smallBucketSize - smallC;
    let bbSpace = bigBucketSize - bigC;

    let loopCount = 0;
    const loopKill = 100; //if we can't solve it by here, something bad happened

    //Continue looping over the cycle of fill, pour and repeat until we loop back
    while(true){
      console.log(`BIG::${bigC}, SMALL::${smallC}`);
      if(bigC >= sbSpace){
        console.log(`Pouring ${sbSpace} from big to small`);
        bigC -= sbSpace;
        smallC += sbSpace;
      }else{
        console.log(`Pouring ${bigC} from big to small`);
        smallC += bigC;
        bigC = 0;
      }

      //push onto the state stack here
      stateStack.push([bigC,smallC])
      //

      sbSpace = smallBucketSize - smallC;
      bbSpace = bigBucketSize - bigC;

      //check to see if we have met the goal here.
      if(smallC == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        if(bigC>0){
          stateStack.push([0,smallC]);
        }
        return stateStack;
      }
      if(bigC == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        if(smallC>0){
          stateStack.push([bigC,0]);
        }
        return stateStack;
      }

      //if the small bucket is full, empty
      if(sbSpace == 0){
        console.log(`Emptying small`);
        smallC = 0;
        sbSpace = smallBucketSize;
        stateStack.push([bigC,smallC]);
      }

      //if the big bucket is empty, fill it up
      if(bigC == 0){
        console.log(`Filling big`);
        bigC = bigBucketSize;
        bbSpace = 0;
        stateStack.push([bigC,smallC]);
      }

      if((bigC == initBigBucket) && (smallC == initSmallBucket)){
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        console.log(`Failed to make the required ${targetAmount}`);
        //we have made a loop. All possibilities exhausted
        //this is a failure :(
        return false;
      }

      if(++loopCount >= loopKill){
        console.log(`Kill it...`);
        return false;
      }

    }// end while loop

  } //end runCycleLeft

  //---------------------------------

  runCycleRight(bigBucketContains, smallBucketContains){
    const initBigBucket = bigBucketContains;
    const initSmallBucket = smallBucketContains;

    const bigBucketSize = this.state.bigBucketSize;
    const smallBucketSize = this.state.smallBucketSize;
    const targetAmount = this.state.targetAmount;

    const stateStack = [[bigBucketContains,smallBucketContains]];

    let smallC = smallBucketContains;
    let bigC = bigBucketContains;

    let sbSpace = smallBucketSize - smallC;
    let bbSpace = bigBucketSize - bigC;

    let loopCount = 0;
    const loopKill = 100; //if we can't solve it by here, something bad happened

    //Continue looping over the cycle of fill, pour and repeat until we loop back
    while(true){
      console.log(`BIG::${bigC}, SMALL::${smallC}`);
      if(smallC >= bbSpace){
        console.log(`Pouring ${bbSpace} from small to big`);
        smallC -= bbSpace;
        bigC += bbSpace;
      }else{
        console.log(`Pouring ${smallC} from small to big`);
        bigC += smallC;
        smallC = 0;
      }

      //push onto the state stack here
      stateStack.push([bigC,smallC])
      //

      sbSpace = smallBucketSize - smallC;
      bbSpace = bigBucketSize - bigC;

      //check to see if we have met the goal here.
      if(smallC == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        if(bigC>0){
          stateStack.push([0,smallC]);
        }
        return stateStack;
      }
      if(bigC == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        if(smallC>0){
          stateStack.push([bigC,0]);
        }
        return stateStack;
      }

      //if the big bucket is full, empty it
      if(bbSpace == 0){
        console.log(`Emptying big`);
        bigC = 0;
        bbSpace = bigBucketSize;
        stateStack.push([bigC,smallC]);
      }

      //if the small bucket is empty, fill it
      if(smallC == 0){
        console.log(`Filling small`);
        smallC = smallBucketSize;
        sbSpace = 0;
        stateStack.push([bigC,smallC]);
      }

      if((bigC == initBigBucket) && (smallC == initSmallBucket)){
        console.log(`BIG::${bigC}, SMALL::${smallC}`);
        console.log(`Failed to make the required ${targetAmount}`);
        //we have made a loop. All possibilities exhausted
        //this is a failure :(
        return false;
      }

      if(++loopCount >= loopKill){
        console.log(`Kill it...`);
        return false;
      }

    }// end while loop

  } //end runCycleRight

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
            runSimulation={this.runSimulation}
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
