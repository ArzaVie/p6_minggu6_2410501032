import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.value}
          style={[styles.button, selected === cat.value && styles.buttonSelected]}
          onPress={() => onChange(cat.value)}
        >
          <Text style={[styles.text, selected === cat.value && styles.textSelected]}>
            {cat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  buttonSelected: {
    backgroundColor: '#089182',
  },
  text: {
    color: '#475569',
    fontWeight: '600',
  },
  textSelected: {
    color: '#FFFFFF',
  },
});