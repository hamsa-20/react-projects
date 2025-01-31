import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  // Corrected password generation logic
  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  // Corrected copy to clipboard function
  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, password.length);
      navigator.clipboard.writeText(password).then(() => {
        alert("Password copied to clipboard!");
      });
    }
  }, [password]);

  useEffect(() => {
    passwordGen();
  }, [length, numberAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-gray-100 bg-gray-800">
        <h1 className="text-green-400 text-center my-3 font-semibold">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-gray-700">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 bg-gray-700 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-green-500 hover:bg-green-600 text-white px-3 py-1 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2 text-gray-300">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-green-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className="accent-green-500"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-green-500"
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
