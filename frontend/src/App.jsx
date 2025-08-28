import React, { useEffect, useState } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "./App.css";
import axios from "axios";
import Markdown from 'react-markdown'

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(
    () => {
      Prism.highlightAll();
    },
    [messages]
  );

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:8000/ai/get-response",
        { code: input }
      );

      // Add AI response
      setMessages([...newMessages, { role: "ai", text: response.data }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "ai", text: "Error fetching response." }
      ]);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">Your <span className="highlight">AI ChatBot</span></header>

      <div className="chat-body">
        {messages.map((msg, index) =>
          <div key={index} className={`chat-message ${msg.role}`}>
            {msg.role === "ai"
              ? <div className="ai-card">
                  <div className="ai-header">
                    <span className="ai-icon">🤖</span>
                    <span className="ai-title">AI Response</span>
                    <button
                      className="copy-btn"
                      onClick={() => navigator.clipboard.writeText(msg.text)}
                    >
                      Copy
                    </button>
                  </div>
                  <pre className="ai-code">
                    <code className="language-jsx">
                      {msg.text}
                    </code>
                  </pre>
                </div>
              : <div className="msg-bubble">
                  {msg.text}
                </div>}
          </div>
        )}
      </div>

      <div className="chat-input-bar">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your code or question here..."
          rows={2}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default App;
