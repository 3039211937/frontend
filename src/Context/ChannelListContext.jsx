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
    /* PROTECTION: prevent invalid requests */
    if (!workspace_id || workspace_id === "undefined") {
      return;
    }

    try {
      setIsChannelListLoading(true);

      const response = await getWorkspaceChannels(workspace_id);

      const channels = response?.data?.channels || [];

      setChannelList(channels);
    } catch (error) {
      console.error("Error loading channels:", error);

      setChannelList([]);
    } finally {
      setIsChannelListLoading(false);
    }
  };

  useEffect(() => {
    /* PROTECTION: ensure valid workspace_id */
    if (!workspace_id || workspace_id === "undefined") {
      return;
    }

    loadChannelList();
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
