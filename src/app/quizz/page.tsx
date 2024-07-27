"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";

const questions= [
    {
        questionText:"what is React?",
        answers:[
            {
                answerText:"A library", 
                isCorrect:true,
                id:1
            },
            {
                answerText:"Framework",
                isCorrect:false,
                id:2
            },
            {
                answerText:"language",
                isCorrect:false,
                id:3
            },
            {
                answerText:"A database",
                isCorrect:false,
                id:4
            }
        ]
    },
    {
        questionText: "What is Python?",
        answers: [
            {
                answerText: "A programming language",
                isCorrect: true,
                id: 1
            },
            {
                answerText: "A snake",
                isCorrect: false,
                id: 2
            },
            {
                answerText: "A type of food",
                isCorrect: false,
                id: 3
            },
            {
                answerText: "A planet",
                isCorrect: false,
                id: 4
            }
        ]
    },
    {
        questionText: "What does HTML stand for?",
        answers: [
            {
                answerText: "HyperText Markup Language",
                isCorrect: true,
                id: 1
            },
            {
                answerText: "HighText Machine Language",
                isCorrect: false,
                id: 2
            },
            {
                answerText: "HyperLoop Machine Language",
                isCorrect: false,
                id: 3
            },
            {
                answerText: "HyperTool Markup Language",
                isCorrect: false,
                id: 4
            }
        ]
    },
    {
        questionText: "What is the main use of CSS?",
        answers: [
            {
                answerText: "To style web pages",
                isCorrect: true,
                id: 1
            },
            {
                answerText: "To create web pages",
                isCorrect: false,
                id: 2
            },
            {
                answerText: "To debug web pages",
                isCorrect: false,
                id: 3
            },
            {
                answerText: "To host web pages",
                isCorrect: false,
                id: 4
            }
        ]
    },
    {
        questionText: "Which company developed Java?",
        answers: [
            {
                answerText: "Sun Microsystems",
                isCorrect: true,
                id: 1
            },
            {
                answerText: "Microsoft",
                isCorrect: false,
                id: 2
            },
            {
                answerText: "Apple",
                isCorrect: false,
                id: 3
            },
            {
                answerText: "IBM",
                isCorrect: false,
                id: 4
            }
        ]
    },
    {
        questionText: "What is SQL used for?",
        answers: [
            {
                answerText: "To manage and manipulate databases",
                isCorrect: true,
                id: 1
            },
            {
                answerText: "To design web pages",
                isCorrect: false,
                id: 2
            },
            {
                answerText: "To create mobile apps",
                isCorrect: false,
                id: 3
            },
            {
                answerText: "To edit images",
                isCorrect: false,
                id: 4
            }
        ]
    }
]

export default function Home() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion]= useState(0)
  const handleNext = () => {
    if(!started){
        setStarted(true);
        return
    }
    if(currentQuestion<questions.length-1){
        setCurrentQuestion(currentQuestion+1)
    }
    
  };
  return (
    <div className="flex flex-col flex-1">
        <div>
            <header>
            <ProgressBar value={50}/>
            </header>
        </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Hello Whfhfhorld👋</h1>
        ) : (
          <div>
            <h2
              className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {
                questions[currentQuestion].answers.map(answer=>{
                    return(
                        <Button key= {answer.id} variant={"secondary"}>
                            {answer.answerText}
                        </Button>
                    )
                })
              }
            </div>
          </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <Button onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
