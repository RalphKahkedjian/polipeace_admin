import React, { useState, useEffect } from 'react';

const primaryColor = '#4B1F3E';
const fadedColor = 'rgba(75, 31, 62, 0.4)';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatBoxProps {
  initialMessages?: Message[]; // Allow passing initial messages for testing
}

const ChatBox: React.FC<ChatBoxProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiReply: Message = {
        sender: 'ai',
        text: `You said: ${input}`,
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 500);

    setInput('');
  };

  return (
    <div
      style={{
        width: '98.5%',
        marginTop: '30px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '16px',
        backgroundColor: '#fdfdfd',
        display: 'flex',
        flexDirection: 'column',
        height: '500px',
        boxShadow: '-2px -3px 8px 5px #4B1F3E',
        marginBottom:'40px'
      }}
    >
      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingRight: '5px',
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '70%',
              padding: '10px 14px',  // Added comfortable padding here
              borderRadius: '12px',
              backgroundColor:
                msg.sender === 'ai' ? primaryColor : fadedColor,
              color: '#fff',
              fontSize: '15px',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap', // keep line breaks if any
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input + Send button */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(75, 31, 62, 0.1)',
          padding: '8px',
          borderRadius: '10px',
          gap: '10px',
          marginTop:'15px'
        }}
      >
        <input
          type="text"
          placeholder="Type message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{
            flex: 1,
            padding: '15px 10px',
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '15px',
            color: '#333',
            height: '30px',
            boxSizing: 'border-box',
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            width: 'auto',
            backgroundColor: primaryColor,
            color: 'whitesmoke',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'normal',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            marginBottom: 0,
            marginTop:0
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
