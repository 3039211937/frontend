import React from "react";
import { Route, Routes } from "react-router";
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

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
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
          <Route path="/workspaces/:workspace_id" element={<Workspace />} />
        </Route>
        <Route
          path="/workspaces/:workspaceId/create-channel"
          element={<CreateChannelScreen />}
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
