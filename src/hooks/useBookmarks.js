import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load data bookmark saat aplikasi pertama kali dibuka
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem('bookmarks');
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error('Gagal memuat bookmarks', error);
      }
    };
    loadBookmarks();
  }, []);

  // Fungsi untuk menambah atau menghapus bookmark
  const toggleBookmark = async (article) => {
    try {
      const isExist = bookmarks.some((b) => b.url === article.url);
      let newBookmarks;
      
      if (isExist) {
        // Hapus jika sudah ada
        newBookmarks = bookmarks.filter((b) => b.url !== article.url);
      } else {
        // Tambah jika belum ada
        newBookmarks = [...bookmarks, article];
      }
      
      setBookmarks(newBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Gagal menyimpan bookmark', error);
    }
  };

  return { bookmarks, toggleBookmark };
};