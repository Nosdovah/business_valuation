# 💰 Kalkulator Finansial: Nilai Waktu Uang (TVM) & Anuitas

![Status Proyek](https://img.shields.io/badge/Status-Aktif-brightgreen)
![Lisensi](https://img.shields.io/badge/Lisensi-MIT-blue)

## 📖 Deskripsi Singkat
Proyek ini adalah kalkulator finansial interaktif berbasis web yang dirancang untuk menyelesaikan berbagai masalah perhitungan **Nilai Waktu Uang (Time Value of Money)** dan **Anuitas**. Kalkulator ini dibangun sebagai alat bantu praktis untuk memproyeksikan tabungan, menghitung cicilan pinjaman (KPR/kendaraan), merencanakan dana pensiun, dan menganalisis kelayakan investasi. 

Sangat cocok digunakan sebagai referensi cepat bagi mahasiswa bisnis, profesional keuangan, maupun individu yang ingin merencanakan keuangan pribadinya.

## ✨ Fitur Utama
* **Perhitungan Future Value (FV):** Memproyeksikan nilai investasi atau tabungan di masa depan.
* **Perhitungan Present Value (PV):** Mengetahui nilai uang saat ini dari target dana di masa depan.
* **Kalkulasi Anuitas (PMT):** Menghitung cicilan tetap per periode (mendukung *Ordinary Annuity* dan *Annuity Due*).
* **Pencarian Periode (n) & Suku Bunga (i):** Mengetahui berapa lama waktu yang dibutuhkan atau berapa bunga yang diperlukan untuk mencapai target finansial.
* **Arsitektur Berbasis Data:** Menggunakan struktur data JSON terpusat untuk memisahkan logika rumus dari antarmuka pengguna (UI).

## 🛠️ Teknologi yang Digunakan
* **Frontend:** HTML5, CSS3, JavaScript (ES6+)
* **Library Matematika (Opsional):** [Math.js](https://mathjs.org/) untuk menangani perhitungan eksponensial dan logaritma yang presisi.
* **Struktur Data:** JSON

## 🚀 Instalasi & Penggunaan Cepat

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/username-kamu/kalkulator-finansial.git](https://github.com/username-kamu/kalkulator-finansial.git)
    ```
2.  **Buka direktori proyek:**
    ```bash
    cd kalkulator-finansial
    ```
3.  **Jalankan aplikasi:**
    Cukup buka file `index.html` di browser pilihanmu. Tidak memerlukan instalasi server khusus (dapat berjalan statis).

## 📂 Struktur Data (JSON)
Logika soal dan perhitungan di *backend* menggunakan format JSON agar mudah dikembangkan dan diintegrasikan. Contoh struktur:

```json
{
  "tipe_kalkulasi": "Cari PMT (Ordinary Annuity)",
  "input": {
    "present_value_pv": 50000,
    "suku_bunga_i_bulanan": 0.009167,
    "periode_n_bulan": 300
  },
  "rumus_digunakan": "PMT = PV / ((1 - (1 + i)^-n) / i)"
}