import React, { useContext } from "react";
import { ChannelDetailContext } from "../../Context/ChannelDetailContext";
import { ChannelListContext } from "../../Context/ChannelListContext";
import { useParams } from "react-router-dom";

import MessagesList from "../../Components/MessagesList/MessagesList";
import NewMessageForm from "../../Components/NewMessageForm/NewMessageForm";

import "./ChannelMessagesScreen.css";

const ChannelMessagesScreen = () => {
  const {
    channelMessages,
    isChannelDetailLoading,
    onCreateNewMessage,
    reloadMessages,
  } = useContext(ChannelDetailContext);

  const { channelList, reloadChannels } = useContext(ChannelListContext);

  const { channel_id } = useParams();

  const currentChannel = channelList?.find((c) => c._id === channel_id);

  /* =========================
     GET CURRENT USER (FROM TOKEN)
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
     WRAP CREATE MESSAGE
  ========================= */

  const handleCreateMessage = async (messageText) => {
    const user = getCurrentUser();

    await onCreateNewMessage(messageText);

    // 🔥 FIX: patch last message locally (optimistic UI)
    if (user && channelMessages.length > 0) {
      const lastMessage = channelMessages[channelMessages.length - 1];

      if (!lastMessage.user) {
        lastMessage.user = {
          username: user.username,
          email: user.email,
        };
      }
    }
  };

  /* =========================
     REFRESH
  ========================= */

  const handleRefresh = async () => {
    await reloadMessages();
    await reloadChannels();
  };

  if (isChannelDetailLoading) {
    return <div className="chat-loading">Cargando mensajes...</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-channel-title">
          # {currentChannel?.name || "Canal"}
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="chat-count">{channelMessages.length} mensajes</span>

          <button className="btn btn-primary btn-sm" onClick={handleRefresh}>
            ⟳
          </button>
        </div>
      </div>

      <div className="chat-messages">
        <MessagesList messages={channelMessages} />
      </div>

      <div className="chat-input">
        <NewMessageForm onCreateNewMessage={handleCreateMessage} />
      </div>
    </div>
  );
};

export default ChannelMessagesScreen;
