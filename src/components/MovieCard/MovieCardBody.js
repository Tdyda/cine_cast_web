import React from 'react';
import styles from './MovieCatalog.module.css';

const MovieCardBody = ({ movie, onEdit, onDelete }) => {
    return (
        <>
            <h5 className={` ${styles.link}`}>{movie.title}</h5>
            {movie.isAdmin && <MovieActions movie={movie} onEdit={onEdit} onDelete={onDelete} />}
        </>
    );
};

export default MovieCardBody;
