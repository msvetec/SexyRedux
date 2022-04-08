import './App.css';
import { useAppDispatch, useAppSelector } from './configureStore';
import { decrement, increment } from './counterSlice';
import { ProjectView } from './projects/Projects';

function App() {
  const dispatch = useAppDispatch();
  const {data, title} = useAppSelector(state => state.counter);
  return (
    <div className="App">
      <h1>{title}</h1>
      <br/>
      <h2>the data is: {data}</h2>
      <br/>
      <button onClick={() => dispatch(increment(1))}>increment</button>
      <button onClick={() => dispatch(decrement(1))}>decrement</button>
      <br />
      <ProjectView />
    </div>

    
  );
}

export default App;
