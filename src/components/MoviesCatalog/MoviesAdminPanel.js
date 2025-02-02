import React, { useEffect, useState } from 'react';
import MoviesCatalog from './MoviesCatalog';
import { jwtDecode } from 'jwt-decode';
// import MovieForm from './MovieForm';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Search/Search';
import { Helmet } from 'react-helmet';

const MoviesAdminPanel = ({searchQuery, setSearchQuery, isSearchVisible}) => {
    // const [isEditing, setIsEditing] = useState(false);
    // const [movieToEdit, setMovieToEdit] = useState(null);
    const navigate = useNavigate();

    const handleAddNew = () => {
        navigate(`/uploadFile`)
    };

    const handleSearch = (query) => {
        setSearchQuery(query); // Aktualizacja zapytania
      };

    const handleEditMovie = (movie) => {
        // setIsEditing(true);
        // setMovieToEdit(movie); // Ustawienie filmu do edycji
    }

    const [admin, setAdmin] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded.role === 'admin') {
                setAdmin(true)
            }
        }
    }, [])

    return (
        <div>
            <Helmet>Panel administracyjny</Helmet>         
            <h1>Panel administracyjny</h1>
            {/* {isEditing ? (
                <MovieForm movie={movieToEdit} onCancel={handleCancel} />
            ) : ( */}
                <>
                    {isSearchVisible && <SearchBar onSearch={handleSearch} />}
                    <MoviesCatalog searchQuery={searchQuery} onEdit={handleEditMovie} isAdmin={admin} />
                </>
            {/* )} */}
        </div>
    );
};

export default MoviesAdminPanel;
