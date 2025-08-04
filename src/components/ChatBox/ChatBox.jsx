import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const ChatBox = ({ player }) => {
  const { chat, addMessage } = useGameStore();
  const [input, setInput] = React.useState('');
  const messagesEndRef = React.useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      addMessage(input.trim(), player);
      setInput('');
    }
  };

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chat]);

  return (
    <>
      <div className="p-2 border-t h-80 overflow-auto flex flex-col">
        <div className="flex-1 overflow-y-auto mb-2">
          {chat.map((msg, idx) => {
            const time = msg.timestamp.length > 5 ? msg.timestamp.slice(0, 5) : msg.timestamp;
            return (
              <div key={idx} className={`mb-1 flex ${msg.player === player ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] px-2 py-1 m-2 rounded ${
                    msg.player === player ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-white'
                  }`}
                >
                  <div>{msg.text}</div>
                  <div className="text-xs opacity-70 text-right mt-1">{time}</div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex gap-1 relative">
          <input
            className="flex-1 rounded p-1 text-white border border-gray-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 px-1 rounded text-xl text-gray-400 hover:text-white"
            onClick={sendMessage}
            tabIndex={-1}
            aria-label="Send"
          >
            ➤
          </button>
        </div>
      </div>
    </>
  );
};
