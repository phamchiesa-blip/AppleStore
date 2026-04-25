import { useState } from "react";


const Chatbot = ({ onClose }) => {

  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you?" }
  ]);

  const [input, setInput] = useState("");
  const [state, setState] = useState("idle");

  // AI Fake
  const handleMessage = (msg) => {
  const text = msg.toLowerCase();

  // ================= MACBOOK =================
  if (state === "ask_macbook_type") {
    if (text.includes("air") || text.includes("Air") || text.includes("AIR")) {
      setState("idle");
      return "The MacBook Air is lightweight and has a long battery life 🔥";
    }
    if (text.includes("pro") || text.includes("Pro") || text.includes("PRO")) {
      setState("idle");
      return "The MacBook Pro is powerful for developers and designers 💻";
    }
  }

  // ================= IPHONE =================
  if (state === "ask_iphone_model") {
    if (text.includes("Pro") || text.includes("pro") || text.includes("PRO")) {
      setState("idle");
      return "iPhone 17 Pro: Stable, good value. 🔥";
    }
    if (text.includes("Max") || text.includes("max") || text.includes("MAX")) {
      setState("idle");
      return "iPhone 17 Pro Max: Improved camera, powerful chip. 📸";
    }
  }

  // ================= APPLE WATCH =================
  if (state === "ask_watch_model") {
    if (text.includes("11")) {
      setState("idle");
      return "Series 11: The screen is nice, and the health measurement is good. ⌚";
    }
    if (text.includes("se") || text.includes("SE") || text.includes("Se")) {
      setState("idle");
      return "Watch SE 3: Inexpensive, sufficient for simple tasks. 👍";
    }
    if (text.includes("ultra") || text.includes("Ultra") || text.includes("ULTRA")) {
      setState("idle");
      return "Ultra 3: Super durable, long-lasting battery for outdoor use. 🏔️";
    }
  }

  // ================= AIRPODS =================
  if (state === "ask_airpods_model") {
    if (text.includes("pro") || text.includes("Pro") || text.includes("PRO")) {
      setState("idle");
      return "AirPods Pro 3: excellent noise cancellation 🎧";
    }
    if (text.includes("4")) {
      setState("idle");
      return "AirPods 4: compact and affordable.t 🔥";
    }
    if (text.includes("max") || text.includes("MAX") || text.includes("Max")) {
      setState("idle");
      return "AirPods Max 2: superior sound 🎶";
    }
  }

  // ================= IPAD =================
  if (state === "ask_ipad_model") {
    if (text.includes("air") || text.includes("Air") || text.includes("AIR")) {
      setState("idle");
      return "iPad Air: balancing performance & price 💡";
    }
    if (text.includes("pro") || text.includes("Pro") || text.includes("PRO")) {
      setState("idle");
      return "iPad Pro: strongest, best screen🔥";
    }
    if (text.includes("mini") || text.includes("Mini") || text.includes("MINI")) {
      setState("idle");
      return "iPad Mini: compact and convenient 📱";
    }
  }

  // ================= TV =================
  if (text.includes("tv") || text.includes("TV")) {
    return "Apple TV 4K: watch movies and enjoy entertainment with a super smooth experience. 📺";
  }

  // ================= HOME =================
  if (text.includes("home") || text.includes("HOME") || text.includes("Home"))  {
    return "Home App: easy smart home control 🏠";
  }

  // ================= INTENT =================

  if (text.includes("macbook") || text.includes("Macbook") || text.includes("MACBOOK")) {
    setState("ask_macbook_type");
    return "Do you want a MacBook Air or a Pro?";
  }

  if (text.includes("iphone") || text.includes("IPHONE") || text.includes("Iphone")) {
    setState("ask_iphone_model");
    return "Do you want iPhone 17 Pro or 17 Pro Max?";
  }

  if (text.includes("watch") || text.includes("Watch") || text.includes("WATCH")) {
    setState("ask_watch_model");
    return "Do you want Series 11, SE 3 or Ultra 3?";
  }

  if (text.includes("airpods") || text.includes("Airpods") || text.includes("AIRPODS")) {
    setState("ask_airpods_model");
    return "Do you want Pro 3, AirPods 4 or Max 2?";
  }

  if (text.includes("ipad") || text.includes("Ipad") || text.includes("IPAD")) {
    setState("ask_ipad_model");
    return "Do you want iPad Air, Pro or Mini?";
  }

  return "I don't quite understand 🤔 Could you explain it more clearly?";
};

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const botReply = handleMessage(input);

    setMessages(prev => [
      ...prev,
      userMessage,
      { from: "bot", text: botReply  }
    ]);

    setInput("");
  };


  return (
    <div className="fixed bottom-5 right-5 w-80 
  bg-white/10 backdrop-blur-xl
  text-white
  rounded-2xl 
  shadow-2xl 
  p-4 
  border border-white/10
  z-999">

      <button
        onClick={onClose}
        className="mb-3 top-2 right-2  text-white/60 hover:text-white"
      >
        ✖
      </button>

      <div className="h-64 overflow-y-auto mb-2">
        {messages.map((m, i) => (
          <div key={i} className={m.from === "bot" ? "text-left" : "text-right"}>
            <p className="bg-white/10 text-white inline-block px-3 py-1 rounded-lg mb-1">
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
        <button onClick={sendMessage} className="bg-white text-black px-3 rounded">
          Send 
        </button>
      </div>
    </div>
  );
};

export default Chatbot;