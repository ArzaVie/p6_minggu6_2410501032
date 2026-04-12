import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

export const useNewsSearch = (query) => {
  const [debouncedQuery, setDebouncedQuery] = useState(''); // [cite: 620]

  useEffect(() => {
    // Menunda update query selama 500ms [cite: 622]
    const timer = setTimeout(() => setDebouncedQuery(query), 500); 
    return () => clearTimeout(timer); // [cite: 623]
  }, [query]); // [cite: 624]

  return useQuery({
    queryKey: ['search', debouncedQuery], // [cite: 626]
    queryFn: () => newsService.searchArticles(debouncedQuery), // [cite: 627]
    enabled: debouncedQuery.length >= 3, // Hanya mencari jika minimal 3 karakter [cite: 628]
    staleTime: 2 * 60 * 1000, // [cite: 629]
  });
};