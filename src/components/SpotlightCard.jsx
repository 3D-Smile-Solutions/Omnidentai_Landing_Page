import { useRef } from 'react';
import React, {forwardRef} from 'react';
import './SpotlightCard.css';

const SpotlightCard = forwardRef(({ children, className, spotlightColor }, ref) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}>
      {children}
    </div>
  );
});

export default SpotlightCard;
