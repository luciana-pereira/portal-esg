import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/login/criar" element={<LoginCreate />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/configuracoes" element={<Settings />} />
            <Route path="/cadastrouser" element={<CadastroUser />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
