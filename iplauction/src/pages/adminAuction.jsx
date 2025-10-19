import React, { useEffect, useState } from 'react';
import SpinWheel from '../components/SpinWheel';
import PlayerCard from '../components/PlayerCard';
import socket from '../socket';
import AdminCSVUpload from '../components/AdminCSVUpload';

export default function AdminAuction(){
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    socket.on('auction:currentPlayer', ({ player }) => {
      setPlayer(player);
      setError(null);
    });
    socket.on('auction:error', (err) => setError(err?.message || 'Error'));
    socket.on('auction:playerSold', (data) => {
      // you could update UI to show sold status
      console.log('playerSold', data);
    });
    return ()=>{
      socket.off('auction:currentPlayer');
      socket.off('auction:error');
      socket.off('auction:playerSold');
    }
  },[]);

  const pickRandom = () => {
    socket.emit('admin:pick-random', { tag: null });
  }

  const markSold = () => {
    if (!player) return;
    const teamId = prompt('Team ID to sell to:');
    const price = parseFloat(prompt('Final price (number):')) || 0;
    socket.emit('admin:mark-sold', { playerId: player._id, teamId, price });
  }

  return (
    <section className="admin container">
      <div className="admin-left">
        <h2>Spin Wheel</h2>
        <SpinWheel />
        <h3>Import Data</h3>
        <AdminCSVUpload url="http://localhost:5002/api/admin/resources/players/import" label="Upload players (CSV or JSON)" />
        <AdminCSVUpload url="http://localhost:5002/api/admin/resources/teams/import" label="Upload teams (CSV or JSON)" />
        <div className="controls">
          <button className="btn btn-primary" onClick={pickRandom}>Pick Random Player</button>
          {error && <div className="error">{error}</div>}
        </div>
      </div>
      <div className="admin-right">
        <h2>Selected Player</h2>
        {player ? <PlayerCard player={player} /> : <div>No player selected</div>}
        <div className="admin-actions">
          <button className="btn btn-success" onClick={markSold}>Mark Sold</button>
          <button className="btn">Mark Unsold</button>
        </div>
      </div>
    </section>
  )
}
