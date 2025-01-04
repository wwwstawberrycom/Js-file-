  // Store the console messages
  let consoleMessages = [
    { timestamp: '07:36:36', type: 'error', message: 'win is not defined', url: 'http://localhost:7700/index.html:5:124098' },
    { timestamp: '07:37:00', type: 'warning', message: 'Deprecation warning for feature X', url: 'http://localhost:7700/index.html:10:121245' },
    { timestamp: '07:37:10', type: 'info', message: 'User logged in', url: 'http://localhost:7700/index.html:15:123456' }
  ];

  const consoleContent = document.querySelector('.console-content');
  const consoleInput = document.getElementById('console-input');

  // Function to display messages in the console
  function displayMessages(filter = 'all') {
    consoleContent.innerHTML = ''; // Clear existing messages
    const filteredMessages = consoleMessages.filter(msg => filter === 'all' || msg.type === filter);

    filteredMessages.forEach(msg => {
      const messageElement = document.createElement('div');
      const messageTypeClass = msg.message === 'true' ? 'true' : msg.message === 'false' ? 'false' : 'info';
      messageElement.innerHTML = `
        <div class="timestamp">${msg.timestamp} at <a href="#">${msg.url}</a></div>
        <div class="${messageTypeClass}">${msg.message}</div>
      `;
      consoleContent.appendChild(messageElement);
    });
  }

  // Filter buttons to show All, Error, Warning, or Info messages
  document.querySelectorAll('.bottom-header').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.textContent.toLowerCase();
      displayMessages(filter);
    });
  });

  // Function to evaluate JavaScript code
  function evaluateJavaScriptCode(code) {
    try {
      const result = eval(code); // Use eval to execute the code
      if (result === undefined) {
        return 'undefined'; // Handle case when result is undefined
      }
      return result;
    } catch (error) {
      return `Error: ${error.message}`; // Handle any errors that occur during execution
    }
  }

  // Handle console input (enter key pressed)
  consoleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && consoleInput.value.trim()) {
      const userInput = consoleInput.value.trim();
      let message = '';
      let result = '';

      // Check if the input is a JavaScript code snippet
      if (/^[\s\S]*$/.test(userInput)) {
        // Evaluate the JavaScript code
        result = evaluateJavaScriptCode(userInput);
        message = `${userInput} => ${result}`; // Show code and result
      } else {
        // Treat as a regular message
        result = userInput;
        message = result;
      }

      // Add the new message to the console
      const newMessage = {
        timestamp: new Date().toLocaleTimeString(),
        type: 'info', // Default to 'info' type, can adjust based on input
        message: message,
        url: 'user_input' // Placeholder URL
      };
      consoleMessages.push(newMessage);

      // Display the updated console content
      displayMessages();

      // Optionally log the message to the browser's console for debugging
      console.log(`New message added: ${message}`);

      // Clear the input field after submitting
      consoleInput.value = '';
    }
  });

  // Initially display all messages
  displayMessages();
