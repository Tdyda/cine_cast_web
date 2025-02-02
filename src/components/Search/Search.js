import React, { useState } from 'react';
import styles from './Search.module.css';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className={`${styles.formControl} form-control`}
        placeholder="Search files by name..."
      />
    </div>
  );
};

export default Search;
