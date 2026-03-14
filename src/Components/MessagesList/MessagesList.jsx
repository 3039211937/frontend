import React, { useEffect, useRef } from "react";
import "./messagesList.css";

const MessagesList = ({ messages }) => {
  const bottomRef = useRef(null);

  /* =========================
     AUTO SCROLL AL ULTIMO MENSAJE
  ========================= */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return <div>No hay mensajes en este canal</div>;
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="messages-list">
      {messages.map((message) => {
        const author =
          message.author ||
          message.user?.username ||
          message.fk_workspace_member_id?.fk_id_user?.username ||
          sessionStorage.getItem("username") ||
          "Usuario";

        const content = message.content || message.mensaje || "";

        const timestamp = message.timestamp || message.created_at;

        return (
          <div key={message._id || message.id} className="message">
            <div className="message-header">
              <span className="message-user">{author}</span>
              <span className="message-time">{formatTime(timestamp)}</span>
            </div>

            <div className="message-content">{content}</div>
          </div>
        );
      })}

      {/* ELEMENTO INVISIBLE PARA SCROLL */}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesList;
