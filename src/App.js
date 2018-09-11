import React, { Component } from 'react';
import './App.css';
import ToMessage from './Components/msgBubbleTo';
import FromMessage from './Components/msgBubbleFrom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pages: 1,
      messageList: []
    };
  }
  componentDidMount() {
    this.getMessages()
  }
  getMessages(pagesNum) {
    [`to`, `from`].forEach(source => {
      let URL = `https://cors-anywhere.herokuapp.com/https://gv-text-api.herokuapp.com/api/texts/${source}`
      const newState = {}
      if (pagesNum) {
        URL += `?pages=${pagesNum}`
        newState.pages = pagesNum + 1
      }

      try {
        fetch(URL).then(resp => resp.json()).then(messages => {
          const messageList = messages.texts.map(({ text, time }) => ({
            author: source,
            text,
            time
          }))
          newState.messageList = this.state.messageList.concat(messageList)
          this.setState(newState)
        })
      } catch (error) { console.error(error); }
    })
  }
  render() {
    const messages = this.state.messageList
    messages.sort((a, b) => b.time - a.time)
    const loadMoreBtn = document.getElementById(`load-more`)
    if (loadMoreBtn) {
      console.dir(loadMoreBtn.style.opacity)
      loadMoreBtn.style.opacity = 1
      if (loadMoreBtn.classList.length && this.state.messageList.length) {
        loadMoreBtn.classList.remove(`disabled`)
      }
    }
    return (
      <div id="chat-display">
        <div id="buttons">
          <div id="contact-icon"><h1>To</h1></div>
          <button id="load-more" type="button" onClick={() => {
            this.getMessages(this.state.pages)
            loadMoreBtn.style.opacity = 0.1
            loadMoreBtn.classList.add(`disabled`)
          }}>Load previous</button>
        </div>
        <div id="messages">
          {
            this.state.messageList.length ?
              messages.map(msg => {
                return (
                  msg.author === `to` ?
                    <ToMessage key={msg.text} message={msg} />
                    : <FromMessage key={msg.text} message={msg} />
                )
              })
              : <h2 style={{ textAlign: `center` }}>Loading ...</h2>
          }
        </div>
      </div >
    );
  }
}

export default App;
