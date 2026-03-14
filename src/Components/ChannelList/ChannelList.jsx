import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ChannelListContext } from "../../Context/ChannelListContext";
import "./Channel-styles.css";

const ChannelList = () => {
  const { workspace_id, channel_id } = useParams();
  const { channelList, isChannelListLoading } = useContext(ChannelListContext);

  if (isChannelListLoading) {
    return <span>Cargando</span>;
  }

  return (
    <div>
      {!channelList || channelList.length === 0 ? (
        <div className="channel-empty">
          <span className="channel-empty-text">
            No hay canales en este workspace
          </span>
        </div>
      ) : (
        channelList.map((channel) => (
          <ChannelItem
            key={channel._id}
            channel={channel}
            workspace_id={workspace_id}
            current_channel_id={channel_id}
          />
        ))
      )}
    </div>
  );
};

const ChannelItem = ({ channel, workspace_id, current_channel_id }) => {
  const isSelected = channel._id === current_channel_id;

  return (
    <Link to={`/workspaces/${workspace_id}/channels/${channel._id}`}>
      <div className={`channel-item ${isSelected ? "channel-selected" : ""}`}>
        <div className="channel-item__icon">
          {channel.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="channel-item__name">{channel.name}</h2>
      </div>
    </Link>
  );
};

export default ChannelList;
