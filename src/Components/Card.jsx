import React, { useState, useRef } from "react";
import iconarrow from "../assets/iconarrow.png";

export const Card = () => {
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const dayRef = useRef();
  const monthRef = useRef();
  const yearRef = useRef();

  let today = new Date();
  let currentDay = today.getDate();
  let currentMonth = today.getMonth() + 1; // JavaScript months are 0-based, so we add 1
  let currentYear = today.getFullYear();

  const validateInputs = () => {
    let birthDay = parseInt(dayRef.current.value);
    let birthMonth = parseInt(monthRef.current.value);
    let birthYear = parseInt(yearRef.current.value);
    let errors = { day: "", month: "", year: "" };
    let isValid = true;

    if (isNaN(birthDay) || birthDay < 1 || birthDay > 31) {
      errors.day = "Invalid day";
      isValid = false;
    }
    if (isNaN(birthMonth) || birthMonth < 1 || birthMonth > 12) {
      errors.month = "Invalid month";
      isValid = false;
    }
    if (isNaN(birthYear) || birthYear > currentYear || birthYear < 1900) {
      errors.year = "Invalid year";
      isValid = false;
    }
    if (birthMonth === 2 && birthDay > 29) {
      errors.day = "Invalid day for February";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) {
      return;
    }

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
    <div className="bg-white h-auto w-full max-w-lg mx-auto p-7 rounded-br-[100px] rounded-xl md:w-[650px]">
      <div className="flex flex-col gap-0">
        <div className="flex flex-col gap-4 md:flex-row md:gap-[53px] mt-4">
          <label
            htmlFor="day"
            className={`w-[100px] text-sm font-semibold ${
              errors.day ? "text-red-500" : "text-slate-500"
            }`}
          >
            DAY
          </label>
          <label
            htmlFor="month"
            className={`w-[100px] text-sm font-semibold ${
              errors.month ? "text-red-500" : "text-slate-500"
            }`}
          >
            MONTH
          </label>
          <label
            htmlFor="year"
            className={`w-[100px] text-sm font-semibold ${
              errors.year ? "text-red-500" : "text-slate-500"
            }`}
          >
            YEAR
          </label>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <div>
            <input
              ref={dayRef}
              id="day"
              placeholder="DD"
              className="border-2 border-slate-400 w-full h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold md:w-[130px]"
              required
            />
            {errors.day && <p className="text-red-500 text-sm">{errors.day}</p>}
          </div>
          <div>
            <input
              ref={monthRef}
              id="month"
              placeholder="MM"
              className="border-2 border-slate-400 w-full h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold md:w-[130px]"
              required
            />
            {errors.month && (
              <p className="text-red-500 text-sm">{errors.month}</p>
            )}
          </div>
          <div>
            <input
              ref={yearRef}
              id="year"
              placeholder="YYYY"
              className="border-2 border-slate-400 w-full h-[50px] mt-2 p-4 rounded-md placeholder:text-3xl placeholder:font-bold md:w-[130px]"
              required
            />
            {errors.year && (
              <p className="text-red-500 text-sm">{errors.year}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center mt-4 md:justify-end">
          <button
            type="submit"
            className="relative z-20 bg-purple rounded-full w-14 h-14 flex justify-center items-center hover:bg-offBlack"
            onClick={calculateAge}
          >
            <img
              src={iconarrow}
              className="flex bg-indigo-600 rounded-full size-14 p-4"
              alt="arrow icon"
            />
          </button>
        </div>
        <div className="flex border-t-2 border-slate-300 mt-8 w-full md:w-[550px] mx-auto"></div>
        <div className="flex flex-col items-start justify-start p-4 gap-0">
          <h1 className="text-[40px] md:text-[80px] font-bold">
            <span className="text-indigo-500">{age.years}</span> years
          </h1>
          <h1 className="text-[40px] md:text-[80px] font-bold">
            <span className="text-indigo-500">{age.months}</span> months
          </h1>
          <h1 className="text-[40px] md:text-[80px] font-bold">
            <span className="text-indigo-500">{age.days}</span> days
          </h1>
        </div>
      </div>
    </div>
  );
};
