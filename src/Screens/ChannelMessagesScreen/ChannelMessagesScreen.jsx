import React, { useContext } from "react";
import { ChannelDetailContext } from "../../Context/ChannelDetailContext";
import { ChannelListContext } from "../../Context/ChannelListContext";
import { useParams } from "react-router-dom";

import MessagesList from "../../Components/MessagesList/MessagesList";
import NewMessageForm from "../../Components/NewMessageForm/NewMessageForm";

import "./ChannelMessagesScreen.css";

const ChannelMessagesScreen = () => {
  const { channelMessages, isChannelDetailLoading, onCreateNewMessage } =
    useContext(ChannelDetailContext);

  const { channelList } = useContext(ChannelListContext);

  const { channel_id } = useParams();

  const currentChannel = channelList?.find((c) => c._id === channel_id);

  if (isChannelDetailLoading) {
    return <div className="chat-loading">Cargando mensajes...</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2># {currentChannel?.name || "Canal"}</h2>

        <span className="chat-count">{channelMessages.length} mensajes</span>
      </div>

      <div className="chat-messages">
        <MessagesList messages={channelMessages} />
      </div>

      <div className="chat-input">
        <NewMessageForm onCreateNewMessage={onCreateNewMessage} />
      </div>
    </div>
  );
};

export default ChannelMessagesScreen;
