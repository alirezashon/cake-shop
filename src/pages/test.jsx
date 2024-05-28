// pages/index.js

import { useState, useEffect } from 'react';

let socket;

export default function Home() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    socket = new WebSocket('ws://localhost:3000'); // Replace with your WebSocket server URL
    console.log(socket)
    socket.onmessage = (event) => {
      setReceivedMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage('');
    } else {
      console.error('WebSocket not open');
    }
  };

  return (
    <div>
      <h1>Simple Chat</h1>
      <div>
        {receivedMessages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
