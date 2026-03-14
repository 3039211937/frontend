import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getWorkspaceById } from "../../services/workspaceService";
import ContactListContextProvider from "../../Context/ContactListContext";

import ContactList from "../../Components/ContactList/ContactList";
import ContactListHeader from "../../Components/ContactListHeader/ContactListHeader";
import SideBar from "../../Components/SideBar/SideBar";

import "./WorkspaceScreen.css";

export default function WorkspaceScreen() {
  const { workspace_id } = useParams();

  const [workspace, setWorkspace] = useState(null);
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <span>Loading...</span>;
  if (error) return <span>{error}</span>;
  if (!workspace) return <span>Workspace no encontrado</span>;

  return (
    <ContactListContextProvider>
      <div className="workspace-screen">
        <div className="workspace-main">
          <div className="workspace-sidebar">
            <SideBar />
          </div>

          <div className="contact-list">
            <ContactListHeader title={workspace.title} />
            <ContactList />
          </div>

          <div className="no-messages-container">
            <div className="workspace-header">
              <h1>{workspace.title}</h1>

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
    </ContactListContextProvider>
  );
}
