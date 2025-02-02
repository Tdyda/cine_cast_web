import React, { useState } from 'react';
import MoviesCatalog from '../MoviesCatalog/MoviesCatalog';
import SearchBar from '../Search/Search';
// import { useTags } from '../../context/TagsContext';

const MoviesPage = ({ searchQuery, setSearchQuery, isSearchVisible }) => {
  const [error, setError] = useState(null);
  // const { tags, setTagsList } = useTags();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleError = (error) => {
    if (error === 'access denied') {
      setError('access denied');
    }
  };

  return (
    <div>
      {isSearchVisible && !error && <SearchBar onSearch={handleSearch} />}
      <MoviesCatalog searchQuery={searchQuery} onError={handleError}  />
    </div>
  );
};

export default MoviesPage;
