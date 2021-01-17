import { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';

function ResultadoSolicitacao() {
  const [solicitacao, setSolicitacao] = useState()
  const { id } = useParams()

  useEffect(() => {
    async function getSolicitacao() {
      const response = await axios.get(`http://localhost:8080/solicitacoes/${id}`)
      const solicitacao = await response.data
      setSolicitacao(solicitacao)
    }
    getSolicitacao()
  }, [id])

  return (
    <section>
      <div className="section">
        <h1 className="section__title">Solicitação { id }</h1>
        <div className="section__box">
          {
            solicitacao && <Mensagem solicitacao={solicitacao} />
          }
        </div>
      </div>
    </section>
  );
}

function Mensagem({ solicitacao }) {
  if(solicitacao.permissao) {
    return (
      <>
        { solicitacao.nome }, a sua solicitação para o procedimento { solicitacao.procedimento.nome } foi permitida. Parabéns! 
      </>
    )
  } else {
    return (
      <>
        { solicitacao.nome }, a sua solicitação foi recusada porque o procedimento { solicitacao.procedimento.nome } não é permitido para pessoas com { solicitacao.idade } anos e do sexo { solicitacao.sexo }. 
      </>
    )
  }
}

export default ResultadoSolicitacao;
