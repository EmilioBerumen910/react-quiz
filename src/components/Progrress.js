function Progrress({index,numberQuestions,points,maxPoints,answer}) {
    return (
        <header className="progress">
            <progress max={numberQuestions} value={index + Number(answer !== null)} />
            <p>Question: <strong>{index + 1 } </strong> / {numberQuestions}</p>
            <p><strong>{points} / {maxPoints}</strong></p>
        </header>
    )
}

export default Progrress
