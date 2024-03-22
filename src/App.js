import Header from "./components/Header"
import Main from "./components/Main"
import Loader from "./components/Loader"
import Error from "./components/Error"
import StartScreen from "./components/StartScreen"
import Question from "./components/Question"
import NextButton  from "./components/NextButton"
import Progrress from "./components/Progrress"
import FinishScreen from "./components/FinishScreen"
import Timer from "./components/Timer"
import { useQuizContext } from "./contexts/QuizContext"

export default function App(){

  const {status} = useQuizContext();


  return(
    <div className="app">
      <Header/>
      
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && 
        <>
        <Progrress/>
        <Question/> 
        <footer>
        <NextButton/>
        <Timer/>
        </footer>
        </>
        }

        {status === 'finished' && <FinishScreen/>}
      </Main>
      

      </div>
  )

}