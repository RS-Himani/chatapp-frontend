import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import "./App.css"

const socket = io('http://localhost:5000');

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
    });
  }, [messages]);

  const sendMessage = () => {
    if (message) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <ul className="messages">
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        className="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="button" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
