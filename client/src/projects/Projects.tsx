import { useEffect, useState } from "react";
import agent from "../agent";
import { useAppDispatch, useAppSelector } from "../configureStore";
import { Projects } from "../models/project";
import {  removeProjectAsync, setProjects } from "./projectSlice";



export const ProjectView = () => {
    const dispatch = useAppDispatch();
    const {projects} = useAppSelector(state => state.project);

    async function handleRemoveProject(projectId: number)
    {
        dispatch(removeProjectAsync(projectId))
    }

    useEffect(() => {
        agent.Project.list().then(response => dispatch(setProjects(response)));
    },[dispatch])
    return(
        <div>
            <ul>
                {projects?.map((item, index) => 
                <li key = {index}>{item.name} - {item.description} <button onClick={() => handleRemoveProject(item.id)}>remove</button></li>
                )}
            </ul>


        </div>

    );
};