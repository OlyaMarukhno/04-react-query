import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination'; 
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: false,
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (searchQuery !== '') {
      refetch().then((result) => {
        if (result.data && result.data.results.length === 0) {
          toast.error('No movies found for your request.');
        }
      });
    }
  }, [searchQuery, page, refetch]);

  const handleSearch = (query: string) => {
    if (query.trim() === '') return;
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <SearchBar onSubmit={handleSearch} />

      <main style={{ padding: '0 20px' }}>
        {isError && <ErrorMessage />}
        
        {isLoading ? (
          <Loader />
        ) : (
          movies.length > 0 && (
            <>
              {/* Тепер Pagination стоїть ТУТ, перед MovieGrid */}
              <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
              <MovieGrid movies={movies} onSelect={setSelectedMovie} />
            </>
          )
        )}
      </main>

      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}
    </div>
  );
};

export default App;