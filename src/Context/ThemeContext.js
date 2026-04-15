import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';

// Membuat Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Mendeteksi tema dari sistem (HP pengguna)
  const colorScheme = useColorScheme(); 
  const isDark = colorScheme === 'dark';

  // Palet warna dinamis
  const theme = {
    isDark,
    colors: {
      background: isDark ? '#0F172A' : '#F8FAFC', // Warna latar belakang layar
      card: isDark ? '#1E293B' : '#FFFFFF',       // Warna latar belakang kartu berita
      text: isDark ? '#F8FAFC' : '#0F172A',       // Warna judul
      textSecondary: isDark ? '#94A3B8' : '#475569', // Warna teks deskripsi
      primary: '#089182',                         // Warna hijau utama
    },
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook agar lebih mudah memanggil tema di komponen lain
export const useTheme = () => useContext(ThemeContext);