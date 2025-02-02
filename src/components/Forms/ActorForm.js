import React, { useState, useEffect, useRef } from 'react';
import formStyles from './Form.module.css'
import api from '../axiosConfig'
import { Helmet } from 'react-helmet';

const ActorForm = () => {
    const [photo, setPhoto ] = useState(null);
    const [photoName, setPhotoName] = useState(null);
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleFileNameChange = (event) => {
        setPhotoName(event.target.value);
      };

      const uploadPhoto = async () => {
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('name', photoName);
        try {
            const response = await api.post('Actors/Add-Actor', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            alert('Przesyłanie zakończone');
        } catch (error) {
            console.error('Błąd przesyłania pliku', error);
        }
    };       

    return (
        <div className={formStyles.form}>
            <Helmet>
                <title>Panel administracyjny</title>
            </Helmet>
            <input
                type="text"
                placeholder='Nazwa pliku'
                onChange={handleFileNameChange}
            ></input>

            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            ></input>

            <button
                type='button'
                onClick={handleButtonClick}
                className={formStyles.fileButton}
            >
                <span>Wybierz zdjęcie</span>
            </button>

            <button
                type='button'
                onClick={uploadPhoto}
                className={formStyles.fileButton}
                disabled={!photo || !photoName}
            >
                <span>Wyślij plik</span>
            </button>
        </div>

    )
}

export default ActorForm
