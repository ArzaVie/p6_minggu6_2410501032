import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

// Tambahkan parameter filters di sini
export const useNewsSearch = (query, filters = {}) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const { fromDate, toDate, source } = filters;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500); 
    return () => clearTimeout(timer); 
  }, [query]); 

  return useQuery({
    // Masukkan filter ke dalam queryKey agar otomatis refresh jika filter diubah
    queryKey: ['search', debouncedQuery, fromDate, toDate, source], 
    queryFn: () => newsService.searchArticles(debouncedQuery, 1, fromDate, toDate, source), 
    enabled: debouncedQuery.length >= 3, 
    staleTime: 2 * 60 * 1000, 
  });
};