import React from 'react'
import Message from '../Message/Message'
import './messagesList.css'

const MessagesList = (props) => {

  
  const messages_list_JSX = props.messages.map(
    (message) => {
      return (
        
        <Message
          key={message.id}
          author={message.author}
          timestamp={message.timestamp}
          content={message.content}
          id={message.id}
        />
      )
    }
  )
  return (
    <div className='messages-list'>
      {messages_list_JSX}
    </div>
  )
}

export default MessagesList

