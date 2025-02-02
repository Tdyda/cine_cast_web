import React, { useState, useEffect, useRef } from 'react';
import formStyles from './Form.module.css'
import api from '../axiosConfig'
import { Helmet } from 'react-helmet';

const TagForm = () => {
    const [tagName, setTagName] = useState(null);

    const handleFileNameChange = (event) => {        
        setTagName(event.target.value);
      };

      const uploadPhoto = async () => {
        const formData = new FormData();
        formData.append('name', tagName);
        try {
            await api.post('Tags/Add-Tag', null, {
                params: {
                    name: tagName,
                },
            });
            alert('Dodano nowy tag');
        } catch (error) {
            console.error('Błąd podczas dodawania', error);
        }
    };       

    return (
        <div className={formStyles.form}>
            <Helmet>
                <title>Panel administracyjny</title>
            </Helmet>
            <input
                type="text"
                placeholder='Podaj tag'
                onChange={handleFileNameChange}
            ></input>           

            <button
                type='button'
                onClick={uploadPhoto}
                className={formStyles.fileButton}
                disabled={!tagName}
            >
                <span>Wyślij tag</span>
            </button>
        </div>
    )
}

export default TagForm
