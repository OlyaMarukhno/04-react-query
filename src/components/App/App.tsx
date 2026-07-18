import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

// Імпорт стилів пагінації
import paginationCss from '../Pagination/Pagination.module.css';

// Гарантований імпорт для Vite
const ReactPaginateComponent = (ReactPaginate as any).default || ReactPaginate;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess, isFetched } = useQuery({
    queryKey: ['movies', searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery !== '',
    placeholderData: (previousData) => previousData,
  });

  useEffect(() => {
    if (isFetched && isSuccess && data?.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [isFetched, isSuccess, data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />

      <main>
        {isError && <ErrorMessage />}
        {isLoading && <Loader />}
        
        {isSuccess && movies.length > 0 && (
          <>
            {/* Пагінація перед галереєю */}
            <ReactPaginateComponent
              pageCount={totalPages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              breakLabel="..."
              onPageChange={handlePageClick}
              forcePage={page - 1}
              containerClassName={paginationCss.pagination}
              pageClassName={paginationCss.item}
              activeClassName={paginationCss.active}
              disabledClassName={paginationCss.disabled}
            />
            
            <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          </>
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;