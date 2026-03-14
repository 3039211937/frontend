import React, { useContext } from "react";
import { ChannelDetailContext } from "../../Context/ChannelDetailContext";
import "./MessageFormStyles.css";

/* =========================
   FORMULARIO PARA ENVIAR MENSAJES
========================= */

const NewMessageForm = () => {
  const { onCreateNewMessage } = useContext(ChannelDetailContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const message_value = form.mensaje.value.trim();

    /* evitar enviar mensajes vacíos */
    if (!message_value) return;

    /* enviar mensaje al backend */
    onCreateNewMessage(message_value);

    /* limpiar textarea */
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <textarea
        id="mensaje"
        name="mensaje"
        placeholder="Escribe tu mensaje aquí..."
        className="message-form-text-input"
      />

      <button type="submit">
        <img
          src="https://cdn-icons-png.freepik.com/256/10924/10924424.png"
          className="message-form__img"
          alt="Enviar"
        />
      </button>
    </form>
  );
};

export default NewMessageForm;
