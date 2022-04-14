import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../configureStore";
import { fetchProjectAsync, projectSelectors } from "./projectSliceSexy";

interface Props {
    projectId: number;
}
export default function ProjectDetails({
    projectId
} :Props) {
    const dispatch = useAppDispatch();
    const project = useAppSelector(state => projectSelectors.selectById(state, projectId)); //FETCH FROM REDUX STATE
    console.log("test details");

    useEffect(() => {
        if(!project) dispatch(fetchProjectAsync(projectId)); //IF PROJECT DONT EXISTS IN REDUX STATE CALL API!!!!
    }, [dispatch,project])

    return (
        <div>
            <p>{project?.name}</p>
            <p>{project?.description}</p>
        </div>
    );

}