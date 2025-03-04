import React, { useState, useEffect, KeyboardEvent, SetStateAction } from "react";
import { username, hostname, path, symbol, themes } from "../constants";
import { executeCommand } from "../utils/commandHandler";

interface TerminalInputProps {
  setOutputs: React.Dispatch<SetStateAction<JSX.Element[]>>;
  history: string[];
  setHistory: React.Dispatch<SetStateAction<string[]>>;
  historyIndex: number;
  setHistoryIndex: React.Dispatch<SetStateAction<number>>;
  theme: string;
  setTheme: React.Dispatch<SetStateAction<string>>;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  setOutputs,
  history,
  setHistory,
  historyIndex,
  setHistoryIndex,
  theme,
  setTheme,
}) => {
  const [input, setInput] = useState<string>("");
  const [inputWidth, setInputWidth] = useState<number>(1);

  useEffect(() => {
    setInputWidth(Math.max(1, input.length));
  }, [input]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const command = input.trim();
      
      if (command) {
        // Add command to history
        setHistory([...history, command]);
        setHistoryIndex(history.length + 1);
        
        // Execute command
        const output = executeCommand(command, setOutputs, setTheme);
        
        // Add command output
        setOutputs((prev) => [
          ...prev,
          <div key={`input-${prev.length}`} className="flex">
            <span className="text-shebang">
              {username}@{hostname}:{path}
            </span>
            <span className="text-symbol ml-1">{symbol}</span>
            <span className="text-command ml-1">{command}</span>
          </div>,
          <div key={`output-${prev.length}`}>{output}</div>,
        ]);
      } else {
        // Empty command, just add a new prompt line
        setOutputs((prev) => [
          ...prev,
          <div key={`input-${prev.length}`} className="flex">
            <span className="text-shebang">
              {username}@{hostname}:{path}
            </span>
            <span className="text-symbol ml-1">{symbol}</span>
          </div>,
        ]);
      }
      
      // Clear input
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0 && historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(history.length);
        setInput("");
      }
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-shebang">
        {username}@{hostname}:{path}
      </span>
      <span className="text-symbol ml-1">{symbol}</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="ml-1 bg-transparent border-none outline-none text-command w-full"
        autoFocus
        style={{ width: `${inputWidth}ch` }}
      />
    </div>
  );
};

export default TerminalInput;