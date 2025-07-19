import React, { useState, useEffect, useRef } from 'react';
import axiosClient from '../../Services/axiosClient'; // assuming axios instance configured with baseURL

const primaryColor = '#4B1F3E';
const fadedColor = 'rgba(75, 31, 62, 0.4)';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatBoxProps {
  initialMessages?: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Correct axios post usage: (url, data)
      const response = await axiosClient.post('/chatbot', { prompt: input });

      // axios returns data in response.data
      const data = response.data;

      if (data.status) {
        const aiMessage: Message = {
          sender: 'ai',
          text: data.data || 'No response from AI',
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage: Message = {
          sender: 'ai',
          text: `⚠️ ${data.message || 'Error getting AI response'}`,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error: any) {
      const aiMessage: Message = {
        sender: 'ai',
        text: `⚠️ Network error or server unreachable.`,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setLoading(false);
    }

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
        marginBottom: '40px',
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
              padding: '10px 14px',
              borderRadius: '12px',
              backgroundColor: msg.sender === 'ai' ? primaryColor : fadedColor,
              color: '#fff',
              fontSize: '15px',
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
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
          marginTop: '15px',
        }}
      >
        <input
          type="text"
          placeholder={loading ? 'Waiting for response...' : 'Type message...'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
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
          disabled={loading}
          style={{
            width: 'auto',
            backgroundColor: loading ? '#8b476fff' : primaryColor,
            color: 'whitesmoke',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'normal',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            marginBottom: 0,
            marginTop: 0,
          }}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
