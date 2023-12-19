import { useState } from "react"
import OpenAI from "openai"
// const { Configuration, OpenAIApi } = require("openai");

const ChatbotApp = () => {
  const openAi = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  const [response, setResponse] = useState('');
  console.log("....")
  console.log(process.env.REACT_APP_OPENAI_API_KEY)
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY
  const getSummary = async () => {
    try {
      const textToSummarize = 'The best known natural language processing tool is GPT-3, from OpenAI, which uses AI and statistics to predict the next word in a sentence based on the preceding words. NLP practitioners call tools like this “language models,” and they can be used for simple analytics tasks, such as classifying documents and analyzing the sentiment in blocks of text, as well as more advanced tasks, such as answering questions and summarizing reports.'; // Replace this with the text you want to summarize
  
      const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: textToSummarize,
          max_tokens: 200, // Increase the tokens to get a longer summary
          temperature: 0.5, // Adjust temperature for diversity in output
        })
      });
  
      const data = await response.json();
      console.log('API Response:', data);
  
    //   setOriginalText(textToSummarize);
        setResponse(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <button onClick={getSummary}>Get AI Response</button>
      <div>{response}</div>
    </div>
  );
};


export default ChatbotApp;