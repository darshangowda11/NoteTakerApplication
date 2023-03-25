
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './components/Signup';
import Signin from './components/Signin';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
