"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import type { Spirit } from "@/app/page"

interface ResultPageProps {
  answers: Spirit[]
  onRestart: () => void
}

const spiritDescriptions = {
  Emergent: "A patient guide who explains everything - just starting out, needs guidance and clarity",
  Voyager: "A curious companion who helps explore - curious, exploring tools and possibilities",
  Builder: "A structured planner that keeps on track - structured, disciplined, system-driven",
  Visionary: "A visionary strategist that helps think big - ambitious, long-term thinker, legacy-driven",
  Anchor: "A protector that flags risks and gives cover - grounded, protection-focused, safety-first",
}

const spiritEmojis = {
  Emergent: "🌱",
  Voyager: "🧭",
  Builder: "🏗️",
  Visionary: "🔮",
  Anchor: "⚓",
}

export default function ResultPage({ answers, onRestart }: ResultPageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [result, setResult] = useState<{ primary: Spirit; secondary?: Spirit } | null>(null)

  useEffect(() => {
    const spiritCounts: Record<Spirit, number> = {
      Emergent: 0,
      Voyager: 0,
      Builder: 0,
      Visionary: 0,
      Anchor: 0,
    }

    answers.forEach((spirit) => {
      spiritCounts[spirit]++
    })

    const sortedSpirits = Object.entries(spiritCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([spirit]) => spirit as Spirit)

    const primarySpirit = sortedSpirits[0]
    const secondarySpirit =
      spiritCounts[sortedSpirits[1]] === spiritCounts[primarySpirit] ? sortedSpirits[1] : undefined

    setTimeout(() => {
      setResult({ primary: primarySpirit, secondary: secondarySpirit })
      setIsLoading(false)
    }, 2500)
  }, [answers])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-lg shadow-2xl p-12 text-center">
          <div className="mb-8">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6"></div>
            <h2 className="text-2xl font-semibold mb-4">Calculating your spirit...</h2>
            <p className="text-gray-400">Analyzing your responses to reveal your financial personality</p>
          </div>

          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!result) return null

  const resultText = result.secondary
    ? `You're a ${result.primary} with a touch of the ${result.secondary}`
    : `You're a ${result.primary}`

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-3xl bg-gray-800 border border-gray-700 rounded-lg shadow-2xl">
        <div className="text-center p-8 border-b border-gray-700">
          <div className="mb-6">
            <div className="text-6xl mb-4">
              {spiritEmojis[result.primary]}
              {result.secondary && <span className="ml-2 text-4xl opacity-70">{spiritEmojis[result.secondary]}</span>}
            </div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Your Spirit of Artha
            </h1>
            <p className="text-xl text-gray-300">{resultText}</p>
          </div>
        </div>

        <div className="text-center p-8">
          <div className="mb-8 p-6 bg-gray-700/50 rounded-lg">
            <p className="text-lg text-gray-200 leading-relaxed">{spiritDescriptions[result.primary]}</p>
            {result.secondary && (
              <p className="text-base text-gray-400 mt-3 leading-relaxed">
                With influences from: {spiritDescriptions[result.secondary]}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">Your financial personality will help guide your journey with Artha</p>

            <Button
              onClick={onRestart}
              size="lg"
              variant="outline"
              className="px-8 py-3 border-gray-600 hover:border-blue-500 hover:bg-gray-700 transition-all duration-300 bg-transparent"
            >
              Restart Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
