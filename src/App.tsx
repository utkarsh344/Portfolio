import React, { useState, useEffect, useRef } from "react";

// Theme settings
const themeSettings = {
  matrix: {
    background: "bg-black",
    primaryText: "text-green-400",
    secondaryText: "text-green-500",
    highlightText: "text-green-300",
    commandColor: "text-yellow-400",
    promptColor: "text-green-400",
    linkColor: "text-blue-400",
    headerBg: "bg-gray-900"
  },
  ubuntu: {
    background: "bg-purple-900",
    primaryText: "text-white",
    secondaryText: "text-orange-300",
    highlightText: "text-orange-200",
    commandColor: "text-yellow-300",
    promptColor: "text-orange-400",
    linkColor: "text-blue-300",
    headerBg: "bg-purple-800"
  },
  arch: {
    background: "bg-gray-900",
    primaryText: "text-blue-400",
    secondaryText: "text-blue-300",
    highlightText: "text-blue-200",
    commandColor: "text-green-300",
    promptColor: "text-blue-500",
    linkColor: "text-indigo-300",
    headerBg: "bg-gray-800"
  }
};

// Personalized commands with icons based on resume
const availableCommands = [
  { icon: "☀️", cmd: "about", desc: "- Security Analyst & DevSecOps Engineer" },
  { icon: "🌐", cmd: "socials", desc: "- LinkedIn & GitHub profiles" },
  { icon: "📋", cmd: "skills", desc: "- Security Tools, DevOps & Cloud expertise" },
  { icon: "🚀", cmd: "projects", desc: "- CI/CD Pipeline & File-Guardian" },
  { icon: "📄", cmd: "resume", desc: "- Download my professional resume" },
  { icon: "🧠", cmd: "experience", desc: "- CHORDIFY & THE CYBERHOST internships" },
  { icon: "🎯", cmd: "achievements", desc: "- TryHackMe Top 5% & Hackathons" },
  { icon: "🖼️", cmd: "contact", desc: "- Email: utkarshjoshi135@gmail.com" },
  { icon: "✏️", cmd: "clear", desc: "- Clear the terminal" },
  { icon: "⚙️", cmd: "theme", desc: "- Change the terminal theme" }
];

function App() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<JSX.Element[]>([
    <div key="welcome" className="text-center mb-4">
      <pre className="text-cyan-500 inline-block text-left">
{`
     _    _      _                            _ 
    | |  | |    | |                          | |
    | |  | | ___| | ___ ___  _ __ ___   ___  | |
    | |/\\| |/ _ \\ |/ __/ _ \\| '_ \` _ \\ / _ \\ | |
    \\  /\\  /  __/ | (_| (_) | | | | | |  __/ |_|
     \\/  \\/ \\___|_|\\___\\___/|_| |_| |_|\\___| (_)
                                                
`}
      </pre>
      <div className="text-white">Welcome to my portfolio!</div>
      <div className="text-white">Type <span className="text-yellow-400">help</span> to get a list of available commands.</div>
      <div className="text-white">Use <span className="text-red-400">↑</span> and <span className="text-red-400">↓</span> to navigate command history.</div>
    </div>
  ]);
  const [theme, setTheme] = useState<"matrix" | "ubuntu" | "arch">("matrix");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Focus input and scroll to bottom when outputs change
  useEffect(() => {
    inputRef.current?.focus();
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [outputs]);

  // Apply theme changes
  useEffect(() => {
    document.body.className = themeSettings[theme].background;
  }, [theme]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      if (!cmd) return;
      
      // Add command to history
      setHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
      
      // Add command to output
      setOutputs(prev => [
        ...prev,
        <div key={`cmd-${Date.now()}`} className="flex">
          <span className={themeSettings[theme].promptColor}>wanderer@portfolio:~$</span>
          <span className={themeSettings[theme].primaryText}> {input}</span>
        </div>
      ]);
      
      // Process command
      processCommand(cmd.toLowerCase());
      
      // Clear input
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const processCommand = (cmd: string) => {
    const args = cmd.split(" ");
    const mainCmd = args[0];

    switch (mainCmd) {
      case "help":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].secondaryText}`}>Available commands:</div>
            {availableCommands.map((command, i) => (
              <div key={i} className="flex items-start">
                <span className="mr-2">{command.icon}</span>
                <span className={`${themeSettings[theme].commandColor} w-24`}>{command.cmd}</span>
                <span className={themeSettings[theme].primaryText}>{command.desc}</span>
              </div>
            ))}
          </div>
        ]);
        break;
      
      case "about":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`} className={`${themeSettings[theme].primaryText}`}>
            <div>Hey there! Thanks for your interest in getting to know me better.</div>
            <div className="mt-1">I'm Utkarsh Joshi, an enthusiastic Security Analyst and aspiring DevSecOps engineer from UP, India.</div>
            <div className="mt-1">Currently pursuing my Bachelor's in Computer Science at Chandigarh University (expected Aug 2025).</div>
            <div className="mt-2">With experience in automated testing, penetration testing, and cloud environments, I'm adept at:</div>
            <div className="ml-2">• Identifying critical vulnerabilities</div>
            <div className="ml-2">• Implementing secure workflows</div>
            <div className="ml-2">• Leveraging CI/CD tools to enhance software security and scalability</div>
            <div className="mt-2">My passion lies in cybersecurity and DevOps, with a focus on building secure, scalable applications.</div>
          </div>
        ]);
        break;
      
      case "skills":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`} className={`${themeSettings[theme].primaryText}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>TECHNICAL SKILLS:</div>
            <div className="mt-2">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>Security Tools:</span>
              <div className="ml-2">Burp Suite, Nmap, Metasploit, Nessus, Wireshark, Kali Linux, OpenVAS, Nikto, Hashcat</div>
            </div>
            <div className="mt-2">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>DevOps & Cloud:</span>
              <div className="ml-2">Docker, Jenkins, CI/CD, AWS, GCP, Git, Selenium, Kubernetes, Terraform</div>
            </div>
            <div className="mt-2">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>Programming & Scripting:</span>
              <div className="ml-2">Java, Python, Bash, JavaScript, HTML5/CSS3</div>
            </div>
            <div className="mt-2">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>Frameworks/Concepts:</span>
              <div className="ml-2">OSI/TCP-IP, SSL/TLS, OWASP Top 10, SIEM, Malware Analysis</div>
            </div>
          </div>
        ]);
        break;
      
      case "projects":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>PERSONAL PROJECTS:</div>
            
            <div className="mt-2">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>CI/CD PIPELINE FOR SECURE DEPLOYMENT:</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Built a CI/CD pipeline using Jenkins, Docker, and Kubernetes (AWS EKS) for automated deployments</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Used Terraform for infrastructure provisioning and SonarQube and Trivy for code and container security</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Streamlined deployments, reducing manual effort by 50% and improving scalability</div>
            </div>
            
            <div className="mt-3">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>FILE-GUARDIAN:</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Successfully integrated real-time alerts, reducing manual scan time by 50%</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Built a Python script to automate malware detection and reporting using File-Guardian API</div>
            </div>
            
            <div className="mt-3">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>HACKER-SWEEP:</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Developed a ransomware simulation using OpenSSL and a Minesweeper game in SFML</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Improved user engagement by integrating interactive tutorials on cybersecurity basics</div>
            </div>
          </div>
        ]);
        break;
      
      case "experience":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>WORK EXPERIENCE:</div>
            
            <div className="mt-2">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>CHORDIFY, Inc - Chandigarh</div>
              <div className={`${themeSettings[theme].primaryText} italic`}>Security Analyst Intern (Dec 2023 – August 2024)</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Automated testing with Selenium reducing manual QA effort by 40%</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Leveraged Burp Suite, Nmap, Metasploit, Kali Linux, Nessus, Wireshark to detect vulnerabilities</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Achieved 30% reduction in security gaps</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Integrated cloud-based code scanning with SonarQube</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Prepared detailed remediation reports, accelerating vulnerability fixes</div>
            </div>
            
            <div className="mt-3">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>THE CYBERHOST - Chandigarh</div>
              <div className={`${themeSettings[theme].primaryText} italic`}>Security Analyst Intern (June 2023 – August 2023)</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Conducted web and Android penetration testing for diverse clients, uncovering 10+ high-risk vulnerabilities</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Utilized forensic analysis and risk assessments to streamline incident response by 25%</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Collaborated with cross-functional teams to implement security best practices</div>
            </div>
          </div>
        ]);
        break;
      
      case "achievements":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>ACHIEVEMENTS:</div>
            
            <div className="mt-2">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>TRYHACKME</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>• Ranked in the top 5% for offensive security skills including SQL injection, XSS, CSRF, server exploitation</div>
            </div>
            
            <div className="mt-3">
              <div className={`${themeSettings[theme].secondaryText} font-bold`}>HACK-A-THON's</div>
              <div className={`${themeSettings[theme].primaryText} ml-2`}>1. <span className="font-semibold">Electrothon 5.0</span></div>
              <div className={`${themeSettings[theme].primaryText} ml-4`}>• An MLH-sponsored hackathon where I scored in the top 10</div>
              <div className={`${themeSettings[theme].primaryText} ml-4`}>• My contribution was in front-end development</div>
              
              <div className={`${themeSettings[theme].primaryText} ml-2 mt-2`}>2. <span className="font-semibold">RajasthanITDay</span></div>
              <div className={`${themeSettings[theme].primaryText} ml-4`}>• A 36-hour hackathon sponsored by the Government of Rajasthan</div>
              <div className={`${themeSettings[theme].primaryText} ml-4`}>• Leveraged Figma for website design</div>
              <div className={`${themeSettings[theme].primaryText} ml-4`}>• Developed a full-functional "Multi-vendor Website" facilitating buy and sell transactions for university stakeholders</div>
            </div>
          </div>
        ]);
        break;
      
      case "socials":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>CONNECT WITH ME:</div>
            <div className="mt-2">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>LinkedIn: </span>
              <a href="https://www.linkedin.com/in/utkarshj344" target="_blank" rel="noopener noreferrer" className={`${themeSettings[theme].linkColor} hover:underline`}>
                linkedin.com/in/utkarshj344
              </a>
            </div>
            <div className="mt-1">
              <span className={`${themeSettings[theme].secondaryText} font-bold`}>GitHub: </span>
              <a href="https://github.com/utkarsh344" target="_blank" rel="noopener noreferrer" className={`${themeSettings[theme].linkColor} hover:underline`}>
                github.com/utkarsh344
              </a>
            </div>
          </div>
        ]);
        break;
      
      case "contact":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].primaryText}`}>
              <div className="font-bold">Feel free to reach out to me through any of these channels:</div>
              <div className="mt-2">
                <span className={`${themeSettings[theme].secondaryText} font-bold`}>Email: </span>
                <a href="mailto:utkarshjoshi135@gmail.com" className={`${themeSettings[theme].linkColor}`}>utkarshjoshi135@gmail.com</a>
              </div>
              <div className="mt-1">
                <span className={`${themeSettings[theme].secondaryText} font-bold`}>Phone: </span>
                <span>+91 9696887901</span>
              </div>
              <div className="mt-1">
                <span className={`${themeSettings[theme].secondaryText} font-bold`}>LinkedIn: </span>
                <a href="https://www.linkedin.com/in/utkarshj344" target="_blank" rel="noopener noreferrer" className={`${themeSettings[theme].linkColor} hover:underline`}>
                  www.linkedin.com/in/utkarshj344
                </a>
              </div>
              <div className="mt-1">
                <span className={`${themeSettings[theme].secondaryText} font-bold`}>Location: </span>
                <span>UP, India</span>
              </div>
              <div className="mt-3">I'm currently open to internship and job opportunities in Security Analysis and DevSecOps!</div>
            </div>
          </div>
        ]);
        break;
      
      case "resume":
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`}>
            <div className={`${themeSettings[theme].highlightText} font-bold`}>MY RESUME:</div>
            <div className="mt-2">
              <div className={`${themeSettings[theme].primaryText}`}>Download my resume in your preferred format:</div>
              <div className="mt-2">
                <a 
                  href="https://github.com/utkarsh344/Portfolio/raw/main/public/resume.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${themeSettings[theme].linkColor} hover:underline mr-4`}
                >
                  📄 Download PDF
                </a>
                <a 
                  href="https://github.com/utkarsh344/Portfolio/raw/main/public/resume.docx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`${themeSettings[theme].linkColor} hover:underline`}
                >
                  📝 Download DOCX
                </a>
              </div>
              <div className="mt-4">
                <div className={`${themeSettings[theme].primaryText}`}>Or view my resume versions online:</div>
                <div className="mt-1">
                  <a 
                    href="https://github.com/utkarsh344/Portfolio/blob/main/public/resume_cybersecurity.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${themeSettings[theme].linkColor} hover:underline block mt-1`}
                  >
                    👨‍💻 Cybersecurity Specialist Resume
                  </a>
                  <a 
                    href="https://github.com/utkarsh344/Portfolio/blob/main/public/resume_devops.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${themeSettings[theme].linkColor} hover:underline block mt-1`}
                  >
                    🚀 DevOps Engineer Resume
                  </a>
                  <a 
                    href="https://github.com/utkarsh344/Portfolio/blob/main/public/resume_devsecops.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`${themeSettings[theme].linkColor} hover:underline block mt-1`}
                  >
                    🔒 DevSecOps Engineer Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        ]);
        break;
      
      case "clear":
        setOutputs([]);
        break;
      
      case "theme":
        if (args.length > 1 && ["matrix", "ubuntu", "arch"].includes(args[1])) {
          const newTheme = args[1] as "matrix" | "ubuntu" | "arch";
          setTheme(newTheme);
          setOutputs(prev => [
            ...prev,
            <div key={`output-${Date.now()}`} className={`${themeSettings[theme].primaryText}`}>
              Theme changed to {args[1]}
            </div>
          ]);
        } else {
          setOutputs(prev => [
            ...prev,
            <div key={`output-${Date.now()}`} className={`${themeSettings[theme].primaryText}`}>
              Usage: theme [theme-name] - Available themes: matrix, ubuntu, arch
            </div>
          ]);
        }
        break;
      
      default:
        setOutputs(prev => [
          ...prev,
          <div key={`output-${Date.now()}`} className={`${themeSettings[theme].primaryText}`}>
            Command not found: {mainCmd}. Type 'help' to see available commands.
          </div>
        ]);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`${themeSettings[theme].background} h-screen w-screen flex flex-col overflow-hidden`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar - Fixed to span the entire width */}
      <div className={`${themeSettings[theme].headerBg} p-2 w-full flex justify-between items-center`}>
        <div className="text-white text-sm">Terminal - Utkarsh@portfolio</div>
        <div className="flex space-x-2">
          <button 
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 focus:outline-none"
            aria-label="Minimize"
          ></button>
          <button 
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 focus:outline-none"
            aria-label="Maximize"
            onClick={(e) => {
              e.stopPropagation();
              toggleFullscreen();
            }}
          ></button>
          <button 
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 focus:outline-none"
            aria-label="Close"
          ></button>
        </div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-y-auto font-mono w-full"
      >
        {outputs.map((output, index) => (
          <div key={index} className="mb-2">{output}</div>
        ))}
        
        {/* Input line */}
        <div className="flex items-center">
          <span className={themeSettings[theme].promptColor}>utkarsh@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`ml-1 ${themeSettings[theme].background} border-none outline-none ${themeSettings[theme].primaryText} w-full`}
            autoFocus
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}

export default App;