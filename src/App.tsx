import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginForm from './components/Login/LoginForm';
import LoginCreate from './components/Login/LoginCreate';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login/criar" element={<LoginCreate />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/dashboard" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
