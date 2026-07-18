import React from 'react';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleFormAction = (formData: FormData) => {
    const query = formData.get('query') as string;

    if (!query || query.trim() === '') {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={css.header}>
      <div className={css.container}>
        <a href="/" className={css.link}>
          Powered by <span style={{ color: '#01b4e4', fontWeight: 'bold' }}>TMDB</span>
        </a>

        <form action={handleFormAction} className={css.form}>
          <input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search movies..."
            className={css.input}
          />
          <button type="submit" className={css.button}>
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;