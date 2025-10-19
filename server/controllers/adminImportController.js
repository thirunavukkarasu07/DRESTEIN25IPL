import fs from 'fs';
import { parse as csvParse } from 'csv-parse';
import multer from 'multer';
import Player from '../models/Player.js';
import Team from '../models/Team.js';
import bcrypt from 'bcryptjs';

export const upload = multer({ dest: 'uploads/' });

const parseCsv = (filePath) => new Promise((resolve, reject) => {
  const rows = [];
  fs.createReadStream(filePath)
    .pipe(csvParse({ columns: true, trim: true }))
    .on('data', (row) => rows.push(row))
    .on('end', () => resolve(rows))
    .on('error', (err) => reject(err));
});

export const importPlayers = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const file = req.file;
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    let rows = [];
    if (ext === 'json') {
      const raw = fs.readFileSync(file.path, 'utf8');
      rows = JSON.parse(raw);
    } else {
      rows = await parseCsv(file.path);
    }

    const created = [];
    for (const r of rows) {
      const playerObj = {
        name: r.name || r.Name,
        role: r.role || r.Role || r.set,
        set: r.set || r.Set || r.role,
        basePrice: Number(r.basePrice || r.BasePrice || 0) || 0,
        country: r.country || r.Country || '',
        imageURL: r.imageURL || r.imageUrl || r.ImageURL || '',
        points: Number(r.points || 0) || 0,
      };
      const p = new Player(playerObj);
      await p.save();
      created.push(p);
    }

    // cleanup upload
    fs.unlinkSync(file.path);
    res.json({ createdCount: created.length, created });
  } catch (err) {
    console.error('importPlayers error', err);
    res.status(500).json({ message: err.message });
  }
};

export const importTeams = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const file = req.file;
    const ext = (file.originalname || '').split('.').pop().toLowerCase();
    let rows = [];
    if (ext === 'json') {
      const raw = fs.readFileSync(file.path, 'utf8');
      rows = JSON.parse(raw);
    } else {
      rows = await parseCsv(file.path);
    }

    const created = [];
    for (const r of rows) {
      const membersRaw = r.members || r.Members || '';
      const members = typeof membersRaw === 'string' ? membersRaw.split(';').map(s=>s.trim()).filter(Boolean) : membersRaw;
      const password = r.password || 'changeme';
      const hash = await bcrypt.hash(password, 10);
      const teamObj = {
        teamName: r.teamName || r.TeamName || 'Team',
        members,
        department: r.department || r.Department || '',
        email: r.email || r.Email,
        passwordHash: hash,
        approved: (String(r.approved || '').toLowerCase() === 'true') || false,
        role: (r.role || 'team')
      };
      const t = new Team(teamObj);
      await t.save();
      created.push(t);
    }

    fs.unlinkSync(file.path);
    res.json({ createdCount: created.length, created });
  } catch (err) {
    console.error('importTeams error', err);
    res.status(500).json({ message: err.message });
  }
};
