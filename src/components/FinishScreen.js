import { useQuizContext } from "../contexts/QuizContext";

function FinishScreen() {

    const {points, maxPossiblePoints, highscore,dispatch} = useQuizContext();

    const percentage = (points / maxPossiblePoints) * 100;
    return (
        <>
        <p className="result">
        You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)  
        </p>
        <p className="highscore">
        (Highscore: {highscore} points)
        </p>
        <button className="btn btn-ui" onClick={()=> dispatch({type:"reset"})}>Reset</button>
        </>
    )
}

export default FinishScreen
