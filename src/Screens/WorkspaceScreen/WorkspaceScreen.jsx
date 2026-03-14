import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getWorkspaceById,
  inviteWorkspaceMember,
} from "../../services/workspaceService";

import ChannelListContextProvider, {
  ChannelListContext,
} from "../../Context/ChannelListContext";

import SideBar from "../../Components/SideBar/SideBar";

import "./WorkspaceScreen.css";
import "../HomeScreen/HomeScreen.css";

function ChannelListView() {
  const { workspace_id } = useParams();
  const { channelList, isChannelListLoading } = useContext(ChannelListContext);

  if (isChannelListLoading) {
    return (
      <div className="loading-container">
        <span className="loading-text">Cargando canales...</span>
      </div>
    );
  }

  return (
    <>
      <div className="create-workspace-wrapper">
        <Link
          to={`/workspaces/${workspace_id}/create-channel`}
          className="btn-create-small"
        >
          Crear canal
        </Link>
      </div>

      <div className="workspace-list-card">
        {channelList?.length > 0 ? (
          channelList.map((channel) => (
            <div key={channel.channel_id} className="workspace-item">
              <Link
                to={`/channels/${channel.channel_id}`}
                className="workspace-link"
              >
                <div className="workspace-icon">
                  {channel.name.charAt(0).toUpperCase()}
                </div>

                <span className="workspace-name">{channel.name}</span>

                <span className="workspace-arrow">→</span>
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

export default function WorkspaceScreen() {
  const { workspace_id } = useParams();

  const [workspace, setWorkspace] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const response = await getWorkspaceById(workspace_id);

        setWorkspace(response.data.workspace);
        setMember(response.data.member);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkspace();
  }, [workspace_id]);

  const handleInvite = async () => {
    try {
      await inviteWorkspaceMember(workspace_id, inviteEmail, inviteRole);

      alert("Invitación enviada correctamente");

      setInviteEmail("");
      setInviteRole("Member");
      setShowInviteModal(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  if (!workspace) return <span>Workspace no encontrado</span>;

  return (
    <ChannelListContextProvider workspace_id={workspace_id}>
      <div className="workspace-screen">
        <div className="workspace-main">
          <div className="workspace-sidebar">
            <SideBar />
          </div>

          <div className="channel-list">
            <ChannelListView />
          </div>

          <div className="no-messages-container">
            <div className="workspace-header">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1>{workspace.title}</h1>

                <button
                  className="btn-create-small"
                  onClick={() => setShowInviteModal(true)}
                >
                  Invitar usuario
                </button>
              </div>

              {workspace.description && <p>{workspace.description}</p>}

              <p>
                <strong>Creado:</strong>{" "}
                {new Date(workspace.created_at).toLocaleDateString()}
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                {workspace.active ? "Activo" : "Inactivo"}
              </p>

              {member && (
                <p>
                  <strong>Tu rol:</strong> {member.role}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showInviteModal && (
        <div className="invite-modal-overlay">
          <div className="invite-modal">
            <h2>Invitar usuario</h2>

            <label>Email</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="usuario@email.com"
            />

            <label>Rol</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
            >
              <option value="Member">Member</option>
              <option value="Admin">Admin</option>
            </select>

            <div className="invite-actions">
              <button onClick={() => setShowInviteModal(false)}>
                Cancelar
              </button>

              <button onClick={handleInvite} disabled={!inviteEmail}>
                Invitar
              </button>
            </div>
          </div>
        </div>
      )}
    </ChannelListContextProvider>
  );
}
