import React, { SetStateAction } from "react";

// Sample data structure
const data = {
  options: [
    { label: "about", about: "To know about me", value: "About me content" },
    { label: "skills", about: "To know about my skills", value: "Skills content" }
  ],
  additional_commands: [
    { label: "help", about: "View all commands" },
    { label: "clear", about: "Clear the screen" }
  ]
};

export const executeCommand = (
  command: string,
  setOutputs: React.Dispatch<SetStateAction<JSX.Element[]>>,
  setTheme: React.Dispatch<SetStateAction<string>>
): JSX.Element => {
  const cmd = command.toLowerCase().trim();
  const args = cmd.split(" ");
  const mainCommand = args[0];

  if (mainCommand === "clear") {
    setOutputs([]);
    return React.createElement(React.Fragment, null);
  }

  if (mainCommand === "help") {
    return React.createElement("div", null, "Type a command to get started");
  }

  if (mainCommand === "theme") {
    const newTheme = args[1]?.toLowerCase();
    if (newTheme && ["ubuntu", "matrix", "arch"].includes(newTheme)) {
      document.documentElement.classList.remove("ubuntu", "matrix", "arch");
      document.documentElement.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
      return React.createElement("div", null, `Theme changed to ${newTheme}`);
    }
    return React.createElement("div", null, "Usage: theme [ubuntu|matrix|arch]");
  }

  // Default case
  const option = data.options.find(
    (opt) => opt.label.toLowerCase() === mainCommand
  );

  if (option) {
    return React.createElement("div", null, option.value);
  }

  return React.createElement("div", null, 
    `Command not found: ${mainCommand}. Type 'help' to see available commands.`
  );
};