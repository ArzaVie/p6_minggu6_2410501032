import api from './api';

export const newsService = {
  // Mengambil berita utama berdasarkan kategori
  getTopHeadlines: async (category = 'general', page = 1) => {
    try {
      const { data } = await api.get('/top-headlines', {
        // 1. UBAH country jadi 'us' (Amerika) karena 'id' sering kosong
        params: { country: 'us', category, page, pageSize: 10 } 
      });
      
      // CCTV: Cetak ke terminal buat ngecek isinya!
      console.log(`[HEADLINES] Dapet ${data.articles.length} berita untuk kategori ${category}`);
      
      return { articles: data.articles, totalResults: data.totalResults }; 
    } catch (error) {
      // CCTV: Cetak pesan error asli dari server NewsAPI
      console.log('[ERROR HEADLINES]:', error.response?.data || error.message);
      throw error;
    }
  },

  // Mengambil hasil pencarian berita dengan filter tambahan
  searchArticles: async (query, page = 1, fromDate, toDate, source) => {
    try {
      const params = {
        q: query,
        // 2. UBAH language jadi 'en' (Inggris)
        language: 'en', 
        sortBy: 'publishedAt',
        page,
        pageSize: 10,
      };
      
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;
      if (source) params.sources = source;

      const { data } = await api.get('/everything', { params });
      
      // CCTV: Cetak hasil pencarian
      console.log(`[SEARCH] Dapet ${data.articles.length} berita untuk kata kunci: ${query}`);
      
      return { articles: data.articles, totalResults: data.totalResults }; 
    } catch (error) {
      console.log('[ERROR SEARCH]:', error.response?.data || error.message);
      throw error;
    }
  }
};