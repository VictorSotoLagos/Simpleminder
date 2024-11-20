import React from "react";
import "./TopBarEmoticonTest.css";
import emoji1 from "../../assets/emoticons/1.png";
import emoji2 from "../../assets/emoticons/2.png";
import emoji3 from "../../assets/emoticons/3.png";
import emoji4 from "../../assets/emoticons/4.png";
import emoji5 from "../../assets/emoticons/5.png";

const emojis = [emoji1, emoji2, emoji3, emoji4, emoji5];
const TopBarEmoticonTest = () => {
  return (
    <div className="emoticon-test">
      <h3>¿Cómo te sientes hoy</h3>
      {emojis.map((src, index) => (
        <button
          key={index}
          className="emoji-button"
          onClick={() => console.log(`Emoji ${index + 1} seleccionado`)}
        >
          <img src={src} alt={`Emoji ${index + 1}`} width="50" />
        </button>
      ))}
    </div>
  );
};

export default TopBarEmoticonTest;
