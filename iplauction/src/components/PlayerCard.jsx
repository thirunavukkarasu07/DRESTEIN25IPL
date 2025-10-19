import React from 'react';

export default function PlayerCard({ player }){
  return (
    <div className="player-card">
      <div className="player-photo">{player.imageURL ? <img src={player.imageURL} alt={player.name}/> : <div className="avatar">{player.name[0]}</div>}</div>
      <div className="player-info">
        <h3>{player.name}</h3>
        <p>{player.role} • {player.country}</p>
        <p>Base Price: ₹{player.basePrice} Cr</p>
      </div>
    </div>
  )
}
