import React from 'react';

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
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      margin: 'auto',
      background: `linear-gradient(0deg, #00A0FC ${waterHeightDisplay-3}px, #EEE ${waterHeightDisplay+3}px)`
    }

    const currentAmountStyle = {
      fontSize: 20
    }

    return(
      <div className="col-xs-6 text-center bucket-display" style={bucketDisplayStyle}>
        <div className="bucket text-center" style={bucketStyle}></div>
        <span style={currentAmountStyle}>{waterHeight}</span>
      </div>
    );
  }
}

export default BucketDisplay;
