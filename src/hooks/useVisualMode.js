import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(nextMode, replace = false) {
    setMode(nextMode);
    if (replace) {
      setHistory(prev => [prev[0]]);
    };
    setHistory(prev => [...prev, nextMode]);
  }

  function back() {
    let historyCopy = [...history];
    historyCopy.pop();
    if (historyCopy.length) {
      const prevMode = historyCopy[historyCopy.length - 1];
      setMode(prevMode);
      setHistory(historyCopy)
    };
  };
  
  return { mode, transition, back };
}

// function back() {
  // copy history and then modify
  // history.pop();
  // if (history.length) {
    // const prevMode = history[history.length - 1];
    // setMode(prevMode);
  // };
// };