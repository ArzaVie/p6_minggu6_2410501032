# Berita Apps -- Mobile Lanjut (Expo)

Praktikum Pengayaan : Aplikasi Berita

## Informasi Mahasiswa

 * Nama : Arzza Munabim
 * NIM 	: 2410501032

 ## Deskripsi Aplikasi

**News App** adalah aplikasi mobile berbasis **React Native (Expo)** yang digunakan untuk membaca berita secara realtime dengan fitur pencarian, filter, bookmark offline, dan mode gelap. Aplikasi ini dirancang untuk memberikan pengalaman membaca berita yang cepat, ringan, dan personal.

## Struktur Project

```
├── App.js
├── app.config.js
├── app.json
├── assets/
├── index.js
├── package.json
├── src/
│   ├── components/
│   │   ├── CategoryFilter.js
│   │   └── NewsCard.js
│   ├── hooks/
│   │   ├── useBookmarks.js
│   │   ├── useNews.js
│   │   └── useSearch.js
│   ├── screens/
│   │   ├── BookmarksScreen.js
│   │   ├── DetailScreen.js
│   │   ├── HomeScreen.js
│   │   └── SearchScreen.js
│   └── services/
│       ├── api.js
│       └── newsService.js
```

## Fitur

- Menampilkan daftar berita utama berdasarkan kategori (Umum, Teknologi, Olahraga, Bisnis, Kesehatan)
- Pencarian berita berdasarkan kata kunci
- Menyimpan berita ke bookmark (disimpan lokal)
- Melihat daftar berita yang sudah di-bookmark
- Infinite scroll untuk daftar berita
- Share berita ke aplikasi lain

### Fitur Wajib

1. Menampilkan daftar berita dari API (NewsAPI)
2. Filter berita berdasarkan kategori
3. Pencarian berita
4. Bookmark berita (AsyncStorage)
5. Share berita

## Cara Install & Jalankan

1. Clone Repo 
2. Install Expo CLI secara global (jika belum):
	```
	npm install -g expo-cli
	```
3. Install dependencies project:
	```
	npm install
	```
4. Jalankan aplikasi:
	```
	npm start
	```
5. Scan QR code dengan aplikasi Expo Go di HP atau jalankan di emulator.