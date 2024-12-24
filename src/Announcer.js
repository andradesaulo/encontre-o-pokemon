import { useState, useEffect } from "react";
import AnnouncerMessage from "./AnnouncerMessage";

const Announcer = ({ messages }) => {
  /*
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      }, messages[currentMessageIndex].length * 25 + 500);
    }
  }, [currentMessageIndex, messages]);
  */

  return (
    <div className="announcer">
      <div className="announcerMessages">
        <AnnouncerMessage key={messages.length} message={messages[0]} />
        {messages.slice(1, messages.length).map((msg, index) => (
          <p key={index} style={{ opacity: 0.5 }}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Announcer;
