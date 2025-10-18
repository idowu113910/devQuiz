import React, { useEffect, useState } from "react";
import light from "../assets/light.png";
import dark from "../assets/dark.png";
import mode from "../assets/switch white.png";
import acc from "../assets/Acc 2.png";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import A from "../assets/A.png";
import B from "../assets/B.png";
import C from "../assets/C.png";
import D from "../assets/D.png";
import data from "../data/data.json";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import errorIcon from "../assets/cancel img.png";

const Question = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const stateName = location?.state?.name;
  const stateImg = location?.state?.img;
  const topicKey = (stateName || "Accessibility").toString().toLowerCase();
  const [showError, setShowError] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const selectedTopic = useMemo(
    () => data.find((t) => t.title.toString().toLowerCase() === topicKey),
    [data, topicKey]
  );

  const safeTopic = selectedTopic || data[0];
  const [qIndex, setQIndex] = useState(0);

  useEffect(() => {
    setQIndex(0);
  }, [topicKey]);

  const question = safeTopic.questions?.[qIndex];

  // =  ====

  const handleSubmit = () => {
    if (selectedOptionIndex === null) return;
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      selectedOptionIndex(null);
    });
  };

  // Add this useEffect at the top of your component
  useEffect(() => {
    setSelectedOptionIndex(null);
    setSubmitted(false);
    setShowError(false);
  }, [qIndex]); // Reset whenever question index changes
  // ========

  const optionImgs = [A, B, C, D];

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // =================

  const [isDark, setIsDark] = useState(() => {
    // read from localStorage on first render only
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark if nothing saved
  });

  useEffect(() => {
    // whenever isDark changes, sync to localStorage and <html data-theme="">
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <>
      <div
        className={`p-2 h-[812px] md:h-[1400px] md:p-4 lg:p-8 lg:relative lg:h-[1700px] transition-colors duration-500 ${
          isDark ? "bg-[#F4F6FA] text-[#313E51]" : "bg-[#313E51] text-white"
        }`}
      >
        <div className="flex mt-4  ml-4 md:ml-7 lg:w-[564px]">
          <img
            src={stateImg || acc}
            alt=""
            className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] ml-1  p-2  rounded-[6px] md:rounded-[12px] bg-[#F6E7FF]"
          />
          <p className="mt-2 text-[18px]  md:text-[28px] font-medium ml-3">
            {stateName || "Accessibility"}
          </p>
        </div>

        <div className="flex justify-end items-center relative bottom-8 right-2 md:right-5 gap-3">
          {light && <CiLight src={light} alt="light" className="w-6 h-6" />}

          {/* Toggle */}
          <button
            onClick={toggle}
            aria-pressed={isDark}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-[60px] h-[30px] rounded-full p-[4px] bg-[#A729F5] transition-colors duration-300 focus:outline-none"
          >
            {/* Track background changes with theme */}
            <div
              className={`absolute inset-0  rounded-full transition-colors duration-300 ${
                isDark ? "" : "bg-[#A729F5]"
              }`}
            />

            {/* Handle */}
            <div
              className={`relative z-10 w-[22px] h-[22px] bg-white rounded-full transform transition-transform duration-300 ${
                isDark ? "translate-x-0" : "translate-x-[28px]"
              }`}
            >
              {mode ? (
                <img
                  src={mode}
                  alt="switch"
                  className="w-[12px] h-[12px] mx-auto my-auto pointer-events-none"
                />
              ) : (
                <span className="block text-[10px] text-center leading-[22px]">
                  {isDark ? "🌙" : "☀️"}
                </span>
              )}
            </div>
          </button>

          {dark && <GoMoon src={dark} alt="dark" className="w-6 h-6 " />}
        </div>

        <div>
          <p
            className={`font-normal text-[14px] md:text-[20px] p-5.5 md:ml-2 pr-1 ${
              isDark ? " text-[#626C7F]" : "text-[#ABC1E1]"
            }`}
          >
            Question {qIndex + 1} of {safeTopic.questions.length}
          </p>

          <p
            className={`font-medium text-[20px] ml-5 md:ml-7 lg:w-[465px] md:text-[36px] ${
              isDark ? "text-[#313E51]" : "text-[#FFFFFF]"
            }`}
          >
            {question.question}
          </p>
        </div>

        <div className="p-5 mt-3">
          <div
            className={`w-[327px] lg:w-[465px] md:w-[640px] md:mb-14 rounded-[999px] lg:relative top-40 h-[16px] p-[4px] ${
              isDark ? "bg-[#FFFFFF]" : "bg-[#3B4D66]"
            }`}
          >
            <div className="w-[152px] lg:w-[300px] md:w-[300px] bg-[#A729F5] rounded-[104px] h-[8px]"></div>
          </div>
        </div>

        {/* options container */}
        {/* Parent container: on desktop align to the right */}
        <div className="w-full flex flex-col lg:items-end lg:pr-16 lg:relative lg:overflow">
          {/* Options container: limit width so options don't grow full width on desktop */}
          <div className="w-full max-w-[640px] lg:w-[564px] lg:h-[440px] lg:h-fixed  lg:relative bottom-[285px]">
            {question?.options?.map((opt, idx) => {
              const imgSrc = optionImgs[idx];
              const isSelected = idx === selectedOptionIndex;
              const isCorrect = opt === question.answer;

              // Use ring (doesn't change layout) and a transparent default border to keep box size stable
              const base =
                "flex items-center gap-3 rounded-[12px] md:ml-5 md:mt-6 md:rounded-[24px] p-1 md:p-4 shadow-[0_4px_20px_#313E5124] cursor-pointer box-border transition-all duration-200";
              // consistent height so text/image changes don't move other elements
              const size = "min-h-[72px] md:min-h-[96px]";

              // theme for inner background/text
              const themeInner = isDark
                ? "bg-white text-[#313E51]"
                : "bg-[#3B4D66] text-white";

              // keep a transparent border so toggling border doesn't change layout
              // but prefer ring for visual emphasis (ring is outside layout)
              let ringClass = "ring-0 ring-transparent";
              let imgBg = "bg-[#F4F6FA]";

              if (isSelected) {
                if (isCorrect) {
                  ringClass = "ring-4 ring-[#26D782]/90"; // green ring
                  imgBg = "bg-[#26D782]";
                } else {
                  ringClass = "ring-4 ring-[#EE5454]/90"; // red ring
                  imgBg = "bg-[#EE5454]";
                }
              } else if (submitted && isCorrect) {
                // show correct after submission
                ringClass = "ring-4 ring-[#26D782]/90";
                imgBg = "bg-[#26D782]";
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (!submitted) setSelectedOptionIndex(idx);
                    setShowError(false);
                  }}
                  // ensure border is always there but transparent by default to preserve layout:
                  className={`${base} ${size} ${themeInner} border-[3px] border-transparent ${ringClass} w-[327px] lg:w-[564px] md:w-[640px] mx-auto mb-4`}
                >
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={`option-${idx}`}
                      className={`w-[56px] h-[56px]  md:w-[56px] md:h-[56px] rounded-[8px] p-5 ${imgBg} flex-shrink-0`}
                    />
                  ) : (
                    <div
                      className={`w-[56px] h-[56px] md:w-[56px] md:h-[56px] mx-auto rounded-[8px] p-2 md:p-2 flex items-center mr-4 justify-center ${imgBg} `}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                  )}
                  <p className="text-[18px] md:text-[28px] font-medium ml-2 md:ml-4">
                    {opt}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Submit button aligned to the right on large screens */}
          <button
            onClick={() => {
              if (selectedOptionIndex === null) {
                setShowError(true);
                return;
              }

              setShowError(false);
              setSubmitted(true);

              // compute correctness and finalScore synchronously
              const isCorrect =
                question.options[selectedOptionIndex] === question.answer;

              const finalScore = isCorrect ? score + 1 : score;

              // update state so in-memory score stays correct
              setScore(finalScore);

              setTimeout(() => {
                if (qIndex >= 9) {
                  // Navigate to score page with the computed finalScore
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
              }, 1500);
            }}
            className="bg-[#A729F5] w-[327px] mx-auto lg:relative bottom-[150px] left-[42px] md:mx-5 md:w-[640px] lg:ml-auto lg:w-[564px] h-[56px] md:h-[92px] text-white text-[18px] md:text-[28px] font-medium rounded-[12px] md:rounded-[24px] hover:bg-purple-600 transition-colors"
          >
            Submit Answer
          </button>
        </div>

        {/* Error message */}
        {showError && (
          <div className="flex items-center  gap-2 ml-14 mt-4 text-red-500">
            <img src={errorIcon} alt="Error" className="w-[32px] h-[32px]" />
            <p
              className={`text-[18px] md:text-[24px] font-normal ${
                isDark ? "text-[#EE5454]" : "text-[#FFFFFF]"
              }`}
            >
              Please select an answer
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
