import { useState, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("chat")) || []);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, text]);
      setText("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Chat</h2>
      <div className="mt-4 h-60 overflow-y-auto bg-gray-100 p-4 rounded">
        {messages.map((msg, index) => (
          <p key={index} className="bg-white p-2 mt-1">{msg}</p>
        ))}
      </div>
      <div className="mt-4 flex space-x-2">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..." 
          className="border p-2 w-full"
        />
        <button onClick={sendMessage} className="bg-green-600 text-white p-2 rounded">Send</button>
      </div>
    </div>
  );
};

export default Chat;
