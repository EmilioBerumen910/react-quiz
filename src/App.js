import { useEffect } from "react"
import { useReducer } from "react"

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


const initialstate = {
  questions:[],
  //Possible status states : loading,error,ready,active,finished
  status:'loading',
  index: 0,
  answer:null,
  points: 0,
  highscore: 0,
  secondsRemaining: 1000
}

function reducer(state,action){

  switch(action.type){
    case 'dataReceived':
      return {
        ...state,
        questions:action.payload,
        status:"ready"
      }
    case 'dataFailed':
      return {
        ...state,
        status:"error"
      }
    case 'start':
      return {
        ...state,
        status:"active",
        secondsRemaining: 1000
      }
    case 'newAnswer':
      const currentQuestion = state.questions.at(state.index)
    return {
      ...state,
      answer: action.payload,
      points: action.payload === currentQuestion.correctOption ? state.points + currentQuestion.points : state.points
    }
    case "nextQuestion":
      return {
        ...state,
        answer:null,
        index:state.index + 1
      }
    case "finish":
      return {
        ...state,
        status:"finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }
    case "reset":
      return {
        ...state,
        status:"ready",
        index: 0,
        answer:null,
        points: 0,
        highscore: 0,
      
  
      }
    case "tick":
      return{
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    default:return;

  }
}

export default function App(){
  const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch] = useReducer(reducer,initialstate)

  const questionlenght = questions.length;
  const maxPoints = questions.reduce((prev,cur) => prev + cur.points,0);

  //Get Data From API
  useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then(res => res.json())
    .then(data => dispatch({type:'dataReceived',payload:data}))
    .catch(err =>dispatch({typeo:'dataFailed'}))
  },[])


  return(
    <div className="app">
      <Header/>
      
      <Main>
        {status === 'loading' && <Loader/>}
        {status === 'error' && <Error/>}
        {status === 'ready' && <StartScreen numberQuestions = {questionlenght} dispatch={dispatch}/>}
        {status === 'active' && 
        <>
        <Progrress index={index} numberQuestions = {questionlenght} points={points} maxPoints={maxPoints} answer={answer}></Progrress>
        <Question question = {questions[index]} dispatch={dispatch} answer={answer}/> 
        <footer>
        <NextButton dispatch={dispatch} answer={answer} numberQuestions={questionlenght} index={index}></NextButton>
        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
        </footer>
        </>
        }

        {status === 'finished' && <FinishScreen points={points} maxPoints={maxPoints} highscore={highscore} dispatch={dispatch}/>}
      </Main>
      

      </div>
  )

}