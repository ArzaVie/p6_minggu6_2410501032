import React, { useState } from 'react';
import { SafeAreaView, View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useNewsSearch } from '../hooks/useSearch';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isError } = useNewsSearch(query);
  const { bookmarks, toggleBookmark } = useBookmarks();

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={bookmarks.some(b => b.url === item.url)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Kotak Pencarian */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berita... (min. 3 huruf)"
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Menampilkan Status Loading/Error/Hasil */}
      {isLoading && query.length >= 3 ? (
        <ActivityIndicator size="large" color="#089182" style={styles.centerElement} />
      ) : isError ? (
        <Text style={styles.centerElement}>Terjadi kesalahan saat mencari data.</Text>
      ) : data?.articles?.length === 0 && query.length >= 3 ? (
        <Text style={styles.centerElement}>Berita tidak ditemukan.</Text>
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
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  centerElement: { marginTop: 32, textAlign: 'center', color: '#64748B' },
});