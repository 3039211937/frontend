import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";

import { ChannelListContext } from "../../Context/ChannelListContext";
import { deleteChannel } from "../../services/channelService";

import "./Channel-styles.css";

const ChannelList = () => {
  const { workspace_id, channel_id } = useParams();

  const { channelList, isChannelListLoading, reloadChannels } =
    useContext(ChannelListContext);

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
            reloadChannels={reloadChannels}
          />
        ))
      )}
    </div>
  );
};

const ChannelItem = ({
  channel,
  workspace_id,
  current_channel_id,
  reloadChannels,
}) => {
  const isSelected = channel._id === current_channel_id;

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const confirm = await Swal.fire({
      title: "Eliminar canal",
      text: `¿Eliminar el canal "${channel.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e01e5a",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await deleteChannel(workspace_id, channel._id);

      await reloadChannels();

      Swal.fire("Canal eliminado", "", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Link to={`/workspaces/${workspace_id}/channels/${channel._id}`}>
      <div className={`channel-item ${isSelected ? "channel-selected" : ""}`}>
        <div className="channel-item__icon">
          {channel.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="channel-item__name">{channel.name}</h2>

        <button className="channel-delete-btn" onClick={handleDelete}>
          <FiTrash2 />
        </button>
      </div>
    </Link>
  );
};

export default ChannelList;
