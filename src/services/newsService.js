import api from './api';

export const newsService = {
  // Mengambil berita utama berdasarkan kategori [cite: 571, 572]
  getTopHeadlines: async (category = 'general', page = 1) => {
    const { data } = await api.get('/top-headlines', {
      params: { country: 'id', category, page, pageSize: 10 } // [cite: 575]
    });
    return { articles: data.articles, totalResults: data.totalResults }; // [cite: 576]
  },

  // Mengambil hasil pencarian berita [cite: 577, 578]
  searchArticles: async (query, page = 1) => {
    const { data } = await api.get('/everything', {
      params: {
        q: query, // [cite: 584]
        language: 'id', // [cite: 585]
        sortBy: 'publishedAt', // [cite: 586]
        page, // [cite: 587]
        pageSize: 10, // [cite: 588]
      }
    });
    return { articles: data.articles, totalResults: data.totalResults }; // [cite: 589]
  }
};