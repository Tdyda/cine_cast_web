import React from 'react';

const MovieActions = ({ movie, onEdit, onDelete }) => {
    return (
        <div className="card-body p-2">
            <button onClick={() => onEdit(movie)}>Edytuj</button>
            <button onClick={() => onDelete(movie.id)}>Usuń</button>
        </div>
    );
};

export default MovieActions;
