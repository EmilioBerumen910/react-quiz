import React, { createContext, useContext, useReducer,useEffect } from 'react';

// Define the initial state for the quiz
const initialState = {
    // Add your initial state properties here:
    questions:[],
    //Possible status states : loading,error,ready,active,finished
    status:'loading',
    index: 0,
    answer:null,
    points: 0,
    highscore: 0,
    secondsRemaining: 1000
};

// Define the reducer function for the quiz
const quizReducer = (state, action) => {
    // Add your reducer logic here
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
};

// Create the QuizContext
const QuizContext = createContext();

// Create the QuizProvider component
const QuizProvider = ({ children }) => {
    const [{questions,status,index,answer,points,highscore,secondsRemaining},dispatch] = useReducer(quizReducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((acc,question) => acc + question.points,0);
    //Get Data From API

    useEffect(function(){
    fetch("http://localhost:8000/questions")
    .then(res => res.json())
    .then(data => dispatch({type:'dataReceived',payload:data}))
    .catch(err =>dispatch({typeo:'dataFailed'}))
    },[])

    
    
    
    return (
        <QuizContext.Provider value={{ questions,status,index,answer,points,highscore,secondsRemaining,numQuestions,maxPossiblePoints,dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

// Create a custom hook to access the QuizContext
const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};

export { QuizProvider, useQuizContext };