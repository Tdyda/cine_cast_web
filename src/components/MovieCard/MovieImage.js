import React from 'react';

const MovieImage = ({ movie, media, hovered }) => {
    return (
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
    );
};

export default MovieImage;
