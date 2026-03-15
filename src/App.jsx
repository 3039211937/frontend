import React from "react";
import { Route, Routes } from "react-router-dom";

/* =========================
   PANTALLAS PUBLICAS
========================= */

import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import AcceptInvitationScreen from "./Screens/AcceptInvitationScreen/AcceptInvitationScreen";

/* =========================
   CONTEXTOS Y MIDDLEWARE
========================= */

import AuthContextProvider from "./Context/AuthContext";
import AuthMiddleware from "./Middlewares/AuthMiddleware";
import WorkspaceContextProvider from "./Context/WorkspaceContext";

/* =========================
   PANTALLAS PRINCIPALES
========================= */

import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import WorkspaceList from "./Screens/WorkspaceListScreen/WorkspaceListScreen";
import Workspace from "./Screens/WorkspaceScreen/WorkspaceScreen";
import CreateWorkspaceScreen from "./Screens/CreateWorkspaceScreen/CreateWorkspaceScreen";
import CreateChannelScreen from "./Screens/CreateChannelScreen/CreateChannelScreen";

/* =========================
   CHAT DEL CANAL
========================= */

import ChannelDetailContextProvider from "./Context/ChannelDetailContext";
import ChannelMessagesScreen from "./Screens/ChannelMessagesScreen/ChannelMessagesScreen";

/* =========================
   PANTALLA CENTRAL WORKSPACE
========================= */

import WorkspaceCenterScreen from "./Screens/WorkspaceCenterScreen/WorkspaceCenterScreen";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* =========================
            RUTAS PUBLICAS
        ========================= */}

        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/accept-invitation" element={<AcceptInvitationScreen />} />

        {/* =========================
            RUTAS PRIVADAS
        ========================= */}

        <Route element={<AuthMiddleware />}>
          {/* HOME */}

          <Route
            path="/home"
            element={
              <WorkspaceContextProvider>
                <HomeScreen />
              </WorkspaceContextProvider>
            }
          />

          {/* CREAR WORKSPACE */}

          <Route path="/create-workspace" element={<CreateWorkspaceScreen />} />

          {/* LISTA DE WORKSPACES */}

          <Route path="/workspaces" element={<WorkspaceList />} />

          {/* =========================
              WORKSPACE
          ========================= */}

          <Route path="/workspaces/:workspace_id" element={<Workspace />}>
            {/* WORKSPACE HOME */}

            <Route index element={<WorkspaceCenterScreen />} />

            {/* CREATE CHANNEL */}

            <Route path="create-channel" element={<CreateChannelScreen />} />

            {/* =========================
                CHANNEL CHAT
            ========================= */}

            <Route
              path="channels/:channel_id"
              element={<ChannelDetailContextProvider />}
            >
              <Route index element={<ChannelMessagesScreen />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
