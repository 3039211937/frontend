import React, { useContext, useRef } from "react";
import { ChannelDetailContext } from "../../Context/ChannelDetailContext";
import "./MessageFormStyles.css";

const NewMessageForm = () => {
  const { onCreateNewMessage } = useContext(ChannelDetailContext);
  const textareaRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = textareaRef.current.value.trim();

    if (!message) return;

    onCreateNewMessage(message);

    textareaRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        ref={textareaRef}
        name="mensaje"
        rows="3"
        placeholder="Escribe tu mensaje..."
        className="message-form-text-input"
        onKeyDown={handleKeyDown}
      />

      <button type="submit">➤</button>
    </form>
  );
};

export default NewMessageForm;
