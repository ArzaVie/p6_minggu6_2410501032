import axios from 'axios';
import Constants from 'expo-constants';

// Membuat instance axios dengan konfigurasi default [cite: 66, 67]
const api = axios.create({
  // Mengambil Base URL dari konfigurasi expo [cite: 68]
  baseURL: Constants.expoConfig?.extra?.newsApiBaseUrl,
  timeout: 10000, // Timeout jika server lama merespons [cite: 69]
  headers: {
    // Memasukkan API Key ke header sesuai dokumentasi NewsAPI [cite: 275, 276]
    'X-Api-Key': Constants.expoConfig?.extra?.newsApiKey,
    'Content-Type': 'application/json',
  },
});

export default api;