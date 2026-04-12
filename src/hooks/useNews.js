import { useInfiniteQuery } from '@tanstack/react-query';
import { newsService } from '../services/newsService';

export const useNews = (category) => {
  return useInfiniteQuery({
    queryKey: ['news', category], // [cite: 603]
    queryFn: ({ pageParam = 1 }) => newsService.getTopHeadlines(category, pageParam), // [cite: 604, 605]
    
    // Logika untuk menentukan apakah masih ada halaman selanjutnya (infinite scroll) [cite: 606]
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((sum, p) => sum + p.articles.length, 0); // [cite: 607, 608]
      if (totalFetched >= lastPage.totalResults) return undefined; // [cite: 609]
      return allPages.length + 1; // [cite: 610]
    },
    initialPageParam: 1, // [cite: 611]
    staleTime: 5 * 60 * 1000, // Cache bertahan selama 5 menit [cite: 615]
  });
};