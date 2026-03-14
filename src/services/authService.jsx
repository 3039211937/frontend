/*
En estos archivos buscamos centralizar la configuracion y llamada a servicios externos de nuestro frontend

Ejemplos:
- API interna
- API externa
- Librerías que requieran configuración
*/

import { ServerError } from "../utils/errorUtils";

/*
fetch permite hacer peticiones HTTP a un servidor.

Se usa principalmente para comunicarse con el backend.

fetch recibe:
1) URL
2) objeto de configuración
*/

const URL_API = import.meta.env.VITE_API_URL;

/*
=========================
LOGIN
=========================
*/

export async function login(email, password) {
  const response_http = await fetch(URL_API + "/api/auth/login", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  });

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/*
=========================
REGISTER
=========================
*/

export async function register(username, password, email) {
  const response_http = await fetch(URL_API + "/api/auth/register", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      email: email,
    }),
  });

  const response = await response_http.json();

  if (!response.ok) {
    throw new ServerError(response.message, response.status);
  }

  return response;
}

/*
=========================
LOGOUT
=========================

El backend invalida la sesión (si aplica)
El frontend elimina el token.

También manejamos el caso donde el servidor
devuelve HTML en lugar de JSON para evitar
el error "Unexpected token <"
*/

export async function logout() {
  const response_http = await fetch(URL_API + "/api/auth/logout", {
    method: "POST",
    headers: {
      "x-api-key": import.meta.env.VITE_API_KEY,
      Authorization: "Bearer " + sessionStorage.getItem("auth_token"),
    },
  });

  const contentType = response_http.headers.get("content-type");

  let response = null;

  /* Solo parseamos JSON si el servidor devolvió JSON */
  if (contentType && contentType.includes("application/json")) {
    response = await response_http.json();
  }

  if (!response_http.ok) {
    throw new ServerError(
      response?.message || "Error cerrando sesión",
      response?.status || response_http.status,
    );
  }

  /* Eliminamos el token del cliente */
  sessionStorage.removeItem("auth_token");

  return response;
}

/*
Ejemplo de respuesta esperada del backend:

{
  "message": "Usuario creado exitosamente",
  "status": 201,
  "ok": true,
  "data": null
}
*/
