import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface Product {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  images: { url: string; alt_text: string }[];
  ingredients: string[];
  usage_instructions: string;
  size: string;
  weight: string;
  current_status: string;
  retailer: string;
  created_by: {
    name: string;
    email: string;
  };
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatbotProps {
  product: Product;
}

const Chatbot: React.FC<ChatbotProps> = ({ product }) => {
  const [messages, setMessages] = useState<Message[]>([
    { text: `Welcome! I'd love to answer questions about ${product.name}.`, sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post<{ message: string }>('/api/chat', { 
        message: input,
        product: product 
      });
      const botMessage: Message = { text: response.data.message, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { text: 'Sorry, there was an error processing your request.', sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setInput('');
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-100 rounded-lg" ref={chatWindowRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.sender === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          placeholder="Ask about the product..."
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
