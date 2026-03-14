import React from "react";
import { Route, Routes } from "react-router-dom";

import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";

import AuthContextProvider from "./Context/AuthContext";
import AuthMiddleware from "./Middlewares/AuthMiddleware";

import WorkspaceContextProvider from "./Context/WorkspaceContext";

import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import CreateWorkspaceScreen from "./Screens/CreateWorkspaceScreen/CreateWorkspaceScreen";
import WorkspaceList from "./Screens/WorkspaceListScreen/WorkspaceListScreen";
import Workspace from "./Screens/WorkspaceScreen/WorkspaceScreen";
import CreateChannelScreen from "./Screens/CreateChannelScreen/CreateChannelScreen";
import AcceptInvitationScreen from "./Screens/AcceptInvitationScreen/AcceptInvitationScreen";

import ChannelDetailContextProvider from "./Context/ChannelDetailContext";
import ChannelMessagesScreen from "./Screens/ChannelMessagesScreen/ChannelMessagesScreen";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        {/* PUBLIC ROUTES */}

        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* ACCEPT INVITATION */}

        <Route path="/accept-invitation" element={<AcceptInvitationScreen />} />

        {/* PRIVATE ROUTES */}

        <Route element={<AuthMiddleware />}>
          <Route
            path="/home"
            element={
              <WorkspaceContextProvider>
                <HomeScreen />
              </WorkspaceContextProvider>
            }
          />

          <Route path="/create-workspace" element={<CreateWorkspaceScreen />} />

          <Route path="/workspaces" element={<WorkspaceList />} />

          {/* WORKSPACE */}

          <Route path="/workspaces/:workspace_id" element={<Workspace />} />

          {/* CREATE CHANNEL */}

          <Route
            path="/workspaces/:workspace_id/create-channel"
            element={<CreateChannelScreen />}
          />

          {/* CHANNEL MESSAGES */}

          <Route
            path="/workspaces/:workspace_id/channels/:channel_id"
            element={<ChannelDetailContextProvider />}
          >
            <Route index element={<ChannelMessagesScreen />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
