import Options from "./Options"
import { useQuizContext } from "../contexts/QuizContext";

function Question() {
const {questions,index} = useQuizContext();
const question = questions.at(index);
    
return (
        <div>
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    )
}

export default Question
