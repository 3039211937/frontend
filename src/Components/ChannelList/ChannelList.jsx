import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ChannelListContext } from "../../Context/ChannelListContext";
import "./Channel-styles.css";

const ChannelList = () => {
  const { workspace_id } = useParams();

  const { channelList, isChannelListLoading } = useContext(ChannelListContext);

  if (isChannelListLoading) {
    return <span>Cargando</span>;
  }

  if (!channelList || channelList.length === 0) {
    return (
      <div className="channel-empty">
        <span className="channel-empty-text">
          No hay canales en este workspace
        </span>

        <Link
          to={`/workspaces/${workspace_id}/create-channel`}
          className="btn-create-channel"
        >
          Crear canal
        </Link>
      </div>
    );
  }

  return (
    <div>
      {channelList.map((channel) => (
        <ChannelItem channel={channel} key={channel.id} />
      ))}
    </div>
  );
};

const ChannelItem = ({ channel }) => {
  return (
    <Link to={`/channels/${channel.id}`}>
      <div className="channel-item">
        <img src={channel.profile_img} className="channel-item__img" alt="" />
        <h2 className="channel-item__name">{channel.name}</h2>
      </div>
    </Link>
  );
};

export default ChannelList;
