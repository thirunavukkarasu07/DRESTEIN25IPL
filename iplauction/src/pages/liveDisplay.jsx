import React, { useEffect, useState } from 'react';
import PlayerCard from '../components/PlayerCard';
import socket from '../socket';

export default function LiveDisplay(){
  const [player, setPlayer] = useState(null);
  const [soldList, setSoldList] = useState([]);

  useEffect(()=>{
    socket.on('auction:currentPlayer', ({ player }) => setPlayer(player));
    socket.on('auction:playerSold', (data) => setSoldList(prev => [data, ...prev]));
    return ()=>{
      socket.off('auction:currentPlayer');
      socket.off('auction:playerSold');
    }
  },[]);

  return (
    <section className="live container">
      <div className="live-left">
        <h2 className="live-title">Now Revealed</h2>
        {player ? <PlayerCard player={player} /> : <div>No player revealed</div>}
      </div>
      <div className="live-right">
        <h3>Sold Players</h3>
        <div className="sold-list">
          {soldList.length ? soldList.map(s => <div key={s.playerId}>{s.playerId} → {s.teamId} : ₹{s.price}</div>) : <div>No sales yet</div>}
        </div>
      </div>
    </section>
  )
}
