import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface Question {
  id: number;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How would you rate your energy levels this week?",
    options: [
      { value: 1, label: "Very Low" },
      { value: 2, label: "Low" },
      { value: 3, label: "Moderate" },
      { value: 4, label: "High" },
      { value: 5, label: "Very High" },
    ],
  },
  {
    id: 2,
    text: "How well did you stick to your nutrition plan?",
    options: [
      { value: 1, label: "Not at all" },
      { value: 2, label: "Slightly" },
      { value: 3, label: "Moderately" },
      { value: 4, label: "Mostly" },
      { value: 5, label: "Completely" },
    ],
  },
  {
    id: 3,
    text: "How would you rate your sleep quality?",
    options: [
      { value: 1, label: "Very Poor" },
      { value: 2, label: "Poor" },
      { value: 3, label: "Fair" },
      { value: 4, label: "Good" },
      { value: 5, label: "Excellent" },
    ],
  },
  {
    id: 4,
    text: "How motivated are you to achieve your goals?",
    options: [
      { value: 1, label: "Not Motivated" },
      { value: 2, label: "Slightly Motivated" },
      { value: 3, label: "Moderately Motivated" },
      { value: 4, label: "Very Motivated" },
      { value: 5, label: "Extremely Motivated" },
    ],
  },
  {
    id: 5,
    text: "How would you rate your overall progress?",
    options: [
      { value: 1, label: "No Progress" },
      { value: 2, label: "Slight Progress" },
      { value: 3, label: "Moderate Progress" },
      { value: 4, label: "Significant Progress" },
      { value: 5, label: "Exceptional Progress" },
    ],
  },
];

interface CheckInQuestionnaireProps {
  onComplete: (answers: Record<number, number>) => void;
}

export default function CheckInQuestionnaire({ onComplete }: CheckInQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleComplete = () => {
    onComplete(answers);
  };

  if (showResults) {
    const averageScore = Object.values(answers).reduce((a, b) => a + b, 0) / questions.length;

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Check-in Summary</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold text-emerald-600">
              {averageScore.toFixed(1)}/5
            </div>
          </div>
          <div className="text-center text-gray-600">
            {averageScore >= 4 ? (
              <p className="flex items-center justify-center text-emerald-600">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Great progress! Keep up the good work!
              </p>
            ) : averageScore <= 2 ? (
              <p className="flex items-center justify-center text-red-600">
                <XCircleIcon className="h-5 w-5 mr-2" />
                Don't worry, we'll work on improving these areas together.
              </p>
            ) : (
              <p className="text-gray-600">
                You're making steady progress. Let's keep pushing forward!
              </p>
            )}
          </div>
          <div className="mt-6">
            <button
              onClick={handleComplete}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Continue to Check-in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-gray-500">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {questions[currentQuestion].text}
      </h2>

      <div className="space-y-3">
        {questions[currentQuestion].options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
            className="w-full text-left px-4 py-3 rounded-lg border border-gray-300 hover:border-emerald-500 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
} 