import React, { useRef } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import styles from './SliderFA.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const SliderFA = ({ movies, media, hoveredMovies, onEdit, onDelete, handleMouseEnter, handleMouseLeave, handleTouchStart, isAdmin = false, category }) => {
    const sliderRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    // Przewijanie w lewo
    const scrollLeft = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        let moveBy;
        const containerWidth = sliderRef.current.offsetWidth;

        if(isMobile)
        {
            moveBy = (containerWidth);
        }
        else{
            moveBy = (containerWidth - 20) / 5;
        }
        
        sliderRef.current.scrollBy({ left: -moveBy, behavior: 'smooth' });
    };


    const scrollRight = () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        let moveBy;
        const containerWidth = sliderRef.current.offsetWidth;

        if(isMobile)
        {
            moveBy = (containerWidth);
        }
        else{
            moveBy = (containerWidth - 20) / 5;
        }
        sliderRef.current.scrollBy({ left: moveBy, behavior: 'smooth' });
    };

    const handleTouchStartSlider = (e) => {
        const touchStart = e.touches[0].clientX;
        setStartX(touchStart);
        setIsSwiping(true);
      };

      const handleTouchMove = (e) => {
        if (!isSwiping) return;
    
        const touchMove = e.touches[0].clientX;
        const moveDistance = startX - touchMove;
    
        if (Math.abs(moveDistance) > 20) {
          const moveBy = sliderRef.current.offsetWidth;
          sliderRef.current.scrollBy({
            left: moveDistance > 0 ? moveBy : -moveBy,
            behavior: 'smooth',
          });
    
          setStartX(touchMove);
        }       
      };
    
      const handleTouchEnd = () => {
        setIsSwiping(false);
      };

    return (

        <div className={styles.sliderContainer}
        onTouchStart={handleTouchStartSlider}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
            <div className={styles.row} ref={sliderRef}>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    onClick={scrollLeft}
                    className={`${styles.icon} ${styles.iconLeft}`}
                />
                {movies.map((movie, index) => {
                    const uniqueIndex = `${category}-${index}`;
                    return (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            media={media}
                            hovered={hoveredMovies[uniqueIndex]}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onTouchStart={handleTouchStart}
                            className={`${styles.split}`}
                            className1={styles.margin}
                            index={uniqueIndex}
                        />
                    );
                })}
                <FontAwesomeIcon
                    icon={faChevronRight}
                    size="xs"
                    onClick={scrollRight}
                    className={`${styles.icon} ${styles.iconRight}`}
                />
            </div>
        </div>
    );
};

export default SliderFA;
