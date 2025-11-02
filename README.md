# SITTA - Sistem Informasi Pemesanan Bahan Ajar

**Aplikasi Web untuk Manajemen Bahan Ajar dan Tracking Pengiriman**

## 📋 **DESKRIPSI PROYEK**

SITTA (Sistem Informasi Pemesanan Bahan Ajar) adalah aplikasi web yang dibangun menggunakan HTML, CSS, dan JavaScript murni (tanpa framework) untuk mengelola informasi bahan ajar, tracking pengiriman, laporan, dan histori transaksi bahan ajar di Universitas Terbuka.

Aplikasi ini merupakan hasil dari **Tugas Praktik 1** yang mengimplementasikan berbagai konsep web development meliputi struktur HTML semantik, styling CSS modern, dan interaktivitas JavaScript dengan DOM manipulation.

## 📁 **STRUKTUR FILE PROYEK**

```
sitta-praktik/
│
├── assets/
│   └── img/
│       ├── book.png (fallback image)
│       ├── pengantar_komunikasi.jpg
│       ├── manajemen_keuangan.jpg
│       ├── kepemimpinan.jpg
│       ├── mikrobiologi.jpg
│       └── paud_perkembangan.jpeg
│
├── css/
│   └── style.css (semua styling aplikasi)
│
├── js/
│   ├── data.js (data dummy/constants)
│   └── script.js (logika aplikasi)
│
├── index.html (halaman login)
├── dashboard.html (dashboard utama)
├── stok.html (manajemen stok bahan ajar)
├── tracking.html (tracking pengiriman)
├── laporan.html (laporan monitoring & rekap)
├── histori.html (histori transaksi)
│
└── README.md (dokumentasi)
```

## 💾 **DATA STORAGE**

Aplikasi menggunakan **LocalStorage** untuk menyimpan:

- Data stok bahan ajar (setelah modifikasi)
- Session user yang sedang login

## 👨‍💻 **AUTHOR**

**Arda Bahrul Ulum**

Proyek ini dibuat sebagai bagian dari **Tugas Praktik 1** untuk pembelajaran web development menggunakan HTML, CSS, dan JavaScript.

## 📄 **LICENSE**

Proyek ini dibuat untuk keperluan edukasi dan praktikum.

**© 2025 SITTA Universitas Terbuka. Dibuat untuk Tugas Praktik 1.**
