import React from 'react';
import '../styles/stars.css'

const StarRating = ({ rating, setRating }) => {
  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const className = i <= rating ? 'star filled' : 'star';
    stars.push(
      <span
        key={i}
        className={className}
        onClick={() => setRating(i)}
      >
        &#9733;
      </span>
    );
  }

  return <div className="star-rating">{stars}</div>;
};

export default StarRating;
