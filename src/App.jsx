import {useCallback, useEffect, useRef, useState} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [value, setValue] = useState(0);
  const valueref = useRef(null);
  const newlength = (event) => {
    setLength(Number(event.target.value));
  };
  const numbercheck = (event) => {
    setNumber(event.target.checked);
  };
  const charactercheck = (event) => {
    setCharacter(event.target.checked);
  };
  const calculate = useCallback(() => {
    const uppercaseAlphabets = Array.from({length: 26}, (_, i) =>
      String.fromCharCode(i + 65)
    );
    const lowercaseAlphabets = Array.from({length: 26}, (_, i) =>
      String.fromCharCode(i + 97)
    );
    let combinedAlphabets = [...uppercaseAlphabets, ...lowercaseAlphabets];
    const digits = Array.from({length: 10}, (_, i) => i.toString());
    const specialCharacters = [
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "=",
      "+",
      "_",
      "{",
      "}",
      "[",
      "]",
      "|",
      ";",
      ":",
      '"',
      "'",
      "<",
      ">",
      ",",
      ".",
      "/",
      "?",
    ];
    if (number) {
      combinedAlphabets = [...combinedAlphabets, ...digits];
    }
    if (character) {
      combinedAlphabets = [...combinedAlphabets, ...specialCharacters];
    }
    let neww = "";
    for (let i = 0; i < length; i++) {
      let m = Math.floor(Math.random() * combinedAlphabets.length);
      neww += combinedAlphabets[m];
    }
    setValue(neww);
  }, [length, number, character]);
  useEffect(() => {
    calculate();
  }, [calculate]);
  const copy = () => {
    navigator.clipboard.writeText(valueref.current.value);
    valueref.current.select();
  };
  return (
    <div className="h-screen w-screen bg-rose-700 flex flex-col justify-center place-items-center">
      <h2 className="text-5xl pb-7 font-extrabold text-pretty font-serif text-white">
        Password Generator
      </h2>
      <div className="h-72 w-[700px] bg-emerald-800 rounded-xl border-white border-4">
        <div className="flex w-[650px] justify-center pt-24">
          <input
            type="text"
            className="w-96 h-10 rounded-tl-3xl rounded-bl-3xl pl-3 focus:outline-none hover:bg-green-200"
            value={value}
            readOnly
            ref={valueref}
          />
          <button
            className="bg-blue-800 rounded-tr-lg rounded-br-lg w-16 text-white h-10 text-xl text-center font-serif hover:text-blue-400 hover:bg-orange-400"
            onClick={copy}
          >
            Copy
          </button>
        </div>
        <div className="w-[650px] flex justify-center pt-10 text-white text-xl font-sans">
          <label htmlFor="range" className="pr-1">
            Length :{length}
          </label>
          <input
            type="range"
            name="range"
            id="range"
            className="transform scale-100"
            value={length}
            onChange={newlength}
          />
          <label htmlFor="check1" className="pr-2 pl-3">
            Number
          </label>
          <input
            type="checkbox"
            name="check1"
            id="check1"
            className="transform scale-125"
            onChange={numbercheck}
          />
          <label htmlFor="check2" className="pr-2 pl-3">
            Character{" "}
          </label>
          <input
            type="checkbox"
            name="check2"
            id="check2"
            className="transform scale-125"
            onChange={charactercheck}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
