import React from "react";
import acc from "../assets/Acc 2.png";
import mode from "../assets/switch white.png";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { useTheme } from "../theme/ThemeContext";

const Score = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { isDark, toggle } = useTheme();

  const finalScore = state?.score ?? 0;
  const stateName = state?.stateName ?? "";
  const stateImg = state?.stateImg ?? "";

  return (
    <div
      className={`min-h-dvh w-full transition-colors duration-500 ${
        isDark ? "bg-[#313E51] text-white" : "bg-[#F4F6FA] text-[#313E51]"
      }`}
    >
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
            <CiLight className="h-6 w-6" />

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

            <GoMoon className="h-6 w-6" />
          </div>
        </div>

        {/* Main content: heading on the left, score card on the right at lg+ */}
        <div className="mt-10 flex flex-col items-start gap-8 sm:mt-14 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left: heading */}
          <div className="flex flex-col text-left">
            <h4 className="text-[32px] font-light sm:text-[44px] md:text-[56px] lg:text-[64px]">
              Quiz completed
            </h4>
            <p className="text-[32px] font-medium sm:text-[44px] md:text-[56px] lg:text-[64px]">
              You scored...
            </p>
          </div>

          {/* Right: score card */}
          <div
            className={`flex w-full flex-col items-center justify-center rounded-[12px] border p-6 shadow-[0_4px_10px_#313E5124] sm:p-8 md:rounded-[24px] md:p-10 lg:w-[564px] xl:w-[640px] ${
              isDark
                ? "border-white bg-white"
                : "border-[#3B4D66] bg-transparent"
            }`}
          >
            <div className="flex w-full items-center">
              <img
                src={stateImg || acc}
                alt=""
                className="h-10 w-10 flex-shrink-0 rounded-[6px] bg-[#F6E7FF] p-2 sm:h-12 sm:w-12 md:h-14 md:w-14 md:rounded-[12px]"
              />
              <p
                className={`ml-3 text-[18px] font-medium sm:text-[22px] md:text-[28px] ${
                  isDark ? "text-[#313E51]" : "text-white"
                }`}
              >
                {stateName || "Accessibility"}
              </p>
            </div>

            <p
              className={`mt-4 text-[64px] font-medium leading-none sm:mt-6 sm:text-[96px] md:text-[128px] lg:text-[144px] ${
                isDark ? "text-[#313E51]" : "text-[#313E51]"
              }`}
            >
              {finalScore}
            </p>

            <p className="mt-2 text-[16px] font-normal text-[#ABC1E1] sm:text-[20px] md:text-[24px]">
              out of 10
            </p>
          </div>
        </div>

        {/* Play again button */}
        <div className="mt-10 flex justify-center sm:mt-12 lg:mt-16 lg:justify-end">
          <button
            onClick={() => navigate("/")}
            className="h-[56px] w-full max-w-[564px] rounded-[12px] bg-[#A729F5] text-[18px] font-medium text-white shadow-[0_4px_10px_rgba(143,160,193,0.14)] transition-colors hover:bg-purple-600 sm:h-[64px] sm:text-[22px] md:h-[92px] md:rounded-[24px] md:text-[28px] lg:w-[564px] xl:w-[640px]"
          >
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Score;
