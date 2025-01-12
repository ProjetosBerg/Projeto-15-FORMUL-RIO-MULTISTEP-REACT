// Components
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {FiSend} from 'react-icons/fi';
import UserForm from '../src/components/UserForm';
import ReviewForm from '../src/components/ReviewForm';
import Thanks from '../src/components/Thanks';
import Steps from '../src/components/Steps';
import './App.css'

// Hooks
import { userForm } from '../src/hooks/userForm';
import { useState } from 'react';


function App() {
  const formTemplate = {
    name: "",
    email: "",
    review: "",
    comment: ""
  }

  const [data,setData] = useState(formTemplate);

  const updateFieldHandler = (key,value) => {
    setData((prev)=>{
      return {...prev,[key]:value}
    });
  }
  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler}/>,
    <Thanks data={data} />
  ];

  const {currentStep, currentComponent, changeStep, isLastStep, isFirstStep} = userForm(formComponents);

  return (
    <>
     <div className="app">
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>
          Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto
        </p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep}/>
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            {!isFirstStep && (
              <button type="button" onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />
              <span>Voltar</span>
            </button>
            )}
            {!isLastStep ? (
               <button type='submit'>
               <GrFormNext/>
               <span>Avançar</span>
             </button>
            ) : (
              <button type='submit'>
                <FiSend/>
                <span>Enviar</span>
              </button>
            )}
          </div>
        </form>
      </div>
     </div>
    </>
  )
}

export default App
