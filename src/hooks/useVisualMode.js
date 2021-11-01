import { useState } from 'react'

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial])
  function transition(nextMode, replace = false) {
    setMode(nextMode)
    if (replace) {
      setHistory(prev => [prev[0]])
    }
    setHistory(prev => [...prev, nextMode])
  }
  function back() {
    history.pop()
    if (history.length) {
      const prevMode = history[history.length - 1]
      setMode(prevMode)
    }
  }
  return { mode, transition, back }
}

// import { useState } from "react";

// const useVisualMode = (initial) => {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);

//   const transition = (changedMode, replace = false) => {
//     if (replace) {
//       history.pop();
//       setMode(changedMode);
//       setHistory(prev => [...prev, changedMode]);
//     };

//     setMode(changedMode);
//     setHistory(prev => [...prev, changedMode]);
//     console.log("HISTORY", history)
//   };

//   const back = () => {
//     if (history.length > 1) {
//       history.pop();
//       const lastIndex = (history.length - 1);
//       setMode(history[lastIndex]);
//     };
//   };

//   return { mode, transition, back };
// }

// export default useVisualMode;