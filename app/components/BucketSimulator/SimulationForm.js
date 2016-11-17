import React from 'react';

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

    const inputStyle = {
      textAlign:'center',
      fontSize:22
    }

    return (
      <form>
        <div className="row">
          <div className="col-xs-4 text-center">
            <label>Big Bucket Capacity</label>
            <div className="input-group input-group-lg">
              <input
                style={inputStyle}
                className="form-control"
                type="text"
                value={this.props.bigBucketSize}
                ref="bigBucketSize"
                onChange={this.updateBigBucketSize}
              />
            </div>
          </div>
          <div className="col-xs-4 text-center">
            <label>Small Bucket Capacity</label>
            <div className="input-group input-group-lg">
              <input
                style={inputStyle}
                className="form-control"
                type="text"
                value={this.props.smallBucketSize}
                ref="smallBucketSize"
                onChange={this.updateSmallBucketSize}
              />
            </div>
          </div>
          <div className="col-xs-4 text-center">
            <label>Target Amount</label>
            <div className="input-group input-group-lg">
              <input
                style={inputStyle}
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
          <div className="col-xs-12 text-center">
            <a className="btn btn-lg btn-primary" onClick={this.runSimulation} role="button">GO</a>
          </div>
        </div>
      </form>
    );
  }
}

export default SimulationForm;
