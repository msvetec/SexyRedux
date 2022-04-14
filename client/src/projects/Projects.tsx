import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../configureStore";
import ProjectDetails from "./ProjectDetails";
import { fetchProjectsAsync, projectSelectors, removeProjectAsync } from "./projectSliceSexy";



export const ProjectView = () => {
    const dispatch = useAppDispatch();
    const projects = useAppSelector(projectSelectors.selectAll) //selectById,selectEntity,selectIds,selectTotal
    const {projectLoaded, status} = useAppSelector(state => state.projectSexy)
    const [details,setDetails] = useState(false);
    const [projectId, setProjectId] = useState(Number);
    async function handleRemoveProject(projectId: number)
    {
        dispatch(removeProjectAsync(projectId))
    }

    useEffect(() => {
        if(!projectLoaded) dispatch(fetchProjectsAsync());
    },[projectLoaded,dispatch])
// 
    if(status.includes("pending")) console.log("Loading projects");
    return(
        <div>
            <ul>
                {projects?.map((item, index) => 
                <li key = {index}>{item.name} - {item.description} 
                <button onClick={() => handleRemoveProject(item.id)}>remove</button> 
                <button onClick={() => (setDetails(true), setProjectId(item.id))}>details</button></li>
                )}
            </ul>

            {details === true && <ProjectDetails projectId={projectId}/>}
        </div>

    );
};