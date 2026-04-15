import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useNewsSearch } from '../hooks/useSearch';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';

// 1. Import useTheme
import { useTheme } from '../Context/ThemeContext'; // Pastikan path-nya sesuai (Context huruf besar/kecil)

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useNewsSearch(query);
  const { bookmarks, toggleBookmark } = useBookmarks();
  
  // 2. Panggil warnanya
  const { colors, isDark } = useTheme();

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={bookmarks.some(b => b.url === item.url)}
    />
  );

  return (
    // 3. Background layar utama
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Cari berita... (min. 3 huruf)"
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
          keyboardAppearance={isDark ? "dark" : "light"}
        />
      </View>

      {isLoading && query.length >= 3 ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.centerElement} />
      ) : isError ? (
        <Text style={[styles.centerElement, { color: 'red' }]}>Terjadi kesalahan saat mencari data.</Text>
      ) : data?.articles?.length === 0 && query.length >= 3 ? (
        <Text style={[styles.centerElement, { color: colors.textSecondary }]}>Berita tidak ditemukan.</Text>
      ) : (
        <FlatList
          data={data?.articles || []}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 48, fontSize: 16 },
  centerElement: { marginTop: 32, textAlign: 'center' },
});