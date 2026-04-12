import React from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';

export default function BookmarksScreen() {
  const { bookmarks, toggleBookmark } = useBookmarks();

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={true} // Pasti true karena ada di halaman bookmarks
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color="#CBD5E1" />
          <Text style={styles.emptyText}>Belum ada berita yang disimpan.</Text>
        </View>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.url + index}
          contentContainerStyle={{ paddingVertical: 16, paddingBottom: 24 }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
});