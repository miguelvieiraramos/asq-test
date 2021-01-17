import { useState } from 'react';
import './App.css';
import Header from './components/header'
import SideNav from './components/side-nav'
import Procedimentos from './components/procedimentos'
import Autorizacoes from './components/autorizacoes'
import AddAutorizacao from './components/add-autorizacao'
import EditAutorizacao from './components/edit-autorizacao'
import Solicitacoes from './components/solicitacoes'
import AddSolicitacao from './components/add-solicitacao'
import ResultadoSolicitacao from './components/resultado-solicitacao'
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [isSideNavActive, setIsSideNavActive] = useState(false)
  const [autorizacoes, setAutorizacoes] = useState([])

  return (
    <div className="App">
      <Router>
        <Header setIsSideNavActive={setIsSideNavActive} />
        <SideNav isSideNavActive={isSideNavActive} setIsSideNavActive={setIsSideNavActive} />
        <Route path="/procedimentos">
          <Procedimentos />
        </Route>
        <Route path="/autorizacoes">
          <Autorizacoes autorizacoes={autorizacoes} setAutorizacoes={setAutorizacoes} />
        </Route>
        <Route path="/adicionar-autorizacao">
          <AddAutorizacao />
        </Route>
        <Route path="/editar-autorizacao/:id">
          <EditAutorizacao />
        </Route>
        <Route path="/solicitacoes">
          <Solicitacoes />
        </Route>
        <Route path="/adicionar-solicitacao">
          <AddSolicitacao />
        </Route>
        <Route path="/resultado-solicitacao/:id">
          <ResultadoSolicitacao />
        </Route>
      </Router>
    </div>
  );
}

export default App;
