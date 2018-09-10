import React, { Component } from 'react';
// import { Launcher } from 'react-chat-window'
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super();
    this.state = {
      messageList: {}
    };
  }
  componentDidMount() {
    this.getMessages()
  }
  async getMessages() {
    try {
      const messages = await axios.get(`https://gv-text-api.herokuapp.com/api/texts/to`, {
        headers: {
          "Access-Control-Allow-Origin": `*`
        }
      })
      console.log(`messages: `, messages.data)
    } catch (error) { console.error(error); }
  }
  // _onMessageWasSent(message) {
  //   this.setState({
  //     messageList: [...this.state.messageList, message]
  //   })
  // }

  // _sendMessage(text) {
  //   if (text.length > 0) {
  //     this.setState({
  //       messageList: [...this.state.messageList, {
  //         author: `them`,
  //         type: `text`,
  //         data: { text }
  //       }]
  //     })
  //   }
  // }
  render() {
    console.log(`checking: `, this.state.messageList)
    return (
      <React.Fragment>
        {/* <Launcher
          agentProfile={{
            teamName: `react-live-chat`,
            imageUrl: `https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png`
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        /> */}
      </React.Fragment>
    );
  }
}

export default App;
