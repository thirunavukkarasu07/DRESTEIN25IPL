import React from 'react';

export default function TeamDashboard(){
  // mock data
  const team = { teamName: 'TestTeam', franchise: null, purseRemaining: 125, players: [] };
  return (
    <section className="team container">
      <h2>Team Dashboard</h2>
      <div className="team-summary">
        <p><strong>Team:</strong> {team.teamName}</p>
        <p><strong>Purse:</strong> ₹{team.purseRemaining} Cr</p>
      </div>
      <div className="team-players">
        <h3>Squad</h3>
        {team.players.length ? team.players.map(p=> <div key={p._id}>{p.name}</div>) : <div>No players yet</div>}
      </div>
    </section>
  )
}
