import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import {
  getChannelMessages,
  sendChannelMessage,
} from "../services/channelService";

/* =========================
   CONTEXTO DEL CANAL
========================= */

export const ChannelDetailContext = createContext({
  isChannelDetailLoading: false,
  channelMessages: [],
  onCreateNewMessage: () => {},
  reloadMessages: () => {},
});

const ChannelDetailContextProvider = () => {
  const [isChannelDetailLoading, setIsChannelDetailLoading] = useState(false);
  const [channelMessages, setChannelMessages] = useState([]);

  const { workspace_id, channel_id } = useParams();

  /* =========================
     NORMALIZAR MENSAJES
  ========================= */

  const normalizeMessages = (messages) => {
    return messages.map((msg) => ({
      id: msg._id,
      content: msg.mensaje,
      author:
        msg?.fk_workspace_member_id?.fk_id_user?.username ||
        msg?.fk_workspace_member_id?.fk_id_user?.email ||
        "Usuario",
      timestamp: new Date(msg.createdAt || Date.now()).toLocaleTimeString(),
    }));
  };

  /* =========================
     CARGAR MENSAJES
  ========================= */

  const loadMessages = async () => {
    try {
      if (!workspace_id || !channel_id) return;

      setIsChannelDetailLoading(true);

      const response = await getChannelMessages(workspace_id, channel_id);

      const messages = response?.data?.messages || [];

      const normalized = normalizeMessages(messages);

      setChannelMessages(normalized);
    } catch (error) {
      console.error("Error cargando mensajes:", error);
      setChannelMessages([]);
    } finally {
      setIsChannelDetailLoading(false);
    }
  };

  /* =========================
     RECARGAR AL ENTRAR AL CANAL
  ========================= */

  useEffect(() => {
    setChannelMessages([]);
    loadMessages();
  }, [workspace_id, channel_id]);

  /* =========================
     CREAR MENSAJE
  ========================= */

  const onCreateNewMessage = async (message) => {
    if (!message || message.trim() === "") return;

    try {
      const response = await sendChannelMessage(
        workspace_id,
        channel_id,
        message,
      );

      const backendMessage = response?.data?.message;

      if (backendMessage) {
        const normalized = normalizeMessages([backendMessage]);

        setChannelMessages((prev) => [...prev, ...normalized]);
      } else {
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
        reloadMessages: loadMessages,
      }}
    >
      <Outlet />
    </ChannelDetailContext.Provider>
  );
};

export default ChannelDetailContextProvider;
