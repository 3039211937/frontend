import React from "react";
import { useParams } from "react-router";

export default function WorkspaceScreen() {
  const { workspace_id } = useParams();

  return (
    <div>
      <h1>Workspace {workspace_id}</h1>
    </div>
  );
}