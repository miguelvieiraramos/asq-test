import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios'

function Procedimentos() {
  const [procedimentos, setProcedimentos] = useState([])
  
  useEffect(() => {
    async function getProcedimentos() {
      const response = await axios.get('http://localhost:8080/procedimentos')
      const data = await response.data
      setProcedimentos(data)
    }
    getProcedimentos()
  }, [])

  return (
    <section>
      <div className="section">
        <h1 className="section__title">Nossos Procedimentos</h1>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {
                procedimentos && procedimentos.map(procedimento => (
                  <tr key={ procedimento.id }>
                    <td data-label="Id:">{ procedimento.id }</td>
                    <td data-label="Nome:">{ procedimento.nome }</td>
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

export default Procedimentos;
