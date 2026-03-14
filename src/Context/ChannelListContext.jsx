import { createContext, useEffect, useState } from "react";
import { getWorkspaceChannels } from "../services/channelService";

export const ChannelListContext = createContext({
  ChannelList: [],
  isChannelListLoading: false,
});

const ChannelListContextProvider = (props) => {
  const [ChannelList, setChannelList] = useState([]);
  const [isChannelListLoading, setIsChannelListLoading] = useState(false);

  const loadChannelList = () => {
    setIsChannelListLoading(true);

    setTimeout(() => {
      const Channel_list_response = getWorkspaceChannels();
      setChannelList(Channel_list_response);
      setIsChannelListLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadChannelList();
  }, []);

  return (
    <ChannelListContext.Provider
      value={{
        ChannelList: ChannelList,
        isChannelListLoading: isChannelListLoading,
      }}
    >
      {props.children}
    </ChannelListContext.Provider>
  );
};

export default ChannelListContextProvider;
