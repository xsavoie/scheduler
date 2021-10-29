import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (changedMode, replace = false) => {
    if (replace) {
      history.pop()
      setHistory([...history, changedMode])
    }

    setMode(changedMode);
    setHistory([...history, changedMode])
  };

  const back = () => {
    if (history.length > 1) {
      history.pop()
      const lastIndex = (history.length - 1)
      setMode(history[lastIndex])
    }
  }

  return { mode, transition, back };
}

export default useVisualMode;