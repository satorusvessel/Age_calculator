import React, { useState, useRef } from "react";
import iconarrow from "../assets/iconarrow.png";

export const Card = () => {
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  let today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1; // JavaScript months are 0-based, so we add 1
  let currentYear = today.getFullYear();

  const calculateAge = () => {
    let birthDay = parseInt(dayRef.current.value);
    let birthMonth = parseInt(monthRef.current.value);
    let birthYear = parseInt(yearRef.current.value);

    let years = currentYear - birthYear;
    let months = 0;
    let days = 0;

    if (birthMonth > currentMonth) {
      years--;
      months = 12 - birthMonth + currentMonth;
    } else {
      months = currentMonth - birthMonth;
    }

    if (birthDay > currentDay) {
      months--;
      days = 30 - birthDay + currentDay; // assuming all months have 30 days
    } else {
      days = currentDay - birthDay;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="bg-white h-auto w-[650px] mx-auto justify-center rounded-br-[100px] rounded-xl p-7">
      <div className="flex flex-col gap-0">
        <div className="flex gap-[53PX] mt-4">
          <label
            for="html"
            className="w-[100px] text-slate-500 text-sm font-semibold"
          >
            DAY
          </label>
          <label
            for="html"
            className="w-[100px] text-slate-500 text-sm font-semibold"
          >
            MONTH
          </label>
          <label
            for="html"
            className="w-[100px] text-slate-500 text-sm font-semibold"
          >
            YEAR
          </label>
        </div>
        <div className="flex gap-6">
          <input
            ref={dayRef}
            placeholder="DD"
            className="border-2 border-slate-400 w-[130px] h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold"
          />
          <input
            ref={monthRef}
            placeholder="MM"
            className="border-2 border-slate-400 w-[130px] h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold"
          />
          <input
            ref={yearRef}
            placeholder="YYYY"
            className="border-2 border-slate-400 w-[130px] h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold"
          />
        </div>
        <div className="justify-end mx-[500px]">
          <button
            type="submit"
            className="absolute z-20 bg-purple rounded-full w-14 h-14 flex justify-center items-center hover:bg-offBlack"
            onClick={calculateAge}
          >
            <img
              src={iconarrow}
              className="flex bg-indigo-600 rounded-full size-14 p-4"
              alt="arrow icon"
            />
          </button>
        </div>
        <div className="flex border-t-2 border-slate-300 mt-8 w-[550px]"></div>
        <div className="flex flex-col items-start justify-start p-4 gap-0">
          <h1 className="text-[80px] font-bold">
            {" "}
            <span className="text-indigo-500"> {age.years} </span> years
          </h1>
          <h1 className="text-[80px] font-bold">
            {" "}
            <span className="text-indigo-500"> {age.months} </span> months
          </h1>
          <h1 className="text-[80px] font-bold">
            {" "}
            <span className="text-indigo-500"> {age.days} </span> days
          </h1>
        </div>
      </div>
    </div>
  );
};
