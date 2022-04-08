import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../agent";
import { Projects } from "../models/project";

interface ProjectState {
    projects: Projects[] | null
    status: string;
}

const initialState: ProjectState = {
    projects: null,
    status: "idle" //loading control
}

export const fetchProjectsAsync = createAsyncThunk<Projects[]>(
    "project/fetchProjectsAsync",
    async(_, thunkAPI) => {
        try {
            return await agent.Project.list();
        }catch(err:any)
        {
            return  thunkAPI.rejectWithValue({error: err.data})
        }
    }

);
export const removeProjectAsync = createAsyncThunk(
    "project/removeProjectAsync",
    async(projectId: number,thunkAPI) => {
        try {
            return await agent.Project.delete(projectId);
        }
        catch (err: any) {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }

);
export const projectSlice = createSlice({
    name:"project",
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        }
    },
    extraReducers:(builder =>{
        builder.addCase(removeProjectAsync.pending,(state, action) => {
            state.status = "pendingRemoveItem" + action.meta.arg;
        });
        builder.addCase(removeProjectAsync.fulfilled, (state,action) => {
            const projectId = action.meta.arg;
            const itemIndex = state.projects?.findIndex(i => i.id === projectId);
            if(itemIndex === -1 ||itemIndex === undefined) return;
            state.projects?.splice(itemIndex,1);
            state.status = "idle";
        });
        builder.addCase(removeProjectAsync.rejected, (state,action) =>{

            state.status = "idle";
        })
    })
});

export const {setProjects} = projectSlice.actions;