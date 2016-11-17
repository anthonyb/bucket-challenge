import React from 'react';

class StepsDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    const stepsDisplayStyle = {
      height: 180,
      border: '1px solid #999',
      color: '#666',
      position: 'absolute',
      bottom: 45,
      left: this.props.leftAlign,
      fontSize: 20,
      overflow: 'scroll'
    }

    let stepList = []

    //console.log(this.props.steps);

    for(let index in this.props.steps){
      let step = this.props.steps[index];
      stepList.unshift(<span>{step[0]} : {step[1]}<br/></span>);
    }

    return(
      <div className="col-xs-2 text-center steps-display" style={stepsDisplayStyle}>
        <h4>Steps({stepList.length})</h4>
        {stepList}
      </div>
    );
  }
}

export default StepsDisplay;
