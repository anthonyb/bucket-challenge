import React from 'react';

class ErrorDisplay extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){

    let display = 'none';

    if(this.props.error){
      display = 'block'
    }

    const errorStyle = {
      display: display,
    }

    return(
      <div style={errorStyle} className="alert alert-warning">
        <strong>{this.props.error}</strong>
      </div>
    );
  }
}

export default ErrorDisplay;
