import React, { Component } from 'react';

class ToMessage extends Component {
  render() {
    return (
      <div id="to-container">
        <div id="bubble">
          {this.props.message.text}
        </div>
      </div>
    );
  }
}

export default ToMessage;