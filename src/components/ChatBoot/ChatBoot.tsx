import React, { useState, useEffect, useRef } from 'react';
import Boot from '../../assets/img/boot.jpg';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ChatBoot.css';

interface ChatMessage {
  text: string;
  fromUser: boolean;
  sentSuccessfully?: boolean;
}

const ChatBoot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [chatSize, setChatSize] = useState<string>("chat-container-small");
  const [isWaitingResponse, setIsWaitingResponse] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleChatOpen = () => {
    setIsOpen(true);
    setChatSize("chat-container-medium");
  };

  const toggleChatClose = () => {
    setIsOpen(false);
    setChatSize("chat-container-small");
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    try {
      setIsWaitingResponse(true);

      const response = await fetch('https://esg-chatbot-api-da001488b6dd.herokuapp.com/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem');
      }

      const data = await response.json();
      setMessages([...messages, { text: inputValue, fromUser: true, sentSuccessfully: true }, { text: data.response, fromUser: false }]);
      setInputValue('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages([...messages, { text: inputValue, fromUser: true, sentSuccessfully: false }]);
    } finally {
      setIsWaitingResponse(false);
      scrollToBottom();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([{ text: "Olá, como posso te ajudar?", fromUser: false, sentSuccessfully: true }]);
  }, []);

  return (
    <div className={chatSize}>
      {!isOpen && (
        <div className="chatbot-icon" onClick={toggleChatOpen}>
          <div className="chatbot-img-container">
            <img src={Boot} alt="ChatBot"  className="bot-icon" />
          </div>
          <div className="chatbot-text-container">
            <span className="text-question-bot">Posso ajudar?</span>
          </div>
        </div>
      )}
      {isOpen && (
        <div>
          <div>
            <div className="messages-container">
              <div className="chatbot-header">
                <img src={Boot} alt="ChatBot" className="bot-header"/>
                <div className="text-header-bot-container">
                  <span className="text-header-bot">Esg Bot</span>
                </div>
                <button className="btn-close" onClick={toggleChatClose}>X</button>
              </div>
              <div className="chatbot-messages-content">
                {messages.map((message, index) => (
                  <div key={index} className={`message ${message.fromUser ? 'from-user' : 'from-bot'}`}>
                    {message.text}
                    {message.fromUser && (
                      <>
                        <FontAwesomeIcon
                          icon={faCircleCheck}
                          style={{ color: message.sentSuccessfully ? '#109d73' : '#c5bfbf' }}
                        />
                        {/* <FontAwesomeIcon icon="fa-regular fa-circle-check" style={{color: message.sentSuccessfully ? '#109d73' : '#c5bfbf'}} /> */}
                        {/* <i className={`fa-regular fa-circle-check${message.sentSuccessfully ? '' : '-slash'}`} style={{ color: message.sentSuccessfully ? '#109d73' : '#ff0000' }}></i> */}
                      </>
                    )}
                  </div>
                ))}
                {isWaitingResponse && (
                  <div className="message from-bot">Digitando...</div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          </div>
          <div className="input-message-container">
            <input 
              type="text" 
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress} 
              className="input-message"
              placeholder="Digite sua mensagem..."
            />
            <button className="input-message-btn" onClick={sendMessage} disabled={isWaitingResponse}>
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBoot;
