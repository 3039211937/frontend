import React from "react";
import { Link } from "react-router-dom";
import useCreateWorkspace from "../../hooks/useCreateWorkspace";
import "./CreateWorkspaceScreen.css";

const CreateWorkspaceScreen = () => {
  const {
    form_state,
    onChangeFieldValue,
    onSubmitForm,
    isLoading,
    error,
    errors,
  } = useCreateWorkspace();

  return (
    <div className="create-container">
      <h1 className="create-title">Crear workspace</h1>

      <p className="create-subtitle">
        Los espacios de trabajo son donde tu equipo se comunica.
      </p>

      <div className="create-card">
        <form className="create-form" onSubmit={onSubmitForm}>
          {/* TITLE */}
          <div className="form-group">
            <label className="form-label">Nombre del workspace</label>

            <input
              type="text"
              name="title"
              className="form-input"
              placeholder="Ej. Proyecto Alpha"
              value={form_state.title}
              onChange={onChangeFieldValue}
              disabled={isLoading}
            />

            {errors.title && (
              <span className="error-text">⚠️ {errors.title}</span>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="form-group">
            <label className="form-label">Descripción</label>

            <textarea
              name="description"
              className="form-textarea"
              placeholder="¿De qué trata este espacio?"
              value={form_state.description}
              onChange={onChangeFieldValue}
              disabled={isLoading}
            />

            <div
              className={`char-counter ${
                form_state.description.length > 900 ? "warn" : ""
              } ${form_state.description.length >= 1000 ? "error" : ""}`}
            >
              {form_state.description.length} / 1000
            </div>

            {errors.description && (
              <span className="error-text">⚠️ {errors.description}</span>
            )}
          </div>

          {/* GLOBAL ERROR */}
          {error && <div className="error-box">Error: {error.message}</div>}

          {/* ACTIONS */}
          <div className="form-actions">
            <Link to="/home" className="btn-secondary">
              Cancelar
            </Link>

            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || form_state.description.length > 1000}
            >
              {isLoading ? "Creando..." : "Crear workspace"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateWorkspaceScreen;
