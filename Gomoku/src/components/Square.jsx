// Square.jsx
import React, { useState } from 'react';
import '../Style/Square.css';

const Square = () => {
  const [hasCoin, setHasCoin] = useState(false);

  const handleClick = () => {
    setHasCoin(true);
  };

  return (
    <div className="square" onClick={handleClick}>
      {hasCoin && <div className="coin" />}
    </div>
  );
};

export default Square;
