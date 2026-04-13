import { useState } from "react";

const Chatbot = ({ onClose }) => {

  const [messages, setMessages] = useState([
    { from: "bot", text: "Xin chào! Mình có thể giúp gì cho bạn?" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };

    setMessages(prev => [
      ...prev,
      userMessage,
      { from: "bot", text: "Mình đang xử lý..." }
    ]);

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-white shadow-lg rounded-xl p-4 z-[9999]">

      <button
        onClick={onClose}
        className=" top-2 right-2 text-gray-500 hover:text-black"
      >
        ✖
      </button>

      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "bot" ? "text-left" : "text-right"}>
            <p className="bg-gray-200 inline-block px-3 py-1 rounded-lg mb-1">
              {m.text}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage} className="bg-black text-white px-3 rounded">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chatbot;