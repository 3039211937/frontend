import { createContext, useEffect, useState } from "react";
import { getWorkspaceChannels } from "../services/channelService";

export const ChannelListContext = createContext({
  channelList: [],
  isChannelListLoading: false,
  reloadChannels: () => {},
});

const ChannelListContextProvider = ({ children, workspace_id }) => {
  const [channelList, setChannelList] = useState([]);
  const [isChannelListLoading, setIsChannelListLoading] = useState(false);

  const loadChannelList = async () => {
    try {
      setIsChannelListLoading(true);

      const response = await getWorkspaceChannels(workspace_id);

      setChannelList(response.data.channels || []);
    } catch (error) {
      console.error("Error loading channels:", error);
      setChannelList([]);
    } finally {
      setIsChannelListLoading(false);
    }
  };

  useEffect(() => {
    if (workspace_id) {
      loadChannelList();
    }
  }, [workspace_id]);

  return (
    <ChannelListContext.Provider
      value={{
        channelList,
        isChannelListLoading,
        reloadChannels: loadChannelList,
      }}
    >
      {children}
    </ChannelListContext.Provider>
  );
};

export default ChannelListContextProvider;
