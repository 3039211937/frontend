import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import {
  getChannelMessages,
  sendChannelMessage,
} from "../services/channelService";

/* =========================
   CONTEXTO DE MENSAJES DEL CANAL
   Maneja:
   - carga de mensajes
   - envío de mensajes
   - estado global del canal
========================= */

export const ChannelDetailContext = createContext({
  isChannelDetailLoading: false,
  channelMessages: [],
  onCreateNewMessage: () => {},
});

const ChannelDetailContextProvider = () => {
  const [isChannelDetailLoading, setIsChannelDetailLoading] = useState(false);
  const [channelMessages, setChannelMessages] = useState([]);

  const { workspace_id, channel_id } = useParams();

  /* =========================
     CARGAR MENSAJES DEL CANAL
  ========================= */

  const loadMessages = async () => {
    try {
      setIsChannelDetailLoading(true);

      const response = await getChannelMessages(workspace_id, channel_id);

      const messages = response?.data?.messages || [];

      setChannelMessages(messages);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
      setChannelMessages([]);
    } finally {
      setIsChannelDetailLoading(false);
    }
  };

  /* =========================
     RECARGAR MENSAJES AL CAMBIAR CANAL
  ========================= */

  useEffect(() => {
    if (workspace_id && channel_id) {
      loadMessages();
    }
  }, [workspace_id, channel_id]);

  /* =========================
     ENVIAR MENSAJE NUEVO
  ========================= */

  const onCreateNewMessage = async (message) => {
    if (!message || message.trim() === "") return;

    try {
      const response = await sendChannelMessage(
        workspace_id,
        channel_id,
        message,
      );

      const newMessage = response?.data?.message;

      /* agregar el mensaje enviado al estado local */
      if (newMessage) {
        setChannelMessages((prev) => [...prev, newMessage]);
      } else {
        /* fallback: recargar mensajes */
        loadMessages();
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  return (
    <ChannelDetailContext.Provider
      value={{
        isChannelDetailLoading,
        channelMessages,
        onCreateNewMessage,
      }}
    >
      <Outlet />
    </ChannelDetailContext.Provider>
  );
};

export default ChannelDetailContextProvider;
