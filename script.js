/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
}

body {
    background-color: #f0f4f8;
    color: #1e293b;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 100vh;
    padding: 40px 20px;
}

.container {
    width: 100%;
    max-width: 650px;
    background: #ffffff;
    padding: 35px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(30, 41, 59, 0.05);
}

/* Header */
h2 {
    color: #0f172a;
    font-size: 1.6rem;
    margin-bottom: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 10px;
}

.text-primary { color: #3b82f6; }

/* API Publik: Rate Card Widget */
.rate-card {
    background: linear-gradient(135deg, #1e293b, #334155);
    color: #f8fafc;
    padding: 15px 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.rate-title { font-size: 0.8rem; color: #94a3b8; display: block; margin-bottom: 2px;}
.rate-value { font-size: 1.1rem; font-weight: 600; color: #38bdf8; }
.rate-icon { font-size: 1.5rem; color: #475569; }

/* Dashboard Cards Grid */
.dashboard-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 25px;
}

.card {
    padding: 18px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}
.card-total { background-color: #ef44440f; border: 1px solid #ef444422; }
.card-count { background-color: #3b82f60f; border: 1px solid #3b82f622; }
.card-title { font-size: 0.85rem; font-weight: 600; color: #64748b; text-transform: uppercase; }
.card-value { font-size: 1.4rem; font-weight: 700; }
#totalPengeluaran { color: #dc2626; }
#jumlahTransaksi { color: #2563eb; }

/* Form Styles */
form {
    background: #f8fafc;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    margin-bottom: 30px;
}
form h3 { margin-bottom: 15px; font-size: 1rem; color: #475569; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
.form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 15px; }
label { font-size: 0.85rem; font-weight: 600; color: #475569; }

input, select {
    padding: 11px 14px;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    font-size: 0.95rem;
    background: #fff;
    outline: none;
    transition: all 0.2s;
}
input:focus, select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

button[type="submit"] {
    width: 100%;
    padding: 12px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}
button[type="submit"]:hover { background-color: #2563eb; }

/* Filter Section */
.list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.list-header h3 { font-size: 1.1rem; font-weight: 600; }
.filter-select { width: auto; padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; }

/* Transaction List Item */
#daftarTransaksi { display: flex; flex-direction: column; gap: 12px; }
.item-transaksi {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.01);
    transition: transform 0.2s;
}
.item-transaksi:hover { transform: scale(1.01); }

.info-transaksi strong { color: #94a3b8; font-size: 0.75rem; display: block; margin-bottom: 6px; }
.kategori-tag {
    display: inline-block;
    padding: 3px 10px;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    margin-right: 8px;
}

/* Dinamis Warna Tag Kategori */
.tag-Makanan { background: #ffedd5; color: #ea580c; }
.tag-Transportasi { background: #dbeafe; color: #2563eb; }
.tag-Hiburan { background: #f3e8ff; color: #9333ea; }
.tag-Lainnya { background: #f1f5f9; color: #475569; }

.deskripsi-teks { font-size: 0.95rem; font-weight: 500; color: #334155; }
.nominal-teks { font-size: 1.1rem; font-weight: 700; color: #dc2626; margin-top: 6px; }

/* Action Buttons Container */
.aksi-tombol {
    display: flex;
    gap: 8px;
}

/* Edit & Delete Button Styles */
.btn-edit {
    background: #f0fdf4;
    color: #16a34a;
    border: 1px solid #bbf7d0;
    padding: 8px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-edit:hover { background: #16a34a; color: white; }

.btn-hapus {
    background: #fff5f5;
    color: #ef4444;
    border: 1px solid #fee2e2;
    padding: 8px 12px;
    font-size: 0.85rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
}
.btn-hapus:hover { background: #ef4444; color: white; }
