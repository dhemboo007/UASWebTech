const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'keuangan.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Gagal menghubungkan database:', err.message);
    } else {
        console.log('Terhubung ke database SQLite.');
    }
});

// Membuat tabel transaksi berdasarkan struktur yang ditentukan [cite: 16]
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transaksi (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tanggal TEXT NOT NULL,
            kategori TEXT,
            deskripsi TEXT,
            nominal REAL NOT NULL
        )
    `);
});

module.exports = db;