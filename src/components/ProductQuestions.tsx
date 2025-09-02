"use client";

import type React from "react";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Question } from "@/types/types";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

interface ProductQuestionsProps {
  questions: Question[];
  productId: string; // pass productId from parent page
}

const ProductQuestions = ({ questions, productId }: ProductQuestionsProps) => {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [localQuestions, setLocalQuestions] = useState<Question[]>(
    questions || []
  );
  console.log(questions);

  const router = useRouter();
  const { checkAuth, user } = useAuth();

  const handleAskQuestionToggle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (showQuestionForm) {
      setShowQuestionForm(false);
      return;
    }
    try {
      setLoading(true);
      const authOk = await checkAuth();
      if (!authOk) {
        toast.error("Please log in to ask a question");
        router.push(
          `/login?redirect=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }
      setShowQuestionForm(true);
    } catch {
      toast.error("Cannot ask question at this moment");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const tempId = `temp-${Date.now()}`;
    const optimisticQuestion: Question = {
      id: tempId,
      productId,
      userId: user?.id ?? "me",
      question: newQuestion,
      answer: null,
      createdAt: new Date().toISOString(),
      user: user,
    };

    // Optimistic update
    setLocalQuestions((prev) => [optimisticQuestion, ...prev]);

    setNewQuestion("");
    setShowQuestionForm(false);

    try {
      const { data } = await axiosInstance.post("/api/products/questions", {
        productId,
        userId: user?.id,
        question: optimisticQuestion.question,
      });

      console.log(data);

      // Replace tempId with real question from backend
      setLocalQuestions((prev) =>
        prev.map((q) => (q.id === tempId ? { ...q, ...data.question } : q))
      );
      toast.success("Question submitted!");
    } catch {
      setLocalQuestions((prev) => prev.filter((q) => q.id !== tempId));
      toast.error("Failed to submit question");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 sm:p-6">
      {/* Header & Ask button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
          Questions & Answers
        </h2>
        <button
          onClick={handleAskQuestionToggle}
          disabled={loading}
          className="bg-info disabled:bg-info/95 cursor-pointer hover:bg-info/90 text-white px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm sm:text-base"
        >
          <MessageCircle size={14} className="sm:w-4 sm:h-4" />
          <span>Ask Question</span>
        </button>
      </div>

      {/* Question Form */}
      {showQuestionForm && (
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">
            Ask a Question
          </h3>
          <form
            onSubmit={handleSubmitQuestion}
            className="space-y-3 sm:space-y-4"
          >
            <div>
              <label
                htmlFor="question"
                className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Your Question
              </label>
              <textarea
                id="question"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="What would you like to know about this product?"
                className="w-full px-2 sm:px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
                rows={3}
                required
              />
            </div>
            <div className="flex gap-2 sm:gap-3">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setShowQuestionForm(false)}
                className="bg-danger text-white hover:bg-danger/90 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {localQuestions && localQuestions.length === 0 ? (
          <div className="text-center py-6 sm:py-8 text-gray-500">
            <MessageCircle
              size={28}
              className="w-8 h-8 mx-auto mb-2 text-gray-300"
            />
            <p className="text-sm sm:text-base">
              No questions yet. Be the first to ask!
            </p>
          </div>
        ) : (
          localQuestions.map((question) => (
            <div
              key={question.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 space-y-2"
            >
              {/* Question */}
              <div className="space-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
                  <span className="font-medium text-gray-900 text-sm sm:text-base">
                    {question.user ? question.user.name : "Unknown"}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">
                    asked on{" "}
                    {new Date(question.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  {question.question}
                </p>
              </div>

              {/* Answer */}
              {question.answer && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="text-xs sm:text-sm font-medium text-blue-700 mb-1">
                    Answer
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductQuestions;
