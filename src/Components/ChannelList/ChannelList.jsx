import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ChannelListContext } from "../../Context/ChannelListContext";
import "./Channel-styles.css";

const ChannelList = () => {
  const { channelList, isChannelListLoading } = useContext(ChannelListContext);

  if (isChannelListLoading) {
    return <span>Cargando</span>;
  }

  if (!channelList || channelList.length === 0) {
    return <span>No channels</span>;
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
    <Link to={`/channel/${channel.id}`}>
      <div className="channel-item">
        <img
          src={channel.profile_img}
          className="channel-item__img"
          alt={channel.name}
        />
        <h2 className="channel-item__name">{channel.name}</h2>
      </div>
    </Link>
  );
};

export default ChannelList;
