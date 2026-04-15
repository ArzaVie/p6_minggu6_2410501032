import React, { useState, useMemo, useCallback } from 'react';
import { SafeAreaView, FlatList, ActivityIndicator, Text, View, StyleSheet, RefreshControl } from 'react-native';
import * as WebBrowser from 'expo-web-browser'; 
import { useNews } from '../hooks/useNews';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';

// 1. Import useTheme
import { useTheme } from '../Context/ThemeContext'; 

// Daftar Kategori sesuai modul
const CATEGORIES = [
  { label: 'Umum', value: 'general' },
  { label: 'Teknologi', value: 'technology' },
  { label: 'Olahraga', value: 'sports' },
  { label: 'Bisnis', value: 'business' },
  { label: 'Kesehatan', value: 'health' },
];

export default function HomeScreen() {
  const [category, setCategory] = useState('general'); 
  const { bookmarks, toggleBookmark } = useBookmarks(); 
  
  // 2. Panggil palet warnanya
  const { colors } = useTheme(); 
  
  const {
    data, isLoading, isError, error,
    refetch, fetchNextPage, hasNextPage, isFetchingNextPage,
  } = useNews(category);

  const articles = useMemo(() => {
    return data?.pages.flatMap(p => p.articles) || [];
  }, [data]);

  const renderItem = useCallback(({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)} 
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={bookmarks.some(b => b.url === item.url)}
    />
  ), [bookmarks, toggleBookmark]);

  if (isLoading) {
    return (
      // 3. Terapkan warna background dinamis
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        {/* 4. Ubah warna loading indicator jadi warna primary */}
        <ActivityIndicator size="large" color={colors.primary} />
        {/* 5. Terapkan warna teks dinamis */}
        <Text style={{ marginTop: 8, color: colors.text }}>Memuat berita...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: 'red', marginBottom: 8 }}>{error.message || 'Terjadi Kesalahan'}</Text>
      </View>
    );
  }

  return (
    // 6. Terapkan warna background dinamis di kontainer utama
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onChange={setCategory}
      />
      
      <FlatList
        data={articles}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.url + index} 
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} /> 
        }
        onEndReached={() => {
          if (hasNextPage) fetchNextPage(); 
        }}
        onEndReachedThreshold={0.3} 
        ListFooterComponent={
          // 7. Ubah warna loading bawah biar senada
          isFetchingNextPage ? <ActivityIndicator style={{ margin: 16 }} color={colors.primary} /> : null
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F8FAFC', <--- HAPUS ini karena warnanya sudah diurus { backgroundColor: colors.background } di atas
    paddingTop: 16, 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});