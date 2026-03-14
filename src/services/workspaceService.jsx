import { ServerError } from "../utils/errorUtils";

const URL_API = import.meta.env.VITE_API_URL;

/* =========================
   GET WORKSPACE LIST
========================= */

export async function getWorkspaceList() {
  const response_http = await fetch(URL_API + "/api/workspace", {
    method: "GET",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  });

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   CREATE WORKSPACE
========================= */

export async function createWorkspace(workspace_data) {
  const response_http = await fetch(URL_API + "/api/workspace", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
    body: JSON.stringify(workspace_data),
  });

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   GET WORKSPACE BY ID
========================= */

export async function getWorkspaceById(workspace_id) {
  const response_http = await fetch(
    URL_API + "/api/workspace/" + workspace_id,
    {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   DELETE WORKSPACE
========================= */

export async function deleteWorkspace(workspace_id) {
  const response_http = await fetch(
    URL_API + "/api/workspace/" + workspace_id,
    {
      method: "DELETE",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   UPDATE WORKSPACE
========================= */

export async function updateWorkspace(workspace_id, workspace_data) {
  const response_http = await fetch(
    URL_API + "/api/workspace/" + workspace_id,
    {
      method: "PUT",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
      body: JSON.stringify(workspace_data),
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   INVITE MEMBER
========================= */

export async function inviteWorkspaceMember(workspace_id, email, role) {
  const response_http = await fetch(
    URL_API + `/api/workspace/${workspace_id}/members`,
    {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
      body: JSON.stringify({
        email,
        role,
      }),
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   GET WORKSPACE MEMBERS
========================= */

export async function getWorkspaceMembers(workspace_id) {
  const response_http = await fetch(
    URL_API + `/api/workspace/${workspace_id}/members`,
    {
      method: "GET",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/* =========================
   REMOVE WORKSPACE MEMBER
========================= */

export async function removeWorkspaceMember(workspace_id, member_id) {
  const response_http = await fetch(
    URL_API + `/api/workspace/${workspace_id}/members/${member_id}`,
    {
      method: "DELETE",
      headers: {
        "x-api-key": import.meta.env.VITE_API_KEY,
        Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
      },
    },
  );

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}
