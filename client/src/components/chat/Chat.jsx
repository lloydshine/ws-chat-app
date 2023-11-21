import PropTypes from "prop-types";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";

function Chat({ username }) {
  const WS_URL = `ws://192.168.1.11:8001`;
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    share: true,
    queryParams: { username },
  });

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!lastJsonMessage) return;
    setMessages((prevMessages) => [...prevMessages, lastJsonMessage]);
  }, [lastJsonMessage]);

  const sendMessage = () => {
    if (message.length === 0) return;
    sendJsonMessage({
      message,
      from: username,
      type: "message",
    });
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-slate-100 justify-end items-center">
      <div className="flex flex-col w-1/2 gap-1">
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              m.from === username
                ? "self-end max-w-xs flex flex-col"
                : m.from === "system"
                ? "self-center"
                : "self-start max-w-xs flex flex-col"
            }
          >
            {m.from !== "system" && (
              <p
                className={
                  m.from === username
                    ? "self-end text-xs text-slate-500 mx-2"
                    : "self-start text-xs text-slate-500 mx-2"
                }
              >
                {m.from}
              </p>
            )}
            <p
              className={
                m.from === username
                  ? "px-2 py-1 bg-sky-400 rounded-lg text-white text-base break-inside-auto"
                  : m.from === "system"
                  ? "self-center text-xs text-gray-500"
                  : "self-start px-2 py-1 bg-slate-300 rounded-lg text-base break-inside-auto"
              }
            >
              {m.message}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <input
          className="bg-sky-500 text-white px-3 py-1 rounded-lg"
          onClick={() => sendMessage()}
          type="button"
          value="Send"
        />
      </div>
    </div>
  );
}

Chat.propTypes = { username: PropTypes.string };

export default Chat;
