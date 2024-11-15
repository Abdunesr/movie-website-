import { useState } from "react";

const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
};

const container = {
  display: "flex",
  gap: "16px",
  textAlign: "center",
};
function Star({ maxRating }) {
  const [rating, setRating] = useState(1);
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
  }
  return (
    <div style={container}>
      {Array.from({ length: 7 }, (_, i) => (
        <Ind
          key={i}
          num={i + 1}
          onRating={() => handleRating(i + 1)}
          full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          rating={rating}
          onHover={() => {
            setTempRating(i + 1);
          }}
          onLeave={() => setTempRating(0)}
        />
      ))}
      <span>{tempRating ? tempRating : rating}</span>
    </div>
  );
}

function Ind({ full, onRating, onHover, onLeave }) {
  return (
    <div>
      <span
        role="button"
        style={starStyle}
        onClick={() => onRating()}
        onMouseEnter={() => onHover()}
        onMouseLeave={() => onLeave()}
      >
        {full ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#ffd700"
            stroke="#000"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="#0000"
            stroke="#000"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
      </span>
    </div>
  );
}

export default Star;