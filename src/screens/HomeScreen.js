import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, View, StyleSheet, RefreshControl } from 'react-native';
import * as WebBrowser from 'expo-web-browser'; // Untuk membuka link berita
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';

// Daftar Kategori sesuai modul
const CATEGORIES = [
  { label: 'Umum', value: 'general' },
  { label: 'Teknologi', value: 'technology' },
  { label: 'Olahraga', value: 'sports' },
  { label: 'Bisnis', value: 'business' },
  { label: 'Kesehatan', value: 'health' },
];

export default function HomeScreen() {
  const [category, setCategory] = useState('general'); // State untuk kategori aktif
  const { bookmarks, toggleBookmark } = useBookmarks(); // Mengambil fungsi bookmark
  
  // Mengambil data dari React Query
  const {
    data, isLoading, isError, error,
    refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useNews(category);

  // Menggabungkan semua halaman artikel dari infinite scroll menjadi satu array
  const articles = useMemo(() => {
    return data?.pages.flatMap(p => p.articles) || [];
  }, [data]);

  // Fungsi untuk merender setiap kartu berita
  const renderItem = useCallback(({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)} // Buka artikel di browser internal
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={bookmarks.some(b => b.url === item.url)}
    />
  ), [bookmarks, toggleBookmark]);

  // Tampilan saat pertama kali loading
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#089182" />
        <Text style={{ marginTop: 8 }}>Memuat berita...</Text>
      </View>
    );
  }

  // Tampilan saat error (misal koneksi putus atau API Key salah)
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red', marginBottom: 8 }}>{error.message || 'Terjadi Kesalahan'}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Komponen Filter Kategori */}
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={setCategory}
      />
      
      {/* Daftar Berita (FlatList) */}
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.url + index} // Hindari error jika ada URL ganda
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} /> // Fitur Pull-to-refresh
        }
        onEndReached={() => {
          if (hasNextPage) fetchNextPage(); // Memuat halaman berikutnya saat scroll mentok
        }}
        onEndReachedThreshold={0.3} // Panggil fetchNextPage saat sisa scroll 30%
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 16, // Jarak dari atas layar
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});