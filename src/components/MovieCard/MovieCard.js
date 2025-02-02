import React from 'react';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, index, media, onEdit, onDelete, onMouseEnter, onMouseLeave, onTouchStart, hovered, isAdmin = false, className, className1 }) => {
    return (
        <div className={`col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ${styles['card-size']} ${className1}`}>
            <div className={`${styles.card} ${className}`}>
                <a href={`video/${movie.id}?title=${encodeURIComponent(movie.title)}`} className={styles.link}>
                    <div
                        className={`card ${styles.movieCard}`}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => onMouseEnter(index, movie.title)}
                        onMouseLeave={() => onMouseLeave(index)}
                        onTouchStart={() => onTouchStart(index, movie.title)}
                    >
                        <div className="ratio ratio-16x9">
                            {!hovered ? (
                                <img
                                    src={media.thumbnail[movie.title]}
                                    alt={`Thumbnail for ${movie.title}`}
                                    className="card-img-top w-100 h-100"
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <video
                                    src={media.preview[movie.title]}
                                    className="card-img-top w-100 h-100"
                                    muted
                                    playsInline
                                    autoPlay
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    </div>
                    <h5 className={`card-title text-center ${styles['link-text']}`}>{movie.title}</h5>
                </a>
            </div>
            {isAdmin && (                
                <div className={styles.manageWrapper}>                    
                    <button
                    onClick={() => onEdit(movie)}
                    className={styles.manageButton}
                    >
                        <span>Edytuj</span>
                    </button>
                    
                    <button
                    onClick={() => onDelete(movie.id)}
                    className={styles.manageButton}
                    >
                        <span>Usuń</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default MovieCard;
