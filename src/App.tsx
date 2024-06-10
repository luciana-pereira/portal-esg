import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Cadastro from './pages/Cadastro';
import Dashboard from './pages/Dashboard';
import Community from './components/Community/Community';
import Benefits from './components/Benefits/Benefits';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login/cadastro/usuario" element={<Signup />} />
            <Route path="/login/cadastro" element={<Cadastro />} />
            <Route path="/login/dashboard" element={<Dashboard />} />
            <Route path="/comunidade" element={<Community />} />
            <Route path="/beneficios" element={<Benefits />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
