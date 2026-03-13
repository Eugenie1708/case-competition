import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { CHATBOT_RESPONSES } from '../data/chatbotResponses';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const ChatbotPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: CHATBOT_RESPONSES.default, isUser: false }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim().toLowerCase();
    setMessages(prev => [...prev, { text: inputValue, isUser: true }]);
    setInputValue("");

    // Simple keyword matching for scripted responses
    setTimeout(() => {
      let response = CHATBOT_RESPONSES.default;
      if (userMsg.includes('student')) response = CHATBOT_RESPONSES.student;
      else if (userMsg.includes('faculty') || userMsg.includes('professor')) response = CHATBOT_RESPONSES.faculty;
      else if (userMsg.includes('industry') || userMsg.includes('business')) response = CHATBOT_RESPONSES.industry;
      else if (userMsg.includes('confidence') || userMsg.includes('data')) response = CHATBOT_RESPONSES.confidence;

      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 flex flex-col h-96"
          >
            <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
              <h3 className="font-medium">Gies Assistant</h3>
              <button onClick={() => setIsOpen(false)} className="hover:bg-orange-700 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex", msg.isUser ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm",
                    msg.isUser 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about students, faculty..."
                className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-orange-500"
              />
              <button 
                onClick={handleSend}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-full shadow-lg hover:bg-orange-700 transition-colors z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </motion.button>
    </>
  );
};
