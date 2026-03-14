import React, { useContext, useState, useEffect } from "react";
import { WorkspaceContext } from "../../Context/WorkspaceContext";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut, FiEdit2, FiTrash2, FiArrowRight } from "react-icons/fi";
import { logout } from "../../services/authService";
import { deleteWorkspace } from "../../services/workspaceService";
import Swal from "sweetalert2";
import "./HomeScreen.css";

const HomeScreen = () => {
  const navigate = useNavigate();

  const { workspace_list_loading, workspace_list_error, workspace_list } =
    useContext(WorkspaceContext);

  const [workspaces, setWorkspaces] = useState([]);

  /* cargar workspaces del contexto en estado local */

  useEffect(() => {
    if (workspace_list?.data?.workspaces) {
      setWorkspaces(workspace_list.data.workspaces);
    }
  }, [workspace_list]);

  /* =========================
     DELETE WORKSPACE
  ========================= */

  const handleDeleteWorkspace = async (workspace_id, workspace_title, e) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await Swal.fire({
      title: "Eliminar workspace",
      text: `¿Seguro que deseas eliminar "${workspace_title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e01e5a",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteWorkspace(workspace_id);

      /* eliminar workspace del estado local */

      setWorkspaces((prev) =>
        prev.filter((w) => w.workspace_id !== workspace_id),
      );

      await Swal.fire({
        title: "Workspace eliminado",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Cerrar sesión",
      text: "¿Seguro que deseas salir?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e01e5a",
      cancelButtonColor: "#6c757d",
    });

    if (!result.isConfirmed) return;

    try {
      await logout();
    } catch (error) {
      console.error("Logout API failed:", error);
    }

    localStorage.removeItem("auth_token");
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
        {workspaces.length > 0 ? (
          workspaces.map((workspace) => (
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

                <div className="workspace-actions">
                  <button
                    className="icon-btn edit"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      navigate(`/workspaces/${workspace.workspace_id}/edit`);
                    }}
                  >
                    <FiEdit2 />
                  </button>

                  <button
                    className="icon-btn delete"
                    onClick={(e) =>
                      handleDeleteWorkspace(
                        workspace.workspace_id,
                        workspace.workspace_title,
                        e,
                      )
                    }
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <span className="workspace-arrow">
                  <FiArrowRight />
                </span>
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
