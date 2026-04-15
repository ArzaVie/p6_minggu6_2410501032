import React from 'react';
import { SafeAreaView, FlatList, Text, View, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { useBookmarks } from '../hooks/useBookmarks';
import NewsCard from '../components/NewsCard';

// 1. Import useTheme
import { useTheme } from '../Context/ThemeContext';

export default function BookmarksScreen() {
  const { bookmarks, toggleBookmark } = useBookmarks();
  
  // 2. Panggil warnanya
  const { colors } = useTheme();

  const renderItem = ({ item }) => (
    <NewsCard
      article={item}
      onPress={() => WebBrowser.openBrowserAsync(item.url)}
      onBookmark={() => toggleBookmark(item)}
      isBookmarked={true}
    />
  );

  return (
    // 3. Background dinamis
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {bookmarks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="bookmark-outline" size={64} color={colors.textSecondary} />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            Belum ada berita yang disimpan.
          </Text>
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
  container: { flex: 1 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
  },
});