import React from "react";
import "./messagesList.css";

const MessagesList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No hay mensajes en este canal</div>;
  }

  return (
    <div className="messages-list">
      {messages.map((message) => {
        const author = message.author || message.user?.username || "Usuario";

        const content = message.content || message.mensaje || "";

        const timestamp = message.timestamp || message.created_at || "";

        return (
          <div key={message._id || message.id} className="message">
            <div className="message-author">
              {author}
              <span className="message-time">{timestamp}</span>
            </div>

            <div className="message-content">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
