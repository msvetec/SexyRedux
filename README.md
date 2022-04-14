# SexyRedux

# Run exsample
API.
1. update-database #(visual studio), 
   #(VSCode)
    dotnet tool install --global dotnet-ef
    dotnet ef database update
    
2. /API > dotnet run seeddata (add test data to db)

Client
npm install
npm start

# Files to watch
configureStore
counterSlice (low lvl reducer)
/projects projectSlice (mid lvl reducer)
/projects projectSliceSexy (ultra sexy reducer for aconto)
# usecase
Projects.tsx
ProjectDetails.tsx

# Thunk
https://redux-toolkit.js.org/api/createAsyncThunk

# Adapter options and exsamples
https://redux-toolkit.js.org/api/createEntityAdapter

# Selector
export const projectSelectors = projectsAdapter.getSelectors((state:RootState) => state.projectSexy);
options: selectAll, selectById, selectEntity, selectIds, selectTotal



