import React from "react";
import styles from '../Navigation/Navigation.module.css'
import { useState, useEffect } from "react";
import { useTags } from '../../context/TagsContext';
import { useNavigate } from 'react-router-dom';
import api from '../axiosConfig'
import { Helmet } from 'react-helmet';

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [tagsLoaded, setTagsLoaded] = useState(false);
    const [categories, setCategories] = useState([]);
    const isSelected = (tagName) => categories.includes(tagName);
    const { setTagsList } = useTags();
    const navigate = useNavigate();

    const fetchTags = async () => {
        try {
            const data = await api('/Tags/Get-Tags');
            if (data.data.$values) {
                return data.data.$values;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            return [];
        }
    };

    const loadTags = async () => {
        if (!tagsLoaded) {
            const fetchedTags = await fetchTags();
            setTags(fetchedTags);
            setTagsLoaded(true);
        }
    }

    const chooseTags = (tagName) => {
        setCategories((prev) =>
            prev.includes(tagName)
                ? prev.filter((tag) => tag !== tagName)
                : [...prev, tagName]
        )
    }

    const applyTags = () => {
        setTagsList(categories);
        navigate('/catalog');
    };

    useEffect(() => {
        loadTags();
    })

    return (
        <>
            <Helmet>
                <title>Kategorie</title>
            </Helmet>
            <div className={styles.columnWrapper}>
                <div className={styles.column}>
                    <ul>
                        {tags.slice(0, Math.ceil(tags.length / 2)).map((element) => (
                            <button
                                key={element.id}
                                className={`${styles.navButton} ${isSelected(element.name) ? styles.selected : ""}`}
                                aria-label={`Tag ${element.name}`}
                                onClick={() => chooseTags(element.name)}
                            >
                                {element.name}
                            </button>
                        ))}
                    </ul>
                </div>
                <div className={styles.column}>
                    <ul>
                        {tags.slice(Math.ceil(tags.length / 2)).map((element) => (
                            <button
                                key={element.id} /* Klucz dla drugiej kolumny */
                                className={`${styles.navButton} ${isSelected(element.name) ? styles.selected : ""}`}
                                aria-label={`Tag ${element.name}`}
                                onClick={() => chooseTags(element.name)}
                            >
                                {element.name}
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
            <button
                className={styles.filterButton}
                onClick={applyTags}
            >
                <span>Filtruj</span>
            </button>
        </>
    )
}

export default Tags;