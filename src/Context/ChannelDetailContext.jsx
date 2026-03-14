import { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router";
import { getChannelById } from "../services/channelService";

export const ChannelDetailContext = createContext({
  isChannelDetailLoading: false,
  ChannelDetailed: null,
  onCreateNewMessage: (new_message) => {},
});

const ChannelDetailContextProvider = (props) => {
  const [isChannelDetailLoading, setIsChannelDetailLoading] = useState(false);
  const [ChannelDetailed, setChannelDetailed] = useState(null);

  const { id_Channelo } = useParams();

  function loadChannelById(Channel_id) {
    setIsChannelDetailLoading(true);
    setTimeout(() => {
      const Channel = getChannelById(Channel_id);
      setChannelDetailed(Channel);
      setIsChannelDetailLoading(false);
    }, 500);
  }

  useEffect(() => {
    loadChannelById(id_Channelo);
  }, [id_Channelo]);

  const onCreateNewMessage = (new_message) => {
    const new_message_object = {
      content: new_message,
      author: "YO",
      timestamp: "19:00",
      id: ChannelDetailed.messages.length + 1,
    };
    const messages_cloned = [...ChannelDetailed.messages];
    messages_cloned.push(new_message_object);
    setChannelDetailed({ ...ChannelDetailed, messages: messages_cloned });
  };

  return (
    <ChannelDetailContext.Provider
      value={{
        isChannelDetailLoading: isChannelDetailLoading,
        ChannelDetailed: ChannelDetailed,
        onCreateNewMessage: onCreateNewMessage,
      }}
    >
      <Outlet />
    </ChannelDetailContext.Provider>
  );
};

export default ChannelDetailContextProvider;
