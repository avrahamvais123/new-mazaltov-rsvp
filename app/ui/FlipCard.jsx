"use clien";

import { useState } from "react";
import ReactFlipTilt from "react-flip-tilt";

const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div /* onClick={handleFlip} */ style={{ cursor: "pointer" }}>
      <ReactFlipTilt
        front={
          <div className="card-front" style={cardStyle}>
            <h2>Front Side</h2>
          </div>
        }
        back={
          <div className="card-back" style={cardStyle}>
            <h2>Back Side</h2>
          </div>
        }
        //isFlipped={flipped}
        flipDirection="horizontal" // או "vertical" אם רוצים הפיכה אנכית
        flipSpeed={1000} // זמן ההפיכה במילישניות
      />
    </div>
  );
};

const cardStyle = {
  width: "200px",
  height: "300px",
  backgroundColor: "lightblue",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default FlipCard;
