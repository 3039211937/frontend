import React, { useContext } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { logout } from "../../services/authService";
import "./HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  const { workspace_list_loading, workspace_list_error, workspace_list } =
    useContext(WorkspaceContext);

  const handleLogout = async () => {
    try {
      // Call backend logout (optional but good practice)
      await logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    // Always clear local session
    localStorage.removeItem("auth_token");

    // Redirect to login
    navigate("/login", { replace: true });
  };

  if (workspace_list_loading || !workspace_list) {
    return (
      <div className="loading-container">
        <span className="loading-text">Cargando tus espacios...</span>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido nuevamente</h1>

      <p className="home-subtitle">
        Elige un espacio de trabajo para volver a comunicarte con tu equipo.
      </p>

      {workspace_list_error && (
        <div className="error-container">
          <span>{workspace_list_error.message}</span>
        </div>
      )}

      <div className="workspace-list-card">
        {workspace_list?.data?.workspaces?.length > 0 ? (
          workspace_list.data.workspaces.map((workspace) => (
            <div key={workspace.workspace_id} className="workspace-item">
              <Link
                to={`/workspaces/${workspace.workspace_id}`}
                className="workspace-link"
              >
                <div className="workspace-icon">
                  {workspace.workspace_title.charAt(0).toUpperCase()}
                </div>

                <span className="workspace-name">
                  {workspace.workspace_title}
                </span>

                <span className="workspace-arrow">→</span>
              </Link>
            </div>
          ))
        ) : (
          <span className="empty-message">No tienes workspaces activos</span>
        )}
      </div>

      <div className="home-actions">
        <Link to="/create-workspace" className="btn-create-small">
          Crear nuevo workspace
        </Link>

        <button className="btn-logout" onClick={handleLogout}>
          <FiLogOut />
          Salir
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
