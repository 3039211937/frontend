import React, { useState } from "react";
import { inviteWorkspaceMember } from "../../services/workspaceService";
import "./InviteMemberModal.css";

const InviteMemberModal = ({ workspace_id, users, onClose }) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [role, setRole] = useState("Member");
  const [loading, setLoading] = useState(false);

  const handleInvite = async () => {
    try {
      setLoading(true);

      await inviteWorkspaceMember(workspace_id, selectedEmail, role);

      alert("Invitación enviada");

      onClose();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="invite-modal-overlay">
      <div className="invite-modal">
        <h2>Invitar usuario</h2>

        <label>Seleccionar usuario</label>
        <select
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="">Seleccionar</option>

          {users.map((user) => (
            <option key={user.email} value={user.email}>
              {user.email}
            </option>
          ))}
        </select>

        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        <div className="invite-actions">
          <button onClick={onClose}>Cancelar</button>

          <button onClick={handleInvite} disabled={!selectedEmail || loading}>
            Invitar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteMemberModal;
