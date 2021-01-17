import { useEffect, useState } from 'react';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import '../App.css';
import axios from 'axios'

function AddAutorizacao() {
  const [successAlert, setSuccessAlert] = useState(false);
  const [failAlert, setFailAlert] = useState(false);
  const [initialValues, setInitialValues] = useState({
    procedimento: "",
    idade: "",
    sexo: "MASCULINO",
    permitido: "true"
  })
  const [procedimentos, setProcedimentos] = useState([]);

  useEffect(() => {
    async function getProcedimentos() {
      const response = await axios.get('http://localhost:8080/procedimentos')
      const data = await response.data
      initialValues.procedimento = data[0].id
      setInitialValues(initialValues)
      setProcedimentos(data)
    }
    getProcedimentos()
  }, [initialValues])

  const validationSchema = yup.object().shape({
    idade: yup.number().required("O campo é obrigatório.")
  })

  function handleSubmit(values, { resetForm }) {
    async function addAutorizacao() {
      try {
        const body = {
          procedimento: {
            id: values.procedimento
          },
          idade: values.idade,
          sexo: values.sexo,
          permitido: values.permitido
        }
        await axios.post('http://192.168.0.10:8080/autorizacoes', body)
        resetForm({})
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
          A autorização foi adicionada com sucesso.
        </div>
      </div>
      <div className="alert">
        <div className={failAlert ? "alert__box alert__box--red alert__box--active" : "alert__box alert__box--red"}>
          A autorização não foi adicionada.
        </div>
      </div>
      <div className="section">
        <h1 className="section__title">Adicionar Autorização</h1>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
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
              <input type="submit" value="Enviar" className="form-group__button"></input>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default AddAutorizacao;
