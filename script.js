document.addEventListener("DOMContentLoaded", () => {
  const terminalInput = document.getElementById("terminal-input");
  const terminalOutput = document.getElementById("terminal-output");
  const inputText = document.querySelector(".input-text");
  const cursor = document.querySelector(".cursor");

  let inputHistory = [];
  let historyIndex = -1;
  let currentInput = "";
  let waitingForQuestion = false;
  let answers = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
  ];

  console.log(
    "You found the password! To access the secret, type the password in the field and enjoy!",
  );

  console.log("Password is: T3rm1n4L");

  // Function to update cursor position
  function updateCursorPosition() {
    const cursorPosition = terminalInput.selectionStart;
    const textBeforeCursor = terminalInput.value.substring(0, cursorPosition);
    const textAfterCursor = terminalInput.value.substring(cursorPosition);

    inputText.textContent = textBeforeCursor;
    cursor.style.marginLeft = "0";
    cursor.textContent = terminalInput.value[cursorPosition] || "█";
  }

  // Update input text and cursor position
  terminalInput.addEventListener("input", updateCursorPosition);

  // Handle arrow keys and special keys
  terminalInput.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        if (historyIndex === -1) {
          currentInput = terminalInput.value;
        }
        if (historyIndex < inputHistory.length - 1) {
          historyIndex++;
          terminalInput.value =
            inputHistory[inputHistory.length - 1 - historyIndex];
          setTimeout(() => {
            terminalInput.selectionStart = terminalInput.selectionEnd =
              terminalInput.value.length;
            updateCursorPosition();
          }, 0);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value =
            inputHistory[inputHistory.length - 1 - historyIndex];
        } else if (historyIndex === 0) {
          historyIndex = -1;
          terminalInput.value = currentInput;
        }
        setTimeout(() => {
          terminalInput.selectionStart = terminalInput.selectionEnd =
            terminalInput.value.length;
          updateCursorPosition();
        }, 0);
        break;
      case "ArrowLeft":
      case "ArrowRight":
        setTimeout(updateCursorPosition, 0);
        break;
    }
  });

  // Update cursor position on mouse clicks or selection changes
  terminalInput.addEventListener("mouseup", updateCursorPosition);
  terminalInput.addEventListener("select", updateCursorPosition);
  terminalInput.addEventListener("selectionchange", updateCursorPosition);

  //commands
  const commands = {
    help: () => `Available commands:
- help: Show this help message
- about: About Miguel Teixeira
- clear: Clear the terminal
- projects: List my projects
- contact: How to reach me
- GitHub: access my GitHub page
- history: display command history
- clearhistory: Clear command history
- closed: Discover the password to access it
- coin: Toss a coin
- ask8ball [question]: Ask 8ball any question`,

    about: () =>
      `I'm a student at Cotemig technical school, studying Software development focused on mobile and web applications, also looking into DevOps and hardware studies`,

    clear: () => {
      terminalOutput.textContent = "";
      return "";
    },

    projects: () => `My Projects:
1. Terminal Portfolio - An interactive way to showcase my work
2. My main portfolio
3. Google search layout copy
4. All of them and a few others on Github (enter command 'github')`,

    contact: () => `Get in touch:
Email: migueltvaladao@gmail.com
GitHub: MiguelValadao
LinkedIn: Miguel Teixeira Valadão
Instagram: omiguelito_valadao`,

    history: () =>
      inputHistory.length ? inputHistory.join("\n") : "No commands in history.",

    clearhistory: () => {
      inputHistory = [];
      historyIndex = -1;
      return "Command history cleared.";
    },

    github: () => (window.location.href = `https://github.com/MiguelValadao/`),

    closed: () =>
      (password =
        prompt("Enter the password to access the secret content:") ===
        "T3rm1n4L"
          ? downloadResume()
          : '<div class="error-output">Incorrect password. Access denied</div>\n'),

    coin: () => {
      let toss = Math.floor(Math.random() * 2);

      if (toss === 1) {
        return `Tails`;
      } else {
        return `Heads`;
      }
    },

    ask8ball: () => {
      waitingForQuestion = true;
      return `Type your question:`;      
    },
  };

  const downloadResume = () => {
    const link = document.createElement("a");
    link.href = "Curriculo_Miguel_Teixeira_Valadao.pdf";
    link.download = "Curriculo_Miguel_Teixeira_Valadao.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle command input
  terminalInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const rawInput = terminalInput.value.trim();
      const command = rawInput.toLowerCase();

      if (command) {
        inputHistory.push(command);
      }
      historyIndex = -1;
      currentInput = "";

      const commandLine = `<span class="prompt">contact@migueltvaldado:$</span> ${rawInput}\n`;
      terminalOutput.innerHTML += commandLine;

      if (waitingForQuestion) {
        waitingForQuestion = false;
        const question = rawInput;
        let answer = "";
        if (question) {
          answer = answers[Math.floor(Math.random() * answers.length)];
        } else {
          answer = `You didn't ask a question.`;
        }
        terminalOutput.innerHTML += `<div class="command-output">${answer}</div>\n`;
      } else if (command in commands) {
        let commandOutputText = commands[command]();
        if (command !== "clear") {
          terminalOutput.innerHTML += `<div class="command-output">${commandOutputText}</div>\n`;
        }
      } else if (command !== "") {
        let commandOutputText = `Command not found: ${command}. Type 'help' for available commands.`;
        terminalOutput.innerHTML += `<div class="error-output">${commandOutputText}</div>\n`;
      }

      terminalInput.value = "";
      inputText.textContent = "";
      terminalInput.focus();
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  document.querySelector(".container").addEventListener("click", (e) => {
    if (e.target !== terminalInput) {
      terminalInput.focus();
    }
  });
});
