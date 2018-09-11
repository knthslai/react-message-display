import React, { Component } from 'react';

class ToMessage extends Component {
  render() {
    return (
      <div id="to-container">
        <div id="bubble">
          <a id="timeStamp">{this.props.messages[this.props.messages.length - 1].timeText}</a>
          {this.props.messages.map(msg => <a key={msg.text}>{msg.text}</a>)}
        </div>
      </div>
    );
  }
}

export default ToMessage;