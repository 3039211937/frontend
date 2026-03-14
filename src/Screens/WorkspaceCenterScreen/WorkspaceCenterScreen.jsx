import React from "react";
import { useOutletContext } from "react-router-dom";

const WorkspaceCenterScreen = () => {
  const { workspace, members, member, handleRemoveMember } = useOutletContext();

  return (
    <div className="workspace-header">
      <h1>{workspace.title}</h1>

      {workspace.description && <p>{workspace.description}</p>}

      <p>
        <strong>Creado:</strong>{" "}
        {new Date(workspace.created_at).toLocaleDateString()}
      </p>

      <p>
        <strong>Estado:</strong> {workspace.active ? "Activo" : "Inactivo"}
      </p>

      {member && (
        <p>
          <strong>Tu rol:</strong> {member.role}
        </p>
      )}

      <h3 style={{ marginTop: "20px" }}>Miembros</h3>

      {members.map((member) => (
        <div key={member.member_id}>
          {member.email} ({member.role})
        </div>
      ))}
    </div>
  );
};

export default WorkspaceCenterScreen;
