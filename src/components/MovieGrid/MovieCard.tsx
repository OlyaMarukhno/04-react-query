import React from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieGrid.module.css';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://dummyimage.com/500x750/222/fff&text=No+Poster';

  return (
    <div className={styles.card} onClick={() => onClick(movie)}>
      <img className={styles.image} src={posterUrl} alt={movie.title} />
      <p className={styles.title}>{movie.title}</p>
    </div>
  );
};

export default MovieCard;