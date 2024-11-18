// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import {
//   MainContainer,
//   ChatContainer,
//   MessageList,
//   Message,
//   MessageInput,
//   TypingIndicator,
// } from '@chatscope/chat-ui-kit-react';

// // const API_KEY = "sk-proj-KDmFOF2JF0YGmFDXGxUPT3BlbkFJyxwiJU4pHrqZ9KTBqDM7";
// const API_KEY = "sk-proj-QxTqZlpZ3aI72P2PDzepT3BlbkFJovIeyzS8z1yggUgiANlJ";

// const Chatbot = () => {
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I'm ChatGPT! Ask me anything!",
//       sentTime: "just now",
//       sender: "ChatGPT",
//     },
//   ]);
//   const [isTyping, setIsTyping] = useState(false);

//   const handleSendRequest = async (message) => {
//     const newMessage = {
//       message,
//       direction: 'outgoing',
//       sender: "user",
//     };

//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setIsTyping(true);

//     try {
//       const response = await processMessageToChatGPT([...messages, newMessage]);

//       console.log(response, 'response ....');

//       const content = response.choices[0]?.message?.content;
//       if (content) {
//         const chatGPTResponse = {
//           message: content,
//           sender: "ChatGPT",
//         };
//         setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
//       }
//     } catch (error) {
//       console.error("Error processing message:", error);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     const apiMessages = chatMessages.map((messageObject) => {
//       const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
//       return { role, content: messageObject.message };
//     });

//     const apiRequestBody = {
//       "model": "gpt-3.5-turbo",
//       "messages": [
//         { role: "system", content: "I'm a Student using ChatGPT for learning" },
//         ...apiMessages,
//       ],
//     };

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer " + API_KEY,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiRequestBody),
//     });

//     return response.json();
//   }

//   return (
//     <div className="App">
//       <div style={{ position: "relative", height: "800px", width: "700px" }}>
//         <MainContainer>
//           <ChatContainer>
//             <MessageList
//               scrollBehavior="smooth"
//               typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
//             >
//               {messages.map((message, i) => {
//                 console.log(message)
//                 return <Message key={i} model={message} />
//               })}
//             </MessageList>
//             <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />
//           </ChatContainer>
//         </MainContainer>
//       </div>
//     </div>
//   )
// }

// export default Chatbot;


import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using Axios for HTTP requests
import styles from './Chatbot.css'
// const API_KEY = 'your_api_key';
const API_SECRET = 'AIzaSyA_KrfyNGXWI6_yTXRRpUJU4ibZIGtPp3Y';

const Chatbot = () => {
  const [balance, setBalance] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    setIsLoading(true);
    try {
      const nonce = Date.now();
      const payload = {
        nonce,
        request: '/v1/balances',
      };
      const signature = crypto
        .createHmac('sha384', API_SECRET)
        .update(JSON.stringify(payload))
        .digest('hex');
      
      const response = await axios.post('https://api.gemini.com/v1/balances', payload, {
        headers: {
          'Content-Type': 'text/plain',
          // 'X-GEMINI-APIKEY': API_KEY,
          'X-GEMINI-PAYLOAD': Buffer.from(JSON.stringify(payload)).toString('base64'),
          'X-GEMINI-SIGNATURE': signature,
        },
      });
      console.log(response,'response');
      setBalance(response.data);
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call with text input
      setResponseText(`You typed: ${inputText}`);
      setInputText(''); // Clear the input field after submitting
    } catch (error) {
      console.error('Error processing text:', error);
    }
  };

  return (
    <div>
      <h1>Gemini Integration</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Account Balance</h2>
          <ul>
            {Object.entries(balance).map(([currency, amount]) => (
              <li key={currency}>
                {currency}: {amount}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text..."
          
        />
        <button type="submit">Submit</button>
      </form>
      <p>{responseText}</p>
    </div>
  );
};

export default Chatbot;
