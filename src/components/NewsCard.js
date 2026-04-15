import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import { useTheme } from '../Context/ThemeContext'; // Import hook untuk akses tema

export default function NewsCard({ article, onPress, onBookmark, isBookmarked }) {
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';
  const { colors } = useTheme(); // Mengambil palet warna dinamis (Dark/Light)

  // Fungsi untuk Tugas Poin 5: Share Artikel
  const handleShare = async () => {
    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable && article.url) {
        await Sharing.shareAsync(article.url);
      } else {
        Alert.alert('Info', 'Fitur share tidak tersedia atau link tidak valid');
      }
    } catch (error) {
      console.error('Error sharing', error);
    }
  };

  return (
    // 1. Terapkan warna background kartu
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.card }]} 
      onPress={onPress} 
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: article.urlToImage || PLACEHOLDER_IMAGE }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.sourceContainer}>
          {/* 2. Terapkan warna primary untuk nama sumber berita */}
          <Text style={[styles.source, { color: colors.primary }]}>
            {article.source?.name || 'Unknown Source'}
          </Text>
          {/* 3. Terapkan warna sekunder untuk tanggal */}
          <Text style={[styles.date, { color: colors.textSecondary }]}>
            {new Date(article.publishedAt).toLocaleDateString('id-ID')}
          </Text>
        </View>
        
        {/* 4. Terapkan warna teks utama untuk judul */}
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {article.title}
        </Text>
        
        {/* 5. Terapkan warna sekunder untuk deskripsi */}
        <Text style={[styles.description, { color: colors.textSecondary }]} numberOfLines={3}>
          {article.description}
        </Text>
        
        {/* Tombol Aksi: Bookmark & Share */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            {/* 6. Warna icon share dinamis */}
            <Ionicons name="share-social-outline" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onBookmark} style={styles.iconBtn}>
            {/* 7. Warna icon bookmark dinamis berdasarkan status tersimpan */}
            <Ionicons 
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
              size={24} 
              color={isBookmarked ? colors.primary : colors.textSecondary} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// Hapus warna statis dari sini karena sudah diurus oleh { colors } di atas
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E2E8F0', // Warna abu-abu saat gambar loading dibiarkan statis
  },
  content: {
    padding: 16,
  },
  sourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  }
});