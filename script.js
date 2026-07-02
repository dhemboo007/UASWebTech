const API_URL = 'http://localhost:3000/api/transaksi';
let semuaTransaksi = []; // Penyimpanan lokal data untuk fungsi filter

document.addEventListener('DOMContentLoaded', () => {
    muatTransaksi();
    ambilKursEksternal(); // Mengambil data API publik eksternal
    document.getElementById('filterKategori').addEventListener('change', saringTransaksi);
});

// Integrasi Fetch API Publik untuk Kurs Mata Uang USD ke IDR
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
        console.error("Gagal memuat data kurs eksternal:", err);
    }
}

// Mengambil Data Utama dari Backend SQLite
async function muatTransaksi() {
    const res = await fetch(API_URL);
    semuaTransaksi = await res.json();
    saringTransaksi(); // Tampilkan list berdasarkan filter aktif
}

// Menghitung Angka di Statistik Dashboard Ringkasan
function hitungDashboard(data) {
    let total = 0;
    data.forEach(t => total += t.nominal);
    
    document.getElementById('totalPengeluaran').innerText = `Rp ${total.toLocaleString('id-ID')}`;
    document.getElementById('jumlahTransaksi').innerText = `${data.length} Data`;
}

// Menyaring dan Merender Data ke Layar
function saringTransaksi() {
    const filterAktif = document.getElementById('filterKategori').value;
    const wadah = document.getElementById('daftarTransaksi');
    wadah.innerHTML = '';

    const dataTerfilter = semuaTransaksi.filter(t => {
        return filterAktif === 'Semua' || t.kategori === filterAktif;
    });

    hitungDashboard(filterAktif === 'Semua' ? semuaTransaksi : dataTerfilter);

    if (dataTerfilter.length === 0) {
        wadah.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8;">Tidak ada catatan untuk kategori ini.</div>`;
        return;
    }

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
            <div class="aksi-tombol">
                <button class="btn-edit" onclick="pemicuEdit(${JSON.stringify(t).replace(/"/g, '&quot;')})"><i class="fa-regular fa-pen-to-square"></i> Edit</button>
                <button class="btn-hapus" onclick="hapusTransaksi(${t.id})"><i class="fa-regular fa-trash-can"></i> Hapus</button>
            </div>
        `;
        wadah.appendChild(div);
    });
}

// Memicu Mode Edit: Menaikkan Data Lama Kembali ke Form Input
function pemicuEdit(transaksi) {
    document.getElementById('editId').value = transaksi.id;
    document.getElementById('tanggal').value = transaksi.tanggal;
    document.getElementById('kategori').value = transaksi.kategori;
    document.getElementById('deskripsi').value = transaksi.deskripsi || '';
    document.getElementById('nominal').value = transaksi.nominal;

    // Mengubah judul form dan teks tombol submit
    document.getElementById('formTitle').innerText = "Edit / Perbarui Transaksi";
    document.getElementById('btnSubmit').innerHTML = `<i class="fa-solid fa-file-pen"></i> Perbarui Transaksi`;
    
    // Geser halaman ke atas secara halus agar user fokus pada form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mengatur Pengiriman Form (Bisa Aksi Tambah POST atau Aksi Update PUT)
document.getElementById('formTransaksi').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const idEdit = document.getElementById('editId').value;
    const dataTransaksi = {
        tanggal: document.getElementById('tanggal').value,
        kategori: document.getElementById('kategori').value,
        deskripsi: document.getElementById('deskripsi').value,
        nominal: parseFloat(document.getElementById('nominal').value)
    };

    if (idEdit) {
        // Mode UPDATE (PUT)
        await fetch(`${API_URL}/${idEdit}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataTransaksi)
        });
    } else {
        // Mode TAMBAH BARU (POST)
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataTransaksi)
        });
    }

    // Mengembalikan form ke keadaan default/tambah semula
    document.getElementById('editId').value = '';
    document.getElementById('formTransaksi').reset();
    document.getElementById('formTitle').innerText = "Tambah Transaksi Baru";
    document.getElementById('btnSubmit').innerHTML = `<i class="fa-solid fa-paper-plane"></i> Simpan Transaksi`;
    
    muatTransaksi();
});

// Menghapus Data Transaksi (DELETE)
async function hapusTransaksi(id) {
    if (confirm('Apakah Anda yakin ingin menghapus catatan pengeluaran ini?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        muatTransaksi();
    }
}
