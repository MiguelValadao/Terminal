document.addEventListener('DOMContentLoaded', () => {
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const inputText = document.querySelector('.input-text');
    const cursor = document.querySelector('.cursor');

    let inputHistory = [];
    let historyIndex = -1;
    let currentInput = '';

    console.log("You found the password! To access the secret, type the password on the field and enjoy!")

    console.log("Password is: T3rm1n4L")

    // Function to update cursor position
    function updateCursorPosition() {
        const cursorPosition = terminalInput.selectionStart;
        const textBeforeCursor = terminalInput.value.substring(0, cursorPosition);
        const textAfterCursor = terminalInput.value.substring(cursorPosition);

        inputText.textContent = textBeforeCursor;
        cursor.style.marginLeft = '0';
        cursor.textContent = terminalInput.value[cursorPosition] || '█';
    }

    // Update input text and cursor position
    terminalInput.addEventListener('input', updateCursorPosition);

    // Handle arrow keys and special keys
    terminalInput.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                if (historyIndex === -1) {
                    currentInput = terminalInput.value;
                }
                if (historyIndex < inputHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
                    setTimeout(() => {
                        terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                        updateCursorPosition();
                    }, 0);
                }
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = inputHistory[inputHistory.length - 1 - historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    terminalInput.value = currentInput;
                }
                setTimeout(() => {
                    terminalInput.selectionStart = terminalInput.selectionEnd = terminalInput.value.length;
                    updateCursorPosition();
                }, 0);
                break;
            case 'ArrowLeft':
            case 'ArrowRight':
                setTimeout(updateCursorPosition, 0);
                break;
        }
    });

    // Update cursor position on mouse clicks or selection changes
    terminalInput.addEventListener('mouseup', updateCursorPosition);
    terminalInput.addEventListener('select', updateCursorPosition);
    terminalInput.addEventListener('selectionchange', updateCursorPosition);

    const commands = {
        help: () => `Available commands:
- help: Show this help message
- about: About Miguel Teixeira
- clear: Clear the terminal
- projects: List my projects
- contact: How to reach me
- GitHub: access my GitHub page
- history: display command history
- closed: Discover the password to access it`,

        about: () => `I'm a student at Cotemig technical school, studying Software development focused on mobile and web applications, also looking into DevOps and hardware studies`,

        clear: () => {
            terminalOutput.textContent = '';
            return '';
        },

        projects: () => `My Projects:
1. Terminal Portfolio - An interactive way to showcase my work
2. My main portfolio
3. Google search layout copy
4. All of them and a few others on Github (enter command 'github')`,

        contact: () => `Get in touch:
Email: miguelteix2008@gmail.com
GitHub: MiguelValadao`,

        history: () => inputHistory.length ? inputHistory.join('\n') : 'No commands in history.',

        github: () => window.location.href = `https://github.com/MiguelValadao/`,

        closed: () => `Still working on it...`,
    };

    terminalInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            if (command) {
                inputHistory.push(command);
            }
            historyIndex = -1;
            currentInput = '';

            const commandLine = `<span class="prompt">contact@migueltvaldado:$</span> ${command}\n`;
            terminalOutput.innerHTML += commandLine;

            let commandOutputText = '';
            if (command in commands) {
                commandOutputText = commands[command]();
                if (command !== 'clear') {
                    terminalOutput.innerHTML += `<div class="command-output">${commandOutputText}</div>\n`;
                }
            } else if (command !== '') {
                commandOutputText = `Command not found: ${command}. Type 'help' for available commands.`;
                terminalOutput.innerHTML += `<div class="error-output">${commandOutputText}</div>\n`;
            }

            terminalInput.value = '';
            inputText.textContent = '';
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    document.querySelector('.container').addEventListener('click', (e) => {
        if (e.target !== terminalInput) {
            terminalInput.focus();
        }
    });
}); 