import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Home.module.css';
import SliderFA from '../SliderFA/SliderFA';
import api from '../axiosConfig';
import { Helmet } from 'react-helmet';

const fetchData = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

const Home = ({ isAdmin = false, onError }) => {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [media, setMedia] = useState({ preview: {}, thumbnail: {} });
  const [hoveredMovies, setHoveredMovies] = useState({});
  const [loadedPreviews, setLoadedPreviews] = useState({});
  const limit = 15;
  const [categories, setCategories] = useState([]);

  const requestInProgressRef = useRef(false);

  const fetchTags = async () => {
    try {
      console.log("Próba pobrania tagów");
      const data = await api('/Tags/Get-Tags');
      
      if (data.data.$values) {
        return data.data.$values.map(item => item.name);
      } else {
        return [];
      }
    } catch (error) {
      console.error('Błąd podczas pobierania danych:', error);
      return [];
    }
  };
  
  const fetchMovies = useCallback(async () => {
    if (requestInProgressRef.current) {
      return;
    }

    requestInProgressRef.current = true;

    setLoading(true);

    try {
      const promises = categories.map(async (category) => {
        if (!moviesByCategory[category]) {
          const offset = 0;
          const data = await fetchData('/MoviesCatalog/tags', {
            limit,
            offset,
            tags: [category],
          });

          if (data && data.$values) {
            return { category, movies: data.$values || [] };
          } else {
            return { category, movies: [] };
          }
        }
      });

      const categoryMovies = await Promise.all(promises);
      
      const categoryMoviesObj = categoryMovies.reduce((acc, { category, movies }) => {
        if (movies && movies.length > 0) {
          acc[category] = movies;
        }
        return acc;
      }, {});

      setMoviesByCategory((prevState) => ({
        ...prevState,
        ...categoryMoviesObj,
      }));
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies');
      if (onError) onError('Failed to load movies');
    } finally {
      setLoading(false);
      requestInProgressRef.current = false;
    }
  }, [categories, moviesByCategory]);

  useEffect(() => {
    const fetchData = async () => {
      const tags = await fetchTags();
      setCategories(tags);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && Object.keys(moviesByCategory).length === 0) {
      fetchMovies();
    }
  }, [categories, moviesByCategory, fetchMovies]);

  const fetchMedia = useCallback(async (movieTitle, type) => {
    const endpoint = type === 'preview' ? 'preview' : 'thumbnail';
    const extension = type === 'preview' ? 'mp4' : 'jpg';

    try {
      const response = await api.get(`/MoviesCatalog/${endpoint}/${movieTitle}/thumbnail.${extension}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);

      setMedia((prev) => ({
        ...prev,
        [type]: { ...prev[type], [movieTitle]: url },
      }));
    } catch (err) {
      console.error(`Error fetching ${type} for movie ${movieTitle}:`, err);
    }
  }, []);


  useEffect(() => {
    Object.values(moviesByCategory).forEach((movies) => {
      movies.forEach((movie) => {
        fetchMedia(movie.title, 'thumbnail');
      });
    });
  }, [moviesByCategory, fetchMedia]);

  const handleMouseEnter = (movieId, movieTitle) => {
    setHoveredMovies((prev) => ({ ...prev, [movieId]: true }));

    if (!loadedPreviews[movieId] && !media.preview[movieTitle]) {
      fetchMedia(movieTitle, 'preview').then(() => {
        setLoadedPreviews((prev) => ({ ...prev, [movieId]: true }));
      });
    }
  };

  const handleMouseLeave = (movieId) => {
    setHoveredMovies((prev) => ({ ...prev, [movieId]: false }));
  };

  const handleTouchStart = (movieId, movieTitle) => {
    if (!media.preview[movieTitle]) {
      fetchMedia(movieTitle, 'preview');
    }
    setHoveredMovies((prev) => ({
      ...prev,
      [movieId]: !prev[movieId],
    }));
  };

  return (
    <div className={styles.homeContainer}>
      <Helmet>
        <title>Strona główna</title>
      </Helmet>

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>{error}</p>}

      {!loading && !error && Object.keys(moviesByCategory).length > 0 ? (
        Object.keys(moviesByCategory).map((category) => (
          <div key={category}>
            <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            <SliderFA
              movies={moviesByCategory[category]}
              media={media}
              hoveredMovies={hoveredMovies}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
              handleTouchStart={handleTouchStart}
              isAdmin={isAdmin}
              category={category}
            />
          </div>
        ))
      ) : (
        <p>Brak dostępncyh filmów</p>
      )}
    </div>
  );
};

export default Home;
