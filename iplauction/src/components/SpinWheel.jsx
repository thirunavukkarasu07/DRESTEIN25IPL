import React, { useState } from 'react';

export default function SpinWheel(){
  const [angle, setAngle] = useState(0);
  const spin = () => {
    const rand = Math.floor(Math.random() * 3600) + 720;
    setAngle(prev => prev + rand);
  }
  return (
    <div className="spinwheel-wrapper">
      <div className="wheel" style={{ transform: `rotate(${angle}deg)` }} onClick={spin}>
        <div className="segment">Batsmen</div>
        <div className="segment">Bowlers</div>
        <div className="segment">All-Rounders</div>
        <div className="segment">Wicketkeepers</div>
      </div>
      <div className="wheel-hub">Spin</div>
    </div>
  )
}
