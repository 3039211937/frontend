import React from "react";
import "./messagesList.css";

const MessagesList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <div>No hay mensajes en este canal</div>;
  }

  /* =========================
     SAFE TIMESTAMP FORMATTER
  ========================= */

  const formatTime = (timestamp) => {
    if (!timestamp) return "";

    // If backend already sent HH:MM or HH:MM:SS
    if (
      typeof timestamp === "string" &&
      timestamp.includes(":") &&
      timestamp.length <= 8
    ) {
      return timestamp.slice(0, 5);
    }

    const date = new Date(timestamp);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="messages-list">
      {messages.map((message, index) => {
        const prev = messages[index - 1];

        const author =
          message.author ||
          message.user?.username ||
          message.fk_workspace_member_id?.fk_id_user?.username ||
          "Usuario";

        const prevAuthor =
          prev?.author ||
          prev?.user?.username ||
          prev?.fk_workspace_member_id?.fk_id_user?.username;

        const content = message.content || message.mensaje || "";

        const timestamp = message.timestamp || message.created_at;

        const showHeader = !prev || prevAuthor !== author;

        return (
          <div key={message._id || message.id} className="message">
            {showHeader && (
              <div className="message-header">
                <span className="message-user">{author}</span>
                <span className="message-time">{formatTime(timestamp)}</span>
              </div>
            )}

            <div className="message-content">{content}</div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesList;
