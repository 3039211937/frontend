import { ServerError } from "../utils/errorUtils";

const URL_API = import.meta.env.VITE_API_URL;

/* =========================
   OBTENER CANALES DEL WORKSPACE
========================= */

export async function getWorkspaceChannels(workspace_id) {
  const response_http = await fetch(
    `${URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response_http.ok) {
    throw new ServerError(response.message, response_http.status);
  }

  return response;
}

/* =========================
   OBTENER MENSAJES DEL CANAL
========================= */

export async function getChannelMessages(workspace_id, channel_id) {
  const response_http = await fetch(
    `${URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
    {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response_http.ok) {
    throw new ServerError(response.message, response_http.status);
  }

  return response;
}

/* =========================
   ENVIAR MENSAJE
========================= */

export async function sendChannelMessage(workspace_id, channel_id, mensaje) {
  const response_http = await fetch(
    `${URL_API}/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
    {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
      body: JSON.stringify({ mensaje }),
    },
  );

  const response = await response_http.json();

  if (!response_http.ok) {
    throw new ServerError(response.message, response_http.status);
  }

  return response;
}

/* =========================
   CREAR CANAL
========================= */

export async function createChannel(workspace_id, body) {
  const response_http = await fetch(
    `${URL_API}/api/workspace/${workspace_id}/channels`,
    {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
      body: JSON.stringify(body),
    },
  );

  const response = await response_http.json();

  if (!response_http.ok) {
    throw new ServerError(response.message, response_http.status);
  }

  return response;
}

/* =========================
   ELIMINAR CANAL
========================= */

export async function deleteChannel(workspace_id, channel_id) {
  const response_http = await fetch(
    `${URL_API}/api/workspace/${workspace_id}/channels/${channel_id}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response_http.ok) {
    throw new ServerError(response.message, response_http.status);
  }

  return response;
}
