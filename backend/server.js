const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// API 1: registerplayer
app.post('/registerplayer', (req, res) => {
  const { name, fullname, age, level } = req.body;
  db.run(
    'INSERT INTO Player (name, fullname, age, level) VALUES (?, ?, ?, ?)',
    [name, fullname, age, level],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// API 2: createasset
app.post('/createasset', (req, res) => {
  const { name } = req.body;
  db.run('INSERT INTO Asset (name) VALUES (?)', [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// (Extra) Gán tài sản cho người chơi
app.post('/assignasset', (req, res) => {
  const { player_id, asset_id } = req.body;
  db.run(
    'INSERT INTO PlayerAsset (player_id, asset_id) VALUES (?, ?)',
    [player_id, asset_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

// API 3: getassetsbyplayer
app.get('/getassetsbyplayer', (req, res) => {
  const query = `
    SELECT Player.name AS playerName, Player.level, Player.age, Asset.name AS assetName
    FROM PlayerAsset
    JOIN Player ON Player.id = PlayerAsset.player_id
    JOIN Asset ON Asset.id = PlayerAsset.asset_id
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log('Backend running at http://localhost:3001');
});
