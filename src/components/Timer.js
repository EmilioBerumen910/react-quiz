import { useEffect } from "react"
import { useQuizContext } from "../contexts/QuizContext";

function Timer() {

    const {dispatch,secondsRemaining} = useQuizContext();
    
    useEffect(function (){
        const id = setInterval(function () {
            dispatch({type:'tick'})
        },1000)

        return () => clearInterval(id)

    },[dispatch])

    return (
        <div className="timer">
            {secondsRemaining}
        </div>
    )
}

export default Timer
