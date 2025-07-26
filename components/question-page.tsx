"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { quizData } from "@/lib/quiz-data"
import type { QuizState, Spirit } from "@/app/page"

interface QuestionPageProps {
  quizState: QuizState
  onAnswer: (spirit: Spirit) => void
}

export default function QuestionPage({ quizState, onAnswer }: QuestionPageProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const questionKeys = Object.keys(quizData)
  const currentQuestionKey = questionKeys[quizState.currentQuestion]

  if (!currentQuestionKey || !quizData[currentQuestionKey as keyof typeof quizData]) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading question...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = quizData[currentQuestionKey as keyof typeof quizData]
  const progress = ((quizState.currentQuestion + 1) / questionKeys.length) * 100

  const handleOptionClick = (spirit: Spirit, optionText: string) => {
    if (isTransitioning) return

    setSelectedOption(optionText)
    setIsTransitioning(true)

    setTimeout(() => {
      onAnswer(spirit)
      setSelectedOption(null)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-4xl bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
        <div className="p-6 border-b border-gray-700">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Question {quizState.currentQuestion + 1} of {questionKeys.length}
              </span>
              <span className="text-sm text-gray-400">{Math.round(progress)}% complete</span>
            </div>
            {/* Simple progress bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center leading-relaxed">{currentQuestion.question}</h2>
        </div>

        <div className="p-6 space-y-4">
          {Object.entries(currentQuestion.options).map(([spirit, optionText]) => (
            <Button
              key={spirit}
              variant="outline"
              className={`w-full p-6 text-left justify-start h-auto border-gray-600 bg-gray-800 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300 ${
                selectedOption === optionText ? "border-blue-500 bg-blue-600/20 text-blue-300" : "text-gray-200"
              }`}
              onClick={() => handleOptionClick(spirit as Spirit, optionText)}
              disabled={isTransitioning}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    selectedOption === optionText ? "border-blue-500 bg-blue-500" : "border-gray-500"
                  }`}
                />
                <span className="text-base leading-relaxed">{optionText}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
