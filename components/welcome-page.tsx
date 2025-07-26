"use client"

import { Button } from "@/components/ui/button"

interface WelcomePageProps {
  onStart: () => void
}

export default function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🧠 Artha Onboarding Quiz
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">{"Let's discover your Spirit of Artha"}</p>
        </div>

        <div className="mb-10">
          <p className="text-gray-400 mb-6">
            Answer 8 questions to uncover your unique financial personality archetype
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <span>🎯 Personalized insights</span>
            <span>⚡ Takes 2 minutes</span>
            <span>🔒 Private & secure</span>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Quiz
        </Button>
      </div>
    </div>
  )
}
