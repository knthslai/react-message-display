import React, { Component } from 'react';
import './App.css';
import ToMessage from './Components/msgBubbleTo';
import FromMessage from './Components/msgBubbleFrom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pages: 1,
      messageList: [],
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
          const messageList = messages.texts.map(({ text, time }) => {
            const formattedDate = new Date(time)
            return {
              author: source,
              text,
              time,
              timeText: formattedDate.toLocaleTimeString()
            }
          })
          newState.messageList = this.state.messageList.concat(messageList)
          this.setState(newState)
        })
      } catch (error) { console.error(error); }
    })
  }
  render() {
    const messages = this.state.messageList
    messages.sort((a, b) => a.time - b.time)
    const consolidatedMessages = []
    messages.forEach(msg => {
      const currMsgIdx = consolidatedMessages.length
      if (currMsgIdx) {
        if (consolidatedMessages[currMsgIdx - 1][0].author === msg.author) {
          consolidatedMessages[currMsgIdx - 1].push(msg)
        } else {
          consolidatedMessages.push([msg])
        }
      } else {
        consolidatedMessages.push([msg])
      }
    })
    console.log(`consolidated Messages: `, consolidatedMessages)

    const loadMoreBtn = document.getElementById(`load-more`)
    if (loadMoreBtn) {
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
          <h2 style={{ textAlign: `center`, color: `gray` }}>Friday, September 7th</h2>
          {
            this.state.messageList.length ?
              consolidatedMessages.map(msg => {
                return (
                  msg[0].author === `to` ?
                    <ToMessage key={msg[0].text} messages={msg} />
                    : <FromMessage key={msg[0].text} messages={msg} />
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
