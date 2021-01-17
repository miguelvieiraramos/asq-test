import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import axios from 'axios'

function Solicitacoes() {
  const [solicitacoes, setSolicitacoes] = useState([])

  useEffect(() => {
    async function getSolicitacoes() {
      const response = await axios.get('http://localhost:8080/solicitacoes')
      const solicitacoes = await response.data
      setSolicitacoes(solicitacoes)
    }
    getSolicitacoes()
  }, [])

  return (
    <section>
      <div className="section">
        <h1 className="section__title">Solicitacões</h1>
        <div className="buttons">
          <button className="buttons_button buttons_button--green"><Link to="/adicionar-solicitacao">Inserir</Link></button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Procedimento</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                solicitacoes.map(solicitacao => (
                  <tr key={solicitacao.id}>
                    <td>{ solicitacao.nome }</td>
                    <td>{ solicitacao.procedimento.nome }</td>
                    <td>{ solicitacao.idade }</td>
                    <td>{ solicitacao.sexo }</td>
                    <td>
                      <button className="button button--blue"><Link to={`/resultado-solicitacao/${solicitacao.id}`}>Ver Resultado</Link></button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Solicitacoes;
