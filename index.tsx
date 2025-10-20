import { GoogleGenAI } from 'https://esm.sh/@google/genai';

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
// FIX: Cast chatInput to HTMLTextAreaElement to access properties like 'value' and 'disabled'.
const chatInput = document.getElementById('chat-input') as HTMLTextAreaElement;
// FIX: Cast sendButton to HTMLButtonElement to access the 'disabled' property.
const sendButton = document.getElementById('send-button') as HTMLButtonElement;
const errorContainer = document.getElementById('error-container');

let chat;
let isLoading = false;

/**
 * Initializes the chat session with the AI model.
 */
async function initializeChat() {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: 'You are a helpful and friendly assistant. Your responses should be formatted in Markdown.',
            },
        });
        addMessage('model', "Hello! How can I help you today?");
    } catch (e) {
        console.error(e);
        displayError("Failed to initialize the AI model. Please check the API key.");
    }
}

/**
 * Appends a message to the chat window.
 * @param {'user' | 'model'} role The role of the sender.
 * @param {string} text The message content.
 * @param {boolean} [isStreaming=false] - Whether to show a typing indicator.
 * @returns {HTMLElement} The content element of the new message.
 */
function addMessage(role, text, isStreaming = false) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${role}`;
    
    const contentElement = document.createElement('div');
    contentElement.className = 'message-content';

    if (isStreaming) {
        contentElement.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>`;
    } else {
        // The 'marked' library is loaded from a CDN in index.html
        // FIX: Cast window to 'any' to access the 'marked' property which is loaded via CDN.
        contentElement.innerHTML = (window as any).marked.parse(text);
    }
    
    messageElement.appendChild(contentElement);
    chatMessages.appendChild(messageElement);
    scrollToBottom();
    return contentElement;
}

/**
 * Displays an error message in the UI.
 * @param {string} message The error message to display.
 */
function displayError(message) {
    errorContainer.innerHTML = `<div class="error-message">${message}</div>`;
}

/**
 * Clears any displayed error messages.
 */
function clearError() {
    errorContainer.innerHTML = '';
}

/**
 * Scrolls the chat window to the latest message.
 */
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Sets the loading state of the UI.
 * @param {boolean} state The new loading state.
 */
function setLoading(state) {
    isLoading = state;
    chatInput.disabled = state;
    sendButton.disabled = state || !chatInput.value.trim();
}

/**
 * Adjusts the height of the textarea to fit its content.
 */
function adjustTextareaHeight() {
    chatInput.style.height = 'auto';
    const scrollHeight = chatInput.scrollHeight;
    chatInput.style.height = `${scrollHeight}px`;
}

/**
 * Handles the chat form submission.
 * @param {Event} e The form submission event.
 */
async function handleSendMessage(e) {
    e.preventDefault();
    const messageText = chatInput.value.trim();
    if (!messageText || isLoading) return;

    setLoading(true);
    clearError();
    addMessage('user', messageText);
    chatInput.value = '';
    adjustTextareaHeight();
    
    try {
        if (!chat) {
            throw new Error("Chat session not initialized.");
        }
        
        const responseStream = await chat.sendMessageStream({ message: messageText });
        
        const modelMessageContent = addMessage('model', '', true);
        let modelResponse = '';
        let firstChunk = true;

        for await (const chunk of responseStream) {
            if (firstChunk) {
                modelMessageContent.innerHTML = ''; // Clear typing indicator
                firstChunk = false;
            }
            modelResponse += chunk.text;
            // FIX: Cast window to 'any' to access the 'marked' property which is loaded via CDN.
            modelMessageContent.innerHTML = (window as any).marked.parse(modelResponse);
        }

    } catch (e) {
        console.error(e);
        displayError("An error occurred while sending the message. Please try again.");
    } finally {
        setLoading(false);
    }
}

// --- Event Listeners ---

// Handle form submission
chatForm.addEventListener('submit', handleSendMessage);

// Auto-resize textarea and manage send button state
chatInput.addEventListener('input', () => {
    adjustTextareaHeight();
    sendButton.disabled = isLoading || !chatInput.value.trim();
});

// Handle 'Enter' key press for sending messages
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(e);
    }
});

// --- Initialization ---
initializeChat();
