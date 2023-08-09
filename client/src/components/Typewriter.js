/** @format */

import { useState, useEffect } from "react";

const Typewriter = ({ sentences }) => {
  const [displayText, setDisplayText] = useState(sentences[0]);

  useEffect(() => {
    let sentenceIndex = 0;
    let textIndex = 0;
    const updateText = () => {
      if (textIndex === sentences[sentenceIndex].length) {
        sentenceIndex = (sentenceIndex + 1) % sentences.length;
        textIndex = 0;
      }
      setDisplayText(sentences[sentenceIndex].slice(0, textIndex + 1));
      textIndex += 1;
      setTimeout(updateText, 100);
    };
    setTimeout(updateText, 1000);
  }, []);

  return (
    <div className="row col-12">
      <div
        className="col-sm-12 col-md-12 col-lg-3 text-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, .5)",
          border: "2px solid rgba(255, 255, 255, .5)",
          borderRight: "0px",
          color: "#DA3E10",
        }}
      >
        IMPACTVerse
      </div>
      <div
        className="col-sm-12 col-md-12 col-lg-9 text-dark"
        style={{
          backgroundColor: "rgba(255, 255, 255, .5)",
          border: "2px solid rgb(0, 0, 0)",
          borderLeft: "0px",
        }}
      >
        {displayText}
      </div>
    </div>
  );
};

export default Typewriter;
