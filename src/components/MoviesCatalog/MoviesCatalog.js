import React, { useEffect, useState, useCallback } from 'react';
import api from '../axiosConfig.js';
import MovieList from '../MovieList/MovieList.js';
import Pagination from '../Pagination/Pagination.js';
import LoadingIndicator from '../Loading/LoadingIndicator.js';
import ErrorMessage from '../Error/ErrorMessage.js';
import styles from './MoviesCatalog.module.css';
import { useTags } from '../../context/TagsContext';
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

const MoviesCatalog = ({ searchQuery, onEdit, isAdmin = false, onError }) => {
    const [movies, setMovies] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [media, setMedia] = useState({ preview: {}, thumbnail: {} });
    const [hoveredMovies, setHoveredMovies] = useState({});
    const [loadedPreviews, setLoadedPreviews] = useState({});
    const limit = 15;
    const { tags } = useTags();

    const totalPages = Math.ceil(total / limit);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            if (tags.length > 0) {
                const offset = (currentPage - 1) * limit;
                const data = await fetchData('/MoviesCatalog/tags', {
                    limit,
                    offset,
                    query: searchQuery || '',
                    tags
                });

                setMovies(data.$values || []);
                setTotal(data.total);

                console.log(`FETCH TAGI: ${data.movies.$values}`)
            }
            else {
                const offset = (currentPage - 1) * limit;
                const data = await fetchData('/MoviesCatalog/get-videos', {
                    limit,
                    offset,
                    query: searchQuery || '',
                });

                setMovies(data.movies.$values || []);
                setTotal(data.total);
            }
        } catch (err) {
            if (err.message === 'access denied') {
                setError('access denied');
                onError && onError('access denied');
            }
        } finally {
            setLoading(false);
        }
    }, [currentPage, searchQuery]);

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
        fetchMovies();
    }, [fetchMovies]);

    useEffect(() => {
        movies.forEach((movie) => {
            fetchMedia(movie.title, 'thumbnail');
        });
    }, [movies, fetchMedia]);

    const handleMouseEnter = (movieId, movieTitle) => {
        setHoveredMovies((prev) => ({ ...prev, [movieId]: true }));

        if (!loadedPreviews[movieId]) {
            if (!media.preview[movieTitle]) {
                fetchMedia(movieTitle, 'preview').then(() => {
                    setLoadedPreviews((prev) => ({ ...prev, [movieId]: true }));
                });
            }
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

    const handleDeleteMovie = async (movieId) => {
        try {
            await api.delete('/ManageFiles/delete', { params: { id: movieId } });
            setMovies((prev) => prev.filter((movie) => movie.id !== movieId));
        } catch (err) {
            console.error(`Error deleting movie ${movieId}:`, err);
        }
    };

    if (error === 'access denied') {
        return <ErrorMessage message="ACCESS DENIED" />;
    }

    return (
        <div className={styles.container}>
            <Helmet>
                <title>Katalog filmów</title>
            </Helmet>
            {loading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <div className={styles['movie-list-container']}>
                        <MovieList
                            movies={movies}
                            media={media}
                            hoveredMovies={hoveredMovies}
                            onEdit={onEdit}
                            onDelete={handleDeleteMovie}
                            handleMouseEnter={handleMouseEnter}
                            handleMouseLeave={handleMouseLeave}
                            handleTouchStart={handleTouchStart}
                            isAdmin={isAdmin}
                        />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                        className={styles.Pagination}
                    />
                </>
            )}
        </div>
    );
};

export default MoviesCatalog;
