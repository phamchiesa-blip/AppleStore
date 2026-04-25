import { useEffect, useState } from "react";

export default function Toast({ message, type = "success", onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setShow(true));

    // auto close
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300); // wait animation out
    }, 2500);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`
        fixed top-[10vh] right-6 z-50
        transition-all duration-300 ease-out
        ${show ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}
      `}
    >
      <div
        className={`
          px-4 py-3 rounded-xl text-white
          backdrop-blur-md
          shadow-lg border border-white/10
          ${type === "success" ? "bg-green-500/70" : "bg-red-500/70"}
        `}
      >
        {message}
      </div>
    </div>
  );
}