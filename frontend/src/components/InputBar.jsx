import React, { useRef } from 'react';

const InputBar = ({ input, setInput, onSubmit }) => {
  const recognitionRef = useRef(null);

  const handleVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onresult = (event) => {
        setInput(event.results[0][0].transcript);
      };
    }

    recognitionRef.current.start();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask about your fare, trip, or anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="button" onClick={handleVoice}>🎤</button>
      <button type="submit">Send</button>
    </form>
  );
};

export default InputBar;
