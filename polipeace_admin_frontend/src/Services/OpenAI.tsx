// src/services/chatbotService.ts
import axios from 'axios';

export const sendMessageToPolipeace = async (message: string) => {
  const res = await axios.post('http://127.0.0.1:8000/api/chat', {
    messages: [{ role: 'user', content: message }]
  });

  return res.data.choices[0].message.content;
};
