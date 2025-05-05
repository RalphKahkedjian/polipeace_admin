import { useState } from 'react';
import './Chatbot.css';
import { sendMessageToPolipeace } from '../../Services/OpenAI';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!input.trim()) return;

    try {
      const reply = await sendMessageToPolipeace(input);
      setResponse(reply);
    } catch (err) {
      console.error(err);
      setResponse('Something went wrong.');
    }
  };

  return (
    <div className="chatbot-container">
      <div className='d-flex' style={{
        gap:'10px'
      }}>
      <textarea
        className="chatbot-input"
        placeholder="Ask Polipeace..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="chatbot-submit-button" onClick={handleSubmit}>
        Ask
      </button>
      </div>
      <div className="chatbot-response">{response}</div>
    </div>
  );
}
