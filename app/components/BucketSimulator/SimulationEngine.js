class SimulationEngine{
  constructor(bigBucketSize, smallBucketSize, targetAmount){
    this._bigBucketSize = bigBucketSize;
    this._smallBucketSize = smallBucketSize;
    this._targetAmount = targetAmount;
  }

  //---------------------------------

  runCycleLeft(){
    const initBigBucket = this._bigBucketSize;
    const initSmallBucket = 0;

    const bigBucketSize = this._bigBucketSize;
    const smallBucketSize = this._smallBucketSize;
    const targetAmount = this._targetAmount;

    const stateStack = [];

    let bigContains = initBigBucket;
    let smallContains = initSmallBucket;

    //push the initial state
    stateStack.push([bigContains,smallContains]);

    let sbSpace = smallBucketSize - smallContains;

    let loopCount = 0;
    const loopKill = 100; //if we can't solve it by here, something bad happened

    //Continue looping over the cycle of fill, pour and repeat until we loop back
    while(true){
      console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
      if(bigContains >= sbSpace){
        console.log(`Pouring ${sbSpace} from big to small`);
        bigContains -= sbSpace;
        smallContains += sbSpace;
      }else{
        console.log(`Pouring ${bigContains} from big to small`);
        smallContains += bigContains;
        bigContains = 0;
      }

      //push onto the state stack here
      stateStack.push([bigContains,smallContains])
      //

      sbSpace = smallBucketSize - smallContains;

      //check to see if we have met the goal here.
      if(smallContains == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
        if(bigContains>0){
          stateStack.push([0,smallContains]);
        }
        return stateStack;
      }
      if(bigContains == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
        if(smallContains>0){
          stateStack.push([bigContains,0]);
        }
        return stateStack;
      }

      //if the small bucket is full, empty
      if(sbSpace == 0){
        console.log(`Emptying small`);
        smallContains = 0;
        sbSpace = smallBucketSize;
        stateStack.push([bigContains,smallContains]);
      }

      //if the big bucket is empty, fill it up
      if(bigContains == 0){
        console.log(`Filling big`);
        bigContains = bigBucketSize;
        stateStack.push([bigContains,smallContains]);
      }

      if((bigContains == initBigBucket) && (smallContains == initSmallBucket)){
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
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

  runCycleRight(){
    const initBigBucket = 0;
    const initSmallBucket = this._smallBucketSize;

    const bigBucketSize = this._bigBucketSize;
    const smallBucketSize = this._smallBucketSize;
    const targetAmount = this._targetAmount;

    const stateStack = [];

    let bigContains = initBigBucket;
    let smallContains = initSmallBucket;

    //push the initial state
    stateStack.push([bigContains,smallContains]);

    let bbSpace = bigBucketSize - bigContains;

    let loopCount = 0;
    const loopKill = 100; //if we can't solve it by here, something bad happened

    //Continue looping over the cycle of fill, pour and repeat until we loop back
    while(true){
      console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
      if(smallContains >= bbSpace){
        console.log(`Pouring ${bbSpace} from small to big`);
        smallContains -= bbSpace;
        bigContains += bbSpace;
      }else{
        console.log(`Pouring ${smallContains} from small to big`);
        bigContains += smallContains;
        smallContains = 0;
      }

      //push onto the state stack here
      stateStack.push([bigContains,smallContains])
      //

      bbSpace = bigBucketSize - bigContains;

      //check to see if we have met the goal here.
      if(smallContains == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
        if(bigContains>0){
          stateStack.push([0,smallContains]);
        }
        return stateStack;
      }
      if(bigContains == targetAmount){
        console.log("MISSION COMPLETE!");
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
        if(smallContains>0){
          stateStack.push([bigContains,0]);
        }
        return stateStack;
      }

      //if the big bucket is full, empty it
      if(bbSpace == 0){
        console.log(`Emptying big`);
        bigContains = 0;
        bbSpace = bigBucketSize;
        stateStack.push([bigContains,smallContains]);
      }

      //if the small bucket is empty, fill it
      if(smallContains == 0){
        console.log(`Filling small`);
        smallContains = smallBucketSize;
        stateStack.push([bigContains,smallContains]);
      }

      if((bigContains == initBigBucket) && (smallContains == initSmallBucket)){
        console.log(`BIG::${bigContains}, SMALL::${smallContains}`);
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
}

export default SimulationEngine;
