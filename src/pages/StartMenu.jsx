import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import light from "../assets/light.png";
import dark from "../assets/dark.png";
import mode from "../assets/switch white.png";
import html from "../assets/html 2.png";
import css from "../assets/css 3.png";
import java from "../assets/JS.png";
import acc from "../assets/Acc 2.png";
import { CiLight } from "react-icons/ci";
import { GoMoon } from "react-icons/go";
import { useTheme } from "../theme/ThemeContext";

const StartMenu = () => {
  const navigate = useNavigate();

  const { isDark, toggle } = useTheme();

  return (
    <>
      <div
        className={`min-h-dvh transition-colors duration-500 ${
          isDark ? "text-white" : "text-[#313E51]"
        }`}
      >
        <div
          className={`p-6 h-[812px] md:h-[1400px] md:p-18 lg:relative lg:h-[960px] ${
            isDark ? "text-white" : "text-[#313E51]"
          }`}
        >
          <div className="flex justify-end items-center gap-3">
            {light && (
              <CiLight
                src={light}
                alt="light"
                className={`w-6 h-6 ${isDark ? "text-[#626C7F]" : ""}`}
              />
            )}

            <button
              onClick={toggle}
              aria-pressed={isDark}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
              className="relative w-[60px] h-[30px] rounded-full p-[4px] bg-[#A729F5] transition-colors duration-300 focus:outline-none"
            >
              <div
                className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                  isDark ? "" : "bg-[#A729F5]"
                }`}
              />
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

            {dark && (
              <GoMoon
                src={dark}
                alt="dark"
                className={`w-6 h-6 ${isDark ? "text-[#626C7F]" : ""}`}
              />
            )}
          </div>

          <div className="mt-10">
            <h1 className="font-light text-[40px] md:text-[64px] lg:pr-40 leading-[100%]">
              Welcome to the
              <br />
              <span className="font-medium text-[40px] md:text-[64px]">
                Frontend Quiz!
              </span>
            </h1>

            <p className="mt-6 font-normal lg:ml-1 lg:mt-9 text-[14px] md:text-[20px] text-[#ABC1E1]">
              Pick a Subject to get started
            </p>
          </div>

          <div className="mt-12 md:mt-16 lg:absolute left-160 bottom-110">
            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate("/question", { state: { name: "HTML", img: html } })
              }
              className={`flex rounded-[12px] bg-[#3B4D66] lg:w-[564px] pr-9 md:rounded-[24px] p-[12px] shadow-[0_4px_20px_#313E5124] ${
                isDark ? "bg-[white] text-[#313E51]" : ""
              }`}
            >
              <img
                src={html}
                alt="HTML"
                className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] rounded-[8px] p-2 bg-[#FFF1E9]"
              />
              <p className="mt-2 text-[18px] md:text-[28px] font-medium ml-3">
                HTML
              </p>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate("/question", { state: { name: "CSS", img: css } })
              }
              className={`flex mt-4 rounded-[12px] bg-[#3B4D66] lg:w-[564px] pr-9 md:rounded-[24px] p-[12px] shadow-[0_4px_20px_#313E5124] ${
                isDark ? "bg-[white] text-[#313E51]" : ""
              }`}
            >
              <img
                src={css}
                alt=""
                className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] p-2 rounded-[6px] md:rounded-[12px] bg-[#E0FDEF]"
              />
              <p className="mt-2 text-[18px] md:text-[28px] font-medium ml-3">
                CSS
              </p>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate("/question", {
                  state: { name: "Java", img: java },
                })
              }
              className={`flex mt-4 rounded-[12px] bg-[#3B4D66] lg:w-[564px] pr-9 md:rounded-[24px] p-[12px] shadow-[0_4px_20px_#313E5124] ${
                isDark ? "bg-[white] text-[#313E51]" : ""
              }`}
            >
              <img
                src={java}
                alt=""
                className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] p-2 rounded-[6px] md:rounded-[12px] bg-[#E0FDEF]"
              />
              <p className="mt-2 text-[18px] md:text-[28px] font-medium ml-3">
                Java
              </p>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() =>
                navigate("/question", {
                  state: { name: "Accessibility", img: acc },
                })
              }
              className={`flex mt-4 rounded-[12px] bg-[#3B4D66] lg:w-[564px] pr-9 md:rounded-[24px] p-[12px] shadow-[0_4px_20px_#313E5124] ${
                isDark ? "bg-[white] text-[#313E51]" : ""
              }`}
            >
              <img
                src={acc}
                alt=""
                className="w-[40px] md:w-[56px] h-[40px] md:h-[56px] p-2 rounded-[6px] md:rounded-[12px] bg-[#F6E7FF]"
              />
              <p className="mt-2 text-[18px] md:text-[28px] font-medium ml-3">
                Accessibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
