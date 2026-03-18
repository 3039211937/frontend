import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTrash2, FiArrowRight } from "react-icons/fi";

import {
  getWorkspaceById,
  inviteWorkspaceMember,
  getWorkspaceMembers,
  removeWorkspaceMember,
} from "../../services/workspaceService";

import ChannelListContextProvider, {
  ChannelListContext,
} from "../../Context/ChannelListContext";

import SideBar from "../../Components/SideBar/SideBar";

import "./WorkspaceScreen.css";
import "../HomeScreen/HomeScreen.css";

/* =========================
   LISTA DE CANALES
========================= */

function ChannelListView({ isChannelSelected }) {
  const { workspace_id } = useParams();

  const { channelList, isChannelListLoading, reloadChannels } =
    useContext(ChannelListContext);

  const handleDeleteChannel = async (e, channel) => {
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
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/workspace/${workspace_id}/channels/${channel._id}`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
          },
        },
      );

      await reloadChannels();

      Swal.fire("Canal eliminado", "", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error eliminando canal", "", "error");
    }
  };

  if (isChannelListLoading) {
    return <span>Cargando canales...</span>;
  }

  return (
    <>
      <div className="create-workspace-wrapper">
        {isChannelSelected ? (
          <Link to={`/workspaces/${workspace_id}`} className="btn-create-small">
            ← Volver al workspace
          </Link>
        ) : (
          <Link
            to={`/workspaces/${workspace_id}/create-channel`}
            className="btn-create-small"
          >
            Crear canal
          </Link>
        )}
      </div>

      <div className="workspace-list-card">
        {channelList?.length > 0 ? (
          channelList.map((channel) => (
            <div key={channel._id} className="workspace-item">
              <Link
                to={`/workspaces/${workspace_id}/channels/${channel._id}`}
                className="workspace-link"
              >
                {/* ICON */}
                <div className="workspace-icon">
                  {channel.name.charAt(0).toUpperCase()}
                </div>

                {/* TEXT */}
                <div className="workspace-text">
                  <span className="workspace-name">{channel.name}</span>
                </div>

                {/* ACTIONS */}
                <div className="workspace-actions">
                  <button
                    className="icon-btn delete"
                    onClick={(e) => handleDeleteChannel(e, channel)}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                {/* ARROW */}
                <span className="workspace-arrow">
                  <FiArrowRight />
                </span>
              </Link>
            </div>
          ))
        ) : (
          <span className="empty-message">
            No hay canales en este workspace
          </span>
        )}
      </div>
    </>
  );
}

/* =========================
   WORKSPACE SCREEN
========================= */

export default function WorkspaceScreen() {
  const { workspace_id } = useParams();
  const location = useLocation();

  const [workspace, setWorkspace] = useState(null);
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const isChannelSelected = location.pathname.includes("/channels/");
  const isCreateChannel = location.pathname.includes("/create-channel");

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const response = await getWorkspaceById(workspace_id);
        const membersResponse = await getWorkspaceMembers(workspace_id);

        setWorkspace(response.data.workspace);
        setMember(response.data.member);
        setMembers(membersResponse.data.members);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspace_id]);

  if (loading) return <span>Loading...</span>;
  if (!workspace) return <span>Workspace no encontrado</span>;

  return (
    <ChannelListContextProvider workspace_id={workspace_id}>
      <div className="workspace-screen">
        <div className="workspace-main">
          <div className="workspace-sidebar">
            <SideBar />
          </div>

          <div className="channel-list">
            <ChannelListView isChannelSelected={isChannelSelected} />
          </div>

          <div className="workspace-center">
            {isChannelSelected || isCreateChannel ? (
              <Outlet />
            ) : (
              <h1>{workspace.title}</h1>
            )}
          </div>
        </div>
      </div>
    </ChannelListContextProvider>
  );
}
