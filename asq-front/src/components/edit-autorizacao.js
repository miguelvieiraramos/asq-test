import { useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import '../App.css';
import axios from 'axios'
import { useParams } from 'react-router-dom';

function EditAutorizacao() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id: "",
    procedimento: "",
    idade: "",
    sexo: "",
    permitido: ""
  })
  const [procedimentos, setProcedimentos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getProcedimentos() {
      const response = await axios.get('http://localhost:8080/procedimentos')
      const data = await response.data
      setProcedimentos(data)      
    }
    async function getAutorizacao() {
      const response = await axios.get(`http://localhost:8080/autorizacoes/${id}`);
      const newInitialValues = await response.data
      newInitialValues.procedimento = newInitialValues.procedimento.id
      setInitialValues(newInitialValues)

    }
    getProcedimentos()
    getAutorizacao();
  }, [id])

  const validationSchema = yup.object().shape({
    idade: yup.number().required("O campo é obrigatório.")
  })

  function handleSubmit(values) {
    async function addAutorizacao() {
      try {
        const body = {
          id: values.id,
          procedimento: {
            id: values.procedimento
          },
          idade: values.idade,
          sexo: values.sexo,
          permitido: values.permitido
        }
        await axios.put('http://localhost:8080/autorizacoes', body)
        setSuccessAlert(true)
        closeAlert(setSuccessAlert)
      } catch {
        setFailAlert(true)
        closeAlert(setFailAlert)
      }
    }
    addAutorizacao()
  }


  function closeAlert(callback) {
    setTimeout(() => callback(false), 3000)
  }

  return (
    <section>
      <div className="alert">
        <div className={successAlert ? "alert__box alert__box--green alert__box--active" : "alert__box alert__box--green"}>
          A autorização foi alterada com sucesso.
        </div>
      </div>
      <div className="alert">
        <div className={failAlert ? "alert__box alert__box--red alert__box--active" : "alert__box alert__box--red"}>
          A autorização não foi alterada.
        </div>
      </div>
      <div className="section">
        <h1 className="section__title">Alterar Autorização</h1>
        <Formik enableReinitialize onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          <Form className="form">
            <div className="form-group">
              <label className="form-group__label">Procedimento:</label>
              <Field as="select" className="form-group__select" name="procedimento">
                {
                  procedimentos.map(procedimento => (
                    <option key={procedimento.id} value={ procedimento.id }>{ procedimento.nome }</option>
                  ))
                }
              </Field>
            </div>
            <div className="form-group">
              <label className="form-group__label">Idade:</label>
              <Field type="number" className="form-group__input" name="idade" />
              <ErrorMessage component="span" name="idade" className="form-group__error" />
            </div>
            <div className="form-group">
              <label className="form-group__label">Sexo:</label>
              <Field as="select" className="form-group__select" name="sexo">
                <option value="MASCULINO">Masculino</option>
                <option value="FEMININO">Feminino</option>
              </Field>
            </div>
            <div className="form-group">
              <label className="form-group__label">Permissão:</label>
              <Field as="select" className="form-group__select" name="permitido">
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </Field>
            </div>
            <div className="form-group">
              <input type="submit" value="Alterar" className="form-group__button"></input>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default EditAutorizacao;
