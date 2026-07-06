import React, { useEffect, useState, useMemo } from "react";
import light from "../assets/light.png";
import dark from "../assets/dark.png";
import mode from "../assets/switch white.png";
import acc from "../assets/Acc 2.png";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import data from "../data/data.json";
import { useLocation, useNavigate } from "react-router-dom";
import errorIcon from "../assets/cancel img.png";
import { useTheme } from "../theme/ThemeContext";
import mark from "../assets/mark.svg";
import wrong from "../assets/wrong.svg";

const Question = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const stateName = location?.state?.name;
  const stateImg = location?.state?.img;
  const topicKey = (stateName || "Accessibility").toString().toLowerCase();
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);
  const { isDark, toggle } = useTheme();

  const selectedTopic = useMemo(
    () => data.find((t) => t.title.toString().toLowerCase() === topicKey),
    [topicKey],
  );

  const safeTopic = selectedTopic || data[0];
  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    setQIndex(0);
  }, [topicKey]);

  const question = safeTopic.questions?.[qIndex];

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRevealed(false);
    if (selectedOptionIndex === null) return;

    const timer = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, [selectedOptionIndex]);

  useEffect(() => {
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setShowError(false);
    setRevealed(false);
    setIsLoading(false);
  }, [qIndex]);

  return (
    <div
      className={`min-h-dvh w-full transition-colors duration-500 ${
        isDark ? "bg-[#313E51] text-white" : "bg-[#F4F6FA] text-[#313E51]"
      }`}
    >
      {/* Outer container: grows with screen width, capped at a max so it never gets absurdly wide */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24 2xl:px-32">
        {/* Header row: topic + toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={stateImg || acc}
              alt=""
              className="h-10 w-10 rounded-[6px] bg-[#F6E7FF] p-2 sm:h-12 sm:w-12 md:h-14 md:w-14 md:rounded-[12px]"
            />
            <p className="text-[18px] font-medium sm:text-[22px] md:text-[28px]">
              {stateName || "Accessibility"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {light && <CiLight className="h-6 w-6" />}

            <button
              onClick={toggle}
              aria-pressed={isDark}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="relative h-[30px] w-[60px] rounded-full bg-[#A729F5] p-[4px] transition-colors duration-300 focus:outline-none"
            >
              <div
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  isDark ? "" : "bg-[#A729F5]"
                }`}
              />
              <div
                className={`relative z-10 h-[22px] w-[22px] transform rounded-full bg-white transition-transform duration-300 ${
                  isDark ? "translate-x-0" : "translate-x-[28px]"
                }`}
              >
                {mode ? (
                  <img
                    src={mode}
                    alt="switch"
                    className="pointer-events-none mx-auto my-auto h-[12px] w-[12px]"
                  />
                ) : (
                  <span className="block text-center text-[10px] leading-[22px]">
                    {isDark ? "🌙" : "☀️"}
                  </span>
                )}
              </div>
            </button>

            {dark && <GoMoon className="h-6 w-6" />}
          </div>
        </div>

        {/* Main content: question column on the left, options column on the right at lg+ */}
        <div className="mt-8 flex flex-col gap-8 sm:mt-10 lg:mt-16 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Left: question + progress bar */}
          <div className="w-full lg:max-w-[465px] xl:max-w-[560px]">
            <p
              className={`text-[14px] font-normal sm:text-[16px] md:text-[20px] ${
                isDark ? "text-[#626C7F]" : "text-[#ABC1E1]"
              }`}
            >
              Question {qIndex + 1} of {safeTopic.questions.length}
            </p>

            <p className="mt-3 text-[20px] font-medium sm:text-[26px] md:text-[32px] lg:text-[36px]">
              {question.question}
            </p>

            <div
              className={`mt-6 h-[16px] w-full rounded-[999px] p-[4px] sm:mt-8 md:mt-10 lg:mt-16 ${
                isDark ? "bg-[#FFFFFF]" : "bg-[#3B4D66]"
              }`}
            >
              <div
                className="h-[8px] rounded-[104px] bg-[#A729F5] transition-all duration-300"
                style={{
                  width: `${((qIndex + 1) / safeTopic.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Right: options + submit */}
          <div className="w-full lg:max-w-[564px] xl:max-w-[640px]">
            <div className="flex flex-col gap-3 sm:gap-4">
              {question?.options?.map((opt, idx) => {
                const isSelected = idx === selectedOptionIndex;
                const isCorrect = opt === question.answer;

                const base =
                  "flex items-center gap-3 rounded-[12px] sm:rounded-[16px] md:rounded-[24px] p-3 sm:p-4 shadow-[0_4px_20px_#313E5124] cursor-pointer box-border transition-all duration-200 w-full";
                const size = "min-h-[64px] sm:min-h-[80px] md:min-h-[96px]";

                const themeInner = isDark
                  ? "bg-white text-[#313E51]"
                  : "bg-[#3B4D66] text-white";

                let borderColorClass = "border-transparent";
                let optionTextColor = "";
                const showCheck =
                  (isSelected && revealed && isCorrect) ||
                  (submitted && isCorrect);
                const showCross = isSelected && revealed && !isCorrect;

                if (isSelected) {
                  if (!revealed) {
                    // Immediately after selecting: purple, before the reveal
                    borderColorClass = "border-[#A729F5]";
                    optionTextColor = "text-[#A729F5]";
                  } else if (isCorrect) {
                    borderColorClass = "border-[#26D782]";
                    optionTextColor = "text-[#26D782]";
                  } else {
                    borderColorClass = "border-[#EE5454]";
                    optionTextColor = "text-[#EE5454]";
                  }
                } else if (submitted && isCorrect) {
                  borderColorClass = "border-[#26D782]";
                }

                const isCorrectRevealed =
                  (isSelected && revealed && isCorrect) ||
                  (submitted && isCorrect);
                const letterColor = isCorrectRevealed ? "#FFFFFF" : "#313E51";

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!submitted) {
                        setSelectedOptionIndex(idx);
                        setRevealed(false);
                      }
                      setShowError(false);
                    }}
                    className={`${base} ${size} ${themeInner} border-[3px] ${borderColorClass} justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-[8px] font-bold text-[18px] sm:h-[56px] sm:w-[56px] sm:text-[24px] ${
                          isCorrectRevealed ? "bg-[#26D782]" : "bg-[#F4F6FA]"
                        }`}
                        style={{ color: letterColor }}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <p
                        className={`text-[16px] font-medium sm:text-[20px] md:text-[24px] lg:text-[28px] ${optionTextColor}`}
                      >
                        {opt}
                      </p>
                    </div>

                    {showCheck ? (
                      <div className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full sm:h-[36px] sm:w-[36px]">
                        <img src={mark} alt="" />
                      </div>
                    ) : showCross ? (
                      <div className="flex h-[28px] w-[28px] flex-shrink-0 items-center justify-center rounded-full sm:h-[36px] sm:w-[36px]">
                        <img src={wrong} alt="" />
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Error message */}
            {showError && (
              <div className="mt-4 flex items-center gap-2 text-red-500">
                <img
                  src={errorIcon}
                  alt="Error"
                  className="h-[24px] w-[24px] sm:h-[32px] sm:w-[32px]"
                />
                <p
                  className={`text-[14px] font-normal sm:text-[18px] md:text-[24px] ${
                    isDark ? "text-[#EE5454]" : "text-[#EE5454]"
                  }`}
                >
                  Please select an answer
                </p>
              </div>
            )}

            <button
              onClick={() => {
                if (selectedOptionIndex === null) {
                  setShowError(true);
                  return;
                }

                setShowError(false);
                setSubmitted(true);

                const isLastQuestion = qIndex >= 9;
                if (isLastQuestion) setIsLoading(true);

                const isCorrect =
                  question.options[selectedOptionIndex] === question.answer;

                const finalScore = isCorrect ? score + 1 : score;
                setScore(finalScore);

                setTimeout(
                  () => {
                    if (isLastQuestion) {
                      navigate("/score", {
                        state: {
                          score: finalScore,
                          stateName,
                          stateImg,
                        },
                      });
                    } else {
                      setQIndex((prev) => prev + 1);
                      setSelectedOptionIndex(null);
                      setSubmitted(false);
                      setShowError(false);
                    }
                  },
                  isLastQuestion ? 1500 : 600,
                );
              }}
              disabled={isLoading}
              className="mt-6 flex h-[56px] w-full items-center justify-center gap-3 rounded-[12px] bg-[#A729F5] text-[18px] font-medium text-white transition-colors hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-80 sm:mt-8 sm:h-[64px] sm:text-[22px] md:h-[92px] md:rounded-[24px] md:text-[28px]"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent sm:h-6 sm:w-6" />
                  Loading...
                </>
              ) : (
                "Submit Answer"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen loading overlay before navigating to the next question/page */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#A729F5] border-t-transparent sm:h-20 sm:w-20" />
        </div>
      )}
    </div>
  );
};

export default Question;
