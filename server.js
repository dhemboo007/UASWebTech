const express = require('express');
const cors = require('cors');
const db = require('../database/database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Melayani file statis dari folder frontend agar bisa diakses lewat localhost:3000
app.use(express.static(path = require('path').join(__dirname, '../frontend')));

// GET: Lihat riwayat transaksi 
app.get('/api/transaksi', (req, res) => {
    db.all("SELECT * FROM transaksi ORDER BY tanggal DESC", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// POST: Tambah transaksi baru 
app.post('/api/transaksi', (req, res) => {
    const { tanggal, kategori, deskripsi, nominal } = req.body;
    if (!tanggal || !nominal) {
        return res.status(400).json({ error: "Tanggal dan nominal wajib diisi!" });
    }
    const sql = `INSERT INTO transaksi (tanggal, kategori, deskripsi, nominal) VALUES (?, ?, ?, ?)`;
    db.run(sql, [tanggal, kategori, deskripsi, nominal], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, message: "Transaksi berhasil ditambahkan." });
    });
});

// DELETE: Hapus transaksi 
app.delete('/api/transaksi/:id', (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM transaksi WHERE id = ?`, id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Transaksi berhasil dihapus." });
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});