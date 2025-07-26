"use client"

import { useState } from "react"
import WelcomePage from "@/components/welcome-page"
import QuestionPage from "@/components/question-page"
import ResultPage from "@/components/result-page"
import { quizData } from "@/lib/quiz-data"

export type Spirit = "Emergent" | "Voyager" | "Builder" | "Visionary" | "Anchor"

export interface QuizState {
  currentQuestion: number
  answers: Spirit[]
  isComplete: boolean
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "quiz" | "result">("welcome")
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
  })

  const totalQuestions = Object.keys(quizData).length

  const startQuiz = () => {
    setCurrentPage("quiz")
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
    })
  }

  const handleAnswer = (spirit: Spirit) => {
    const newAnswers = [...quizState.answers, spirit]
    const nextQuestion = quizState.currentQuestion + 1

    if (nextQuestion >= totalQuestions) {
      setQuizState({
        currentQuestion: nextQuestion,
        answers: newAnswers,
        isComplete: true,
      })

      setTimeout(() => {
        setCurrentPage("result")
      }, 500)
    } else {
      setQuizState({
        currentQuestion: nextQuestion,
        answers: newAnswers,
        isComplete: false,
      })
    }
  }

  const restartQuiz = () => {
    setCurrentPage("welcome")
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {currentPage === "welcome" && <WelcomePage onStart={startQuiz} />}
      {currentPage === "quiz" && <QuestionPage quizState={quizState} onAnswer={handleAnswer} />}
      {currentPage === "result" && <ResultPage answers={quizState.answers} onRestart={restartQuiz} />}
    </div>
  )
}
