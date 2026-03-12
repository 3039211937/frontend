import React, { useContext } from 'react'
import { WorkspaceContext } from '../../Context/WorkspaceContext'
import { Link } from 'react-router-dom'




const HomeScreen = () => {
    const {workspace_list_loading, workspace_list_error, workspace_list} = useContext(WorkspaceContext)
    console.log(workspace_list)


    if(workspace_list_loading || !workspace_list) {
        return <span>Loading...</span>
    }

   return (
    <div>
        <h1>Bienvenido nuevamente</h1>

        {workspace_list_error && (
        <span>{workspace_list_error.message}</span>
        )}

        {workspace_list?.data?.workspaces?.length > 0 ? (
        <div>
            {workspace_list.data.workspaces.map((workspace) => (
            <div key={workspace.workspace_id}>
                <Link to={`/workspaces/${workspace.workspace_id}`}>
                {workspace.workspace_title}
                </Link>
            </div>
            ))}
        </div>
        ) : (
        <span>No tienes workspaces</span>
        )}

        <div style={{ marginTop: "20px" }}>
        <Link to="/create-workspace">+ Crear nuevo workspace</Link>
        </div>
    </div>
    );
}

export default HomeScreen