import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../agent";
import { RootState } from "../configureStore";
import { Projects } from "../models/project";

const projectsAdapter = createEntityAdapter<Projects>();

export const fetchProjectsAsync = createAsyncThunk<Projects[]> (
    'projects/fetchProductsAsync',
     async (_,thunkAPI) => {
        try {
            return await agent.Project.list();
        }
        catch(err: any)
        {
            return thunkAPI.rejectWithValue({error: err.data})
        }
    }
);

export const fetchProjectAsync = createAsyncThunk<Projects, number> (
    'project/fetchProductAsync',
     async (projectId,thunkAPI) => {
        try {
            return await agent.Project.projectById(projectId);
        }
        catch(err: any)
        {
            return thunkAPI.rejectWithValue({error: err.data})
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

export const projectSliceSexy = createSlice({
    name:'projectSexy',
    initialState: projectsAdapter.getInitialState({
        projectLoaded: false,
        status:'idle'
    }),
    reducers:{},
    extraReducers: (builder => {
        builder.addCase(fetchProjectsAsync.pending, (state) => {
            state.status = 'pendingFetchProjects';
        });
        builder.addCase(fetchProjectsAsync.fulfilled, (state,action) =>{
            projectsAdapter.setAll(state,action.payload!);
            state.status = 'idle';
            state.projectLoaded = true;

        });
        builder.addCase(fetchProjectsAsync.rejected,(state) => {
            state.status = "idle";
        });
        //remove project
        builder.addCase(removeProjectAsync.pending, (state) => {
            state.status = 'pendingDeleteProject';
        });
        builder.addCase(removeProjectAsync.fulfilled,(state,action) =>{
            const projectId = action.meta.arg;
            projectsAdapter.removeOne(state,projectId);
            state.status = "idle";
        });
        builder.addCase(removeProjectAsync.rejected, (state) => {
            state.status = "idle";
        });
        //Get Project by Id
        builder.addCase(fetchProjectAsync.pending,(state) => {
            state.status = "pending";
        })
        builder.addCase(fetchProjectAsync.fulfilled,(state,action) => {
            projectsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        })
        builder.addCase(fetchProjectAsync.rejected,(state) => {
            state.status = "idle";
        })
    })
})

export const projectSelectors = projectsAdapter.getSelectors((state:RootState) => state.projectSexy);