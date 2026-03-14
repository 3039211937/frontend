import React from "react";
import Message from "../Message/Message";
import "./messagesList.css";

const MessagesList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return (
      <div className="messages-list">
        <span>No hay mensajes en este canal</span>
      </div>
    );
  }

  const messages_list_JSX = messages.map((message) => {
    return (
      <Message
        key={message._id || message.id}
        author={message.user?.username || message.author || "Usuario"}
        timestamp={message.created_at || message.timestamp || ""}
        content={message.mensaje || message.content || ""}
        id={message._id || message.id}
      />
    );
  });

  return <div className="messages-list">{messages_list_JSX}</div>;
};

export default MessagesList;
