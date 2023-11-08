import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./AgeCalculatorStyles.css";

function AgeCalculator() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const today = new Date();
  const datePickerRef = useRef(null);
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });

  useEffect(() => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true); // This focuses the input
    }
    if (birthDate > today) {
      setBirthDate("");
      setError("Enetred date is wrong");
    }
  }, [age, birthDate, today]);

  const calculateAge = () => {
    if (!birthDate) {
      setError("Please enter your date of birth");
    }

    const birthDateObj = new Date(birthDate);
    
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    // Adjust for negative values
    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({
      years,
      months,
      days,
    });
  };

  return (
    <div className="container">
      <div className="calculator">
        <h1>Age Calculator</h1>
        <DatePicker
          selected={birthDate}
          onChange={(date) => [setBirthDate(date), setError("")]}
          dropdownMode="select"
          showMonthDropdown
          showYearDropdown
          adjustDateOnChange
          placeholderText="Enter your birth date"
          className="custom-datepicker"
          // ref={datePickerRef}
          open={true}
        />
        <div className="bottom-area">
          {age.days > 0 || age.months > 0 || age.years > 0 ? (
            <>
              <div className="age-result">
                You are {age.years} years, {age.months} months, {age.days} days
                old
              </div>
              <button
                className="calculator-button"
                onClick={() => [
                  setAge({ years: 0, months: 0, days: 0 }),
                  setBirthDate(""),
                ]}
              >
                Clear
              </button>
            </>
          ) : (
            <>
              <div className="error">{error}</div>
              <button className="calculator-button" onClick={calculateAge}>
                Calculate Age
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
