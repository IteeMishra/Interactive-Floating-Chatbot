import { useState, useEffect, useRef } from "react";
import "../assets/styles.css"; // Import CSS file

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ text: "Hello! Ask me anything.", sender: "bot" }]);
    const [input, setInput] = useState("");
    const chatBodyRef = useRef(null);

    // Predefined responses
    const responses = {
        "hi": "Hello! How can I help?",
        "how are you": "I'm just a chatbot, but I'm doing great!",
        "what's your name": "I'm your friendly chatbot.",
        "bye": "Goodbye! Have a great day!",
        "default": "I'm not sure about that. Can you ask something else?"
    };

    // Toggle chatbot visibility
    const toggleChatbot = () => setIsOpen(!isOpen);

    // Handle user input submission
    const sendMessage = () => {
        if (!input.trim()) return;
        const userMessage = { text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);

        setTimeout(() => {
            const botReply = responses[input.toLowerCase()] || responses["default"];
            setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
        }, 500);

        setInput(""); // Clear input
    };

    // Handle Enter key submission
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    // Scroll to the latest message
    useEffect(() => {
        chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
    }, [messages]);

    // Keyboard shortcuts to toggle chatbot
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowUp") setIsOpen(true);
            if (event.key === "ArrowDown") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div>
            {/* Chatbot Window */}
            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h3>Chatbot</h3>
                        <button onClick={toggleChatbot}>&times;</button>
                    </div>
                    <div className="chatbot-body" ref={chatBodyRef}>
                        {messages.map((msg, index) => (
                            <p key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
                                {msg.text}
                            </p>
                        ))}
                    </div>
                    <div className="chatbot-footer">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>➤</button>
                    </div>
                </div>
            )}

            {/* Floating Button with Vibration */}
            {!isOpen && (
                <button className="chatbot-button" onClick={toggleChatbot}>
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;
