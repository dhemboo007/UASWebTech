const API_URL = 'http://localhost:3000/api/transaksi';
let semuaTransaksi = []; // Tempat menyimpan data lokal untuk keperluan filter

document.addEventListener('DOMContentLoaded', () => {
    muatTransaksi();
    ambilKursEksternal(); // Jalankan integrasi API publik
    
    // Pasang Event Listener untuk fitur filter tambahan
    document.getElementById('filterKategori').addEventListener('change', saringTransaksi);
});

// Added Value: Integrasi Data API Publik Eksternal
async function ambilKursEksternal() {
    try {
        const res = await fetch('https://open.er-api.com/v6/latest/USD');
        const data = await res.json();
        if (data && data.rates && data.rates.IDR) {
            const rupiah = Math.round(data.rates.IDR).toLocaleString('id-ID');
            document.getElementById('kursUSD').innerText = `1 USD = Rp ${rupiah}`;
        }
    } catch (err) {
        document.getElementById('kursUSD').innerText = "Gagal memuat info kurs";
        console.error("Gagal fetch API publik:", err);
    }
}

// Ambil & Tampilkan Data, sekaligus menghitung statistik Dashboard (Added Value)[cite: 2]
async function muatTransaksi() {
    const res = await fetch(API_URL);
    semuaTransaksi = await res.json();
    saringTransaksi(); // Render list sesuai filter aktif
}

// Fungsi Menghitung Angka Dashboard Ringkasan
function hitungDashboard(data) {
    let total = 0;
    data.forEach(t => total += t.nominal);
    
    document.getElementById('totalPengeluaran').innerText = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById('jumlahTransaksi').innerText = `${data.length} Data`;
}

// Fitur Tambahan: Saring Data Berdasarkan Kategori Tanpa Reload Page
function saringTransaksi() {
    const filterAktif = document.getElementById('filterKategori').value;
    const wadah = document.getElementById('daftarTransaksi');
    wadah.innerHTML = '';

    // Proses filtering array javascript
    const dataTerfilter = semuaTransaksi.filter(t => {
        return filterAktif === 'Semua' || t.kategori === filterAktif;
    });

    // Update data ringkasan dashboard sesuai filter atau total data keseluruhan
    hitungDashboard(filterAktif === 'Semua' ? semuaTransaksi : dataTerfilter);

    if (dataTerfilter.length === 0) {
        wadah.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8;">Tidak ada catatan untuk kategori ini.</div>`;
        return;
    }

    // Render item ke UI dengan struktur visual yang elok[cite: 2]
    dataTerfilter.forEach(t => {
        const div = document.createElement('div');
        div.className = 'item-transaksi';
        div.innerHTML = `
            <div class="info-transaksi">
                <strong><i class="fa-regular fa-calendar"></i> ${t.tanggal}</strong>
                <span class="kategori-tag tag-${t.kategori}">${t.kategori}</span>
                <span class="deskripsi-teks">${t.deskripsi || '-'}</span>
                <div class="nominal-teks">Rp ${Number(t.nominal).toLocaleString('id-ID')}</div>
            </div>
            <button class="btn-hapus" onclick="hapusTransaksi(${t.id})"><i class="fa-regular fa-trash-can"></i> Hapus</button>
        `;
        wadah.appendChild(div);
    });
}

// Tambah Transaksi (POST)
document.getElementById('formTransaksi').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dataBaru = {
        tanggal: document.getElementById('tanggal').value,
        kategori: document.getElementById('kategori').value,
        deskripsi: document.getElementById('deskripsi').value,
        nominal: parseFloat(document.getElementById('nominal').value)
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataBaru)
    });

    document.getElementById('formTransaksi').reset();
    muatTransaksi();
});

// Hapus Transaksi (DELETE)
async function hapusTransaksi(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pengeluaran ini?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        muatTransaksi();
    }
}