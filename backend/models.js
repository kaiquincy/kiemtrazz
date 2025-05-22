const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db');

// Khởi tạo các bảng
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Player (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    fullname TEXT,
    age INTEGER,
    level INTEGER
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS Asset (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS PlayerAsset (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player_id INTEGER,
    asset_id INTEGER,
    FOREIGN KEY(player_id) REFERENCES Player(id),
    FOREIGN KEY(asset_id) REFERENCES Asset(id)
  )`);
});

module.exports = db;
