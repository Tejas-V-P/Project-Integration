// Conversation history (full context)
const messages = [];

const chatDisplay = document.getElementById('chatDisplay');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

/**
 * Render a message bubble in the chat display
 */
/**
 * Handle sending the message
 */
async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // 1. Add user message to state
    messages.push({ role: "user", content: text });

    // 2. Render user bubble
    renderMessage("user", text);

    // 3. Clear input
    messageInput.value = "";

    // 4. Show typing indicator
    const typingIndicator = renderMessage("assistant", "Thinking...", true);

    try {
        // 5. Call backend /chat route
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages })
        });

        const data = await response.json();

        // Remove typing indicator
        typingIndicator.remove();

        if (data.error) {
            renderMessage("assistant", "Error: " + data.error);
            return;
        }

        // 6. Add assistant message to state
        messages.push({ role: "assistant", content: data.reply });

        // 7. Render assistant bubble
        renderMessage("assistant", data.reply);

    } catch (error) {
        console.error("Fetch error:", error);
        typingIndicator.remove();
        renderMessage("assistant", "Failed to connect to the server. Is the backend running?");
    }
}

/**
 * Render a message bubble in the chat display
 */
function renderMessage(role, content, isTyping = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', role);
    if (isTyping) messageDiv.classList.add('typing');
    
    messageDiv.textContent = content;
    chatDisplay.appendChild(messageDiv);
    
    // Auto-scroll to bottom
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    
    return messageDiv;
}

// Event Listeners
sendBtn.addEventListener('click', sendMessage);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
