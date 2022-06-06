import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Step01 from './Components/Step01';
import Step02 from './Components/Step02';
import Step03 from './Components/Step03';

function App() {
  return (
    <div >
     <Routes>
       <Route path='/' element={<Step01></Step01>}></Route>
       <Route path='/step2/:id' element={<Step02></Step02>}></Route>
       <Route path='/step3/:id' element={<Step03></Step03>}></Route>
     </Routes>
    </div>
  );
}

export default App;
