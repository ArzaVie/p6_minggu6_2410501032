import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

export default function NewsCard({ article, onPress, onBookmark, isBookmarked }) {
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: article.urlToImage || PLACEHOLDER_IMAGE }}
        style={styles.image}
      />
      <View style={styles.content}>
        <View style={styles.sourceContainer}>
          <Text style={styles.source}>{article.source?.name || 'Unknown Source'}</Text>
          <Text style={styles.date}>
            {new Date(article.publishedAt).toLocaleDateString('id-ID')}
          </Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{article.description}</Text>
        
        {/* Tombol Aksi: Bookmark & Share */}
        <View style={styles.actions}>
          <TouchableOpacity onPress={handleShare} style={styles.iconBtn}>
            <Ionicons name="share-social-outline" size={24} color="#64748B" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onBookmark} style={styles.iconBtn}>
            <Ionicons 
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'} 
              size={24} 
              color={isBookmarked ? '#089182' : '#64748B'} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#E2E8F0',
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
    color: '#089182',
  },
  date: {
    fontSize: 12,
    color: '#64748B',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#475569',
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