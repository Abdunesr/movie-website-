import { useState } from "react";

const container = {
  display: "flex",
  alignItem: "center",
  gap: "6px",
};

export default function Starrate({
  color = "blue",
  size = "15px",
  message = [],
  defaultRating = 0,
  onchange,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tmeprate, setTempRate] = useState(0);

  const textStyle = {
    color: `${color}`,
    fontSize: { size },
  };
  return (
    <div style={container}>
      <div style={container}>
        {Array.from({ length: 10 }, (_, i) => (
          <MainRating
            key={i}
            onRating={() => {
              onchange(rating);
              setRating(i + 1);
            }}
            full={tmeprate ? tmeprate >= i + 1 : rating >= i + 1}
            OnHover={() => setTempRate(i + 1)}
            OfHover={() => setTempRate(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <h2 style={textStyle}>
        {message.length === 10
          ? message[tmeprate ? tmeprate - 1 : rating - 1]
          : tmeprate
          ? tmeprate
          : rating}
      </h2>
    </div>
  );
}

function MainRating({ onRating, full, OnHover, OfHover, size, color }) {
  const star = {
    width: `${size}`,
    height: `${size}`,
    cursor: "pointer",
    display: "block",
  };
  return (
    <span
      style={star}
      role="button"
      onClick={onRating}
      onMouseEnter={OnHover}
      onMouseLeave={OfHover}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
