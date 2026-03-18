import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { ChannelDetailContext } from "./ChannelDetailContext";

import {
  getChannelMessages,
  sendChannelMessage,
} from "../services/channelService";

const ChannelDetailContextProvider = () => {
  const [isChannelDetailLoading, setIsChannelDetailLoading] = useState(false);
  const [channelMessages, setChannelMessages] = useState([]);

  const { workspace_id, channel_id } = useParams();

  /* =========================
     GET CURRENT USER
  ========================= */

  const getCurrentUser = () => {
    try {
      const token = sessionStorage.getItem("auth_token");
      if (!token) return null;

      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  };

  /* =========================
     NORMALIZAR MENSAJES
  ========================= */

  const normalizeMessages = (messages) => {
    return messages.map((msg) => {
      const user = msg?.fk_workspace_member_id?.fk_id_user;

      return {
        id: msg._id,
        content: msg.mensaje,
        user: user
          ? {
              username: user.username,
              email: user.email,
            }
          : null,
        timestamp: new Date(msg.createdAt || Date.now()).toLocaleTimeString(),
      };
    });
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
      const currentUser = getCurrentUser();

      const response = await sendChannelMessage(
        workspace_id,
        channel_id,
        message,
      );

      const backendMessage = response?.data?.message;

      if (backendMessage) {
        let normalized = normalizeMessages([backendMessage])[0];

        if (!normalized.user && currentUser) {
          normalized = {
            ...normalized,
            user: {
              username: currentUser.username,
              email: currentUser.email,
            },
          };
        }

        setChannelMessages((prev) => [...prev, normalized]);
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
