import React, { useContext } from "react";
import { ChannelDetailContext } from "../../Context/ChannelDetailContext";

import MessagesList from "../../Components/MessagesList/MessagesList";
import NewMessageForm from "../../Components/NewMessageForm/NewMessageForm";

import "./ChannelMessagesScreen.css";

const ChannelMessagesScreen = () => {
  const { isChannelDetailLoading, channelMessages, onCreateNewMessage } =
    useContext(ChannelDetailContext);

  if (isChannelDetailLoading) {
    return <span>Cargando mensajes...</span>;
  }

  return (
    <div className="channel-messages-screen">
      <MessagesList messages={channelMessages} />

      <NewMessageForm onCreateNewMessage={onCreateNewMessage} />
    </div>
  );
};

export default ChannelMessagesScreen;
