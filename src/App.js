import React, { useState } from "react";

import "./App.css";
import Header from "./Components/Header";
import KeyPad from "./KayPad/KeyPad";

import moonIcon from './assest/moon.png';
import sunIcon from './assest/sun.png';

const App = () => {
  const usedKeyCodes = [
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
  ];
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operators = ["-", "+", "*", "/"];

  const [isDarkMode,setIsDarkMode]=useState(false);
  const [expression,setExpression]=useState('');
  const [result,setResult]=useState('');
  const [history,setHistory]=useState([]);

  const handleKeyPress = (keyCode,key) => {
    if(!keyCode)return;
    if(!usedKeyCodes.includes(keyCode))return;

    if(numbers.includes(key)){
      if(key === "0"){
        if(expression.length === 0)return 
      }
      calculateResult(expression+key);
      setExpression(expression + key)

    }else if(operators.includes(key)){
      if(!expression)return

      const lastChar = expression.slice(-1)
      if(operators.includes(lastChar))return
      if(lastChar === '.')return
      setExpression(expression + key)

    }else if(keyCode === 13){
      if(!expression)return
      calculateResult(expression);

      const tempHistory = [...history]
      if(history.length>20)tempHistory=tempHistory.splice(0,1);
      tempHistory.push(expression);
      setHistory(tempHistory);

    }else if(key === "."){
      if(!expression)return
      const lastChar = expression.slice(-1)
      if(!numbers.includes(lastChar))return

      setExpression(expression + key);
    }else if(keyCode === 8){
      if(!expression)return
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1))
    }
  }

  const calculateResult=(exp)=>{
    if(!exp)return;
    const lastChar = exp.slice(-1);
    if(!numbers.includes(lastChar))exp=exp.slice(0,-1)

    const answer = eval(exp).toFixed(2) + "";
    setResult(answer);
  };


  return (
    <div
      tabIndex="0"
      onKeyDown={(event)=>handleKeyPress(event.keyCode,event.key)}
      className="bg-info d-flex justify-content-center align-items-center app"
      style={{ height: "100vh" }} data-theme={isDarkMode ? "dark" : ""}
    >
      <div className="app_calculator">
        <div className="app_calculator_nav">
          <div className="app_calculator_nav_toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
            <div className={`app_calculator_nav_toggle_circle ${isDarkMode ? "app_calculator_nav_toggle_circle_active" : ""}`}></div>
          </div>
          <img src={isDarkMode ? moonIcon : sunIcon} alt="mode" />
        </div>
        <Header expression={expression} result={result} history={history}/>
        <KeyPad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
  );
};

export default App;
