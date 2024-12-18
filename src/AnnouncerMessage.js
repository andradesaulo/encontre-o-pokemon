import { useState, useEffect, useRef } from "react";

const AnnouncerMessage = ({ message }) => {
  const [placeholder, setPlaceholder] = useState("");

  const index = useRef(1);

  useEffect(() => {
    const tick = () => {
      setPlaceholder(message.slice(0, index.current));
      index.current++;
    };
    if (index.current <= message.length) {
      setTimeout(tick, 1);
    }
  }, [placeholder]);

  return <p>{placeholder}</p>;
};

export default AnnouncerMessage;
