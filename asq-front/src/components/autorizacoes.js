import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import '../App.css';
import axios from 'axios'

function Autorizacoes({ autorizacoes, setAutorizacoes }) {
  const [successDeleteAlert, setSuccessDeleteAlert] = useState(false);
  const [failDeleteAlert, setFailDeleteAlert] = useState(false);
  
  useEffect(() => {
    async function getAutorizacoes() {
      const response = await axios.get('http://localhost:8080/autorizacoes')
      const data = await response.data
      setAutorizacoes(data)
    }
    getAutorizacoes()
  }, [setAutorizacoes])

  async function deleteAutorizacao(id) {
    try {
      await axios.delete(`http://localhost:8080/autorizacoes/${id}`)
      removeAutorizacaoFromArray(id)
      setSuccessDeleteAlert(true)
      closeAlert(setSuccessDeleteAlert)
    } catch {
      setFailDeleteAlert(true)
      closeAlert(setFailDeleteAlert)
    }
  }

  function removeAutorizacaoFromArray(id) {
    const newAutorizacoes = autorizacoes.filter(autorizacao => autorizacao.id !== id)
    setAutorizacoes(newAutorizacoes)
  }

  function closeAlert(callback) {
    setTimeout(() => callback(false), 3000)
  }

  return (
    <section>
      <div className="alert">
        <div className={successDeleteAlert ? "alert__box alert__box--green alert__box--active" : "alert__box alert__box--green"}>
          A autorização foi deletada com sucesso.
        </div>
      </div>
      <div className="alert">
        <div className={failDeleteAlert ? "alert__box alert__box--red alert__box--active" : "alert__box alert__box--red"}>
          A autorização não foi deletada.
        </div>
      </div>
      <div className="section">
        <h1 className="section__title">Autorizações</h1>
        <div className="buttons">
          <button className="buttons_button buttons_button--green"><Link to="/adicionar-autorizacao">Inserir</Link></button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Procedimento</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Permitido</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {
                autorizacoes && autorizacoes.map(autorizacao => (
                  <tr key={ autorizacao.id }>
                    <td data-label="Procedimento:">{ autorizacao.procedimento.nome }</td>
                    <td data-label="Idade:">{ autorizacao.idade }</td>
                    <td data-label="Sexo:">{ autorizacao.sexo }</td>
                    <td data-label="Permitido:">{ autorizacao.permitido ? "Sim" : "Não" }</td>
                    <td data-label="Ações:">
                      <button className="button button--blue"><Link to={`/editar-autorizacao/${autorizacao.id}`}>Editar</Link></button>
                      <button onClick={deleteAutorizacao.bind(this, autorizacao.id)} className="button button--red">Deletar</button>
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

export default Autorizacoes;
