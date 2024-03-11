function NextButton({dispatch,answer,numberQuestions,index}) {
    if(answer === null){return null}
    
    if(index < numberQuestions - 1) {
    return (<button className="btn btn-ui" onClick={()=> dispatch({type:"nextQuestion"})}>Next</button>)
    }

    if(index === numberQuestions - 1) {
    return (<button className="btn btn-ui" onClick={()=> dispatch({type:"finish"})}>Finish</button>)
    }
}

export default NextButton
