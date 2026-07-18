import axios from 'axios';
import type { Movie } from '../types/movie';

const TMDB_API_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export interface TMDBResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (query: string, page: number): Promise<TMDBResponse> => {
  const response = await axios.get<TMDBResponse>(`${TMDB_API_URL}/search/movie`, {
    params: {
      query: query,
      include_adult: false,
      language: 'en-US',
      page: page,
    },
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
      accept: 'application/json',
    },
  });

  return response.data;
};