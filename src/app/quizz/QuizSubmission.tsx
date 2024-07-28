import Bar from "@/components/Bar"
type Props={
    scorePercentage:number,
    score:number,
    totalQuestions:number
}

const QuizSubmission=(props:Props)=>{
    const {scorePercentage, score, totalQuestions}=props;
    return(
        <div className="flex flex-col flex-1">
            <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24 ">
                <h2 className="text-3xl font-bold">Quiz is completed!!</h2>
                <p>Your score:{scorePercentage}%</p>
                <>
                <div className="flex flex-row gap-8 mt-6">
                    <Bar percentage={scorePercentage} color="green"/>
                    <Bar percentage={100-scorePercentage} color="red"/>
                </div>
                <div className="flex flex-row gap-8">
                    <p>{score} Correct</p>
                    <p>{totalQuestions-score} Incorrect</p>
                </div>
                </>
            </main>
        </div>
    )
}

export default QuizSubmission