import React, { Component } from 'react';

class FromMessage extends Component {
  render() {
    return (
      <div id="from-container">
        <div id="bubble">
          {this.props.message.text}
        </div>
      </div>
    );
  }
}

export default FromMessage;