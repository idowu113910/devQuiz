import React, { useEffect, useState } from "react";
import light from "../assets/light.png";
import dark from "../assets/dark.png";
import mode from "../assets/switch white.png";
import acc from "../assets/Acc 2.png";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";

const Score = () => {
  const navigate = useNavigate();

  const { state } = useLocation();

  const finalScore = state?.score ?? 0;
  const stateName = state?.stateName ?? "";
  const stateImg = state?.stateImg ?? "";

  useEffect(() => {
    // If someone reached this page without state (direct URL), you might want to redirect back.
    // Uncomment to force redirect:
    // if (state?.score === undefined) navigate("/", { replace: true });
  }, [state, navigate]);

  const [isDark, setIsDark] = useState(() => {
    // read from localStorage on first render only
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default to dark if nothing saved
  });

  const topicKey = (stateName || "Accessibility").toString().toLowerCase();
  useEffect(() => {
    // whenever isDark changes, sync to localStorage and <html data-theme="">
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  const [score, setScore] = useState(0);

  return (
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

      <div className="flex flex-col lg:flex-row items-start md:items-start lg:items-start md:justify-center lg:justify-between gap-6 md:gap-10 p-5 lg:mt-8">
        {/* Left side: Quiz completed and You scored */}
        <div className="flex flex-col text-left md:text-left lg:text-left lg:justify-start">
          <h4 className="font-light text-[40px] md:text-[64px]">
            Quiz completed
          </h4>
          <p className="font-medium text-[40px] md:text-[64px]">
            You scored...
          </p>
        </div>

        {/* Right side: Score card */}
        <div
          className={`flex flex-col justify-center items-center shadow-[0_4px_10px_#313E5124] md:shadow-[0_4px_10px_rgba(143,160,193,0.14)] rounded-[12px] md:rounded-[24px] p-[32px] md:p-[48px] w-[327px] md:w-[640px] lg:w-[564px] h-[250px] md:h-[388px] border ${
            isDark ? "border-white bg-[#ffffff]" : "border-[#3B4D66]"
          }`}
        >
          <div className="flex items-center">
            <img
              src={stateImg || acc}
              alt=""
              className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] p-2 rounded-[6px] md:rounded-[12px] bg-[#F6E7FF]"
            />
            <p className="mt-2 text-[18px] md:text-[28px] font-medium ml-3">
              {stateName || "Accessibility"}
            </p>
          </div>

          <p
            className={`font-medium text-[88px] md:text-[144px] ${
              isDark ? "text-[#313E51]" : "text-[white]"
            }`}
          >
            {finalScore}
          </p>

          <p className="text-[18px] md:text-[24px] font-normal text-[#ABC1E1]">
            out of 10
          </p>
        </div>
      </div>

      {/* Button: Keep below everything, centered */}
      <div className="flex justify-center md:justify-center lg:justify-end lg:-mx-5">
        <button
          onClick={() => {
            navigate("/");
            setQIndex(0);
            setScore(0);
            setSelectedOptionIndex(null);
            setSubmitted(false);
            setShowError(false);
          }}
          className="rounded-[12px] ml-4 md:rounded-[24px] md:mr-72 lg:mr-8 shadow-[0_4px_10px_rgba(143,160,193,0.14)] bg-[#A729F5] text-white p-[12px] md:p-[32px] w-[327px] md:w-[640px] lg:w-[564px] text-[18px] md:text-[28px] font-medium h-[56px] md:h-[92px]"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Score;
