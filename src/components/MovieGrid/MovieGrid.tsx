import React from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className={css.grid}>
      {movies.map((movie) => (
        <li 
          key={movie.id} 
          className={css.card}
          onClick={() => onSelect(movie)}
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : 'https://dummyimage.com/500x750/222/fff&text=No+Poster'
            }
            alt={movie.title}
            className={css.image}
          />
          <p className={css.title}>{movie.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;