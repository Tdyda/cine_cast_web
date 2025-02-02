import React from 'react';
import MovieCard from '../MovieCard/MovieCard.js';
import styles from './MovieList.module.css'

const MovieList = ({ movies, media, hoveredMovies, onEdit, onDelete, handleMouseEnter, handleMouseLeave, handleTouchStart, isAdmin = false }) => {
    return (
        <div className={`row ${styles.row}`}>
            {movies.map((movie, index) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    media={media}
                    hovered={hoveredMovies[index]}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchStart={handleTouchStart}
                    isAdmin={isAdmin}
                    index={index}
                />
            ))}
        </div>
    );
};

export default MovieList;
