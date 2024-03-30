import React, { useState } from 'react';

interface ChatMessage {
  text: string;
  fromUser: boolean;
}

const ChatBoot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (!inputValue.trim()) return; // Não envie mensagens em branco

    const response = await fetch('http://sua-api.com/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: inputValue })
    });

    const data: { text: string } = await response.json();
    setMessages([...messages, { text: inputValue, fromUser: true }, { text: data.text, fromUser: false }]);
    setInputValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div>
      <div>
        {messages.map((message: any, index) => (
          <div key={index} style={{ textAlign: message.fromUser ? 'right' : 'left' }}>
            {message.text}
          </div>
        ))}
      </div>
      <input type="text" value={inputValue} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default ChatBoot;
