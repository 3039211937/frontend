import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createChannel } from "../../services/channelService";
import { ChannelListContext } from "../../Context/ChannelListContext";

import "./CreateChannelScreen.css";

export default function CreateChannelScreen() {
  const { workspace_id } = useParams();
  const navigate = useNavigate();

  const { reloadChannels } = useContext(ChannelListContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("El nombre del canal es obligatorio");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await createChannel(workspace_id, {
        name,
        description,
      });

      /* REFRESH CHANNEL LIST */
      await reloadChannels();

      navigate(`/workspaces/${workspace_id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error creando el canal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-channel-container">
      <div className="create-channel-card">
        <h1>Crear nuevo canal</h1>

        <p className="create-channel-subtitle">
          Los canales ayudan a organizar conversaciones dentro del workspace.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Nombre del canal</label>

          <input
            type="text"
            placeholder="ej: general"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Descripción (opcional)</label>

          <textarea
            placeholder="Describe el propósito del canal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {error && <div className="create-channel-error">{error}</div>}

          <div className="create-channel-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate(`/workspaces/${workspace_id}`)}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-create" disabled={loading}>
              {loading ? "Creando..." : "Crear canal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
