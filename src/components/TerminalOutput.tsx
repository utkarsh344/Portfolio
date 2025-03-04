import React from "react";

interface TerminalOutputProps {
  children: React.ReactNode;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ children }) => {
  return <div className="whitespace-pre-wrap break-words">{children}</div>;
};

export default TerminalOutput;