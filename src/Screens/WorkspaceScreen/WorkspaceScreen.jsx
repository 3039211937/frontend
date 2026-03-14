import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FiTrash2 } from "react-icons/fi";

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
            <div key={channel._id} className="workspace-item">
              <Link
                to={`/workspaces/${workspace_id}/channels/${channel._id}`}
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
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

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

  /* =========================
     REMOVE MEMBER
  ========================= */

  const handleRemoveMember = async (member_id, email) => {
    const confirm = await Swal.fire({
      title: "Eliminar miembro",
      text: `¿Eliminar a ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e01e5a",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Eliminar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await removeWorkspaceMember(workspace_id, member_id);

      setMembers((prev) => prev.filter((m) => m.member_id !== member_id));

      Swal.fire("Miembro eliminado", "", "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  /* =========================
     INVITE MEMBER
  ========================= */

  const handleInvite = async () => {
    try {
      await inviteWorkspaceMember(workspace_id, inviteEmail, inviteRole);

      Swal.fire("Invitación enviada");

      setInviteEmail("");
      setInviteRole("Member");
      setShowInviteModal(false);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

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

              {/* =========================
                 MEMBERS LIST
              ========================= */}

              <h3 style={{ marginTop: "20px" }}>Miembros</h3>

              <div className="workspace-list-card">
                {members.length > 0 ? (
                  members.map((member) => (
                    <div key={member.member_id} className="workspace-item">
                      <div className="workspace-link">
                        <div className="workspace-icon">
                          {member.email.charAt(0).toUpperCase()}
                        </div>
                        <span className="workspace-name">{member.email}</span>
                        {/* ROLE BADGE */}
                        <span
                          style={{
                            marginRight: "12px",
                            fontSize: "13px",
                            color: "#666",
                          }}
                        >
                          {member.role}
                        </span>
                        {/* DELETE BUTTON */}
                        <div className="workspace-actions">
                          {member.role !== "Owner" && (
                            <button
                              className="icon-btn delete"
                              title="Eliminar miembro"
                              onClick={() =>
                                handleRemoveMember(
                                  member.member_id,
                                  member.email,
                                )
                              }
                            >
                              <FiTrash2 />
                            </button>
                          )}
                        </div>{" "}
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="empty-message">
                    No hay miembros en este workspace
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
         INVITE MODAL
      ========================= */}

      {showInviteModal && (
        <div className="invite-modal-overlay">
          <div className="invite-modal">
            <h2>Invitar usuario</h2>

            <label>Email</label>

            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
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
