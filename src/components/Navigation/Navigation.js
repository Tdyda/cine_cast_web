import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTags, faSignOutAlt, faFilm, faHouse, faUserTie, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../Search/Search';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useTags } from '../../context/TagsContext';

const Navigation = ({ user, admin, setSearchQuery, setIsSearchVisible }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagsLoaded, setTagsLoaded] = useState(false);
  const [tagsStatus, setTagsStatus] = useState(false);
  const [categories, setCategories] = useState([]);
  const isSelected = (tagName) => categories.includes(tagName);
  const navigate = useNavigate();
  const { setTagsList } = useTags();
  const [isMobile, setIsMobile] = useState(false);

  const fetchTags = async () => {
    try {
      console.log("Proba pobrania tagow");
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

  const checkIsMobile = () => {
    if (window.innerWidth < 768) {
      setHide(true);
      setIsMobile(true);
    } else {
      setHide(false);
    }
  };

  const redirectToMobileTags = () => {
    navigate('/tags')
  }

  const loadTags = async () => {
    if (!tagsLoaded) {
      const fetchedTags = await fetchTags();
      setTags(fetchedTags);
      setTagsLoaded(true);
    }
    setTagsStatus(true);
  }

  const disableTagsMenu = () => {
    setTagsStatus(false);
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
    debugger;
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearch = () => {
    setIsSearchVisible((prevState) => !prevState);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <FontAwesomeIcon
          icon={faBars}
          className={styles.hamburgerMenu}
          onClick={toggleMenu}
        />
          
          <img src='/logo.svg' className={styles.logo}></img>
        <nav className={`${styles.nav} ${menuOpen ? styles.active : ''}`}>
          <ul className={styles.navLinks}>
          
            <li>
              <Link to="/" className={styles.link}><FontAwesomeIcon icon={faHouse} />Strona główna</Link>
            </li>
            {!user && (
              <>
                <li><Link to="/login" className={styles.link}>Logowanie</Link></li>
                <li><Link to="/register" className={styles.link}>Rejestracja</Link></li>
              </>
            )}
            {user && (
              <>
                <li><Link to="/catalog" className={styles.link}><FontAwesomeIcon icon={faFilm} /> Katalog filmów</Link></li>
                <li>
                  <div
                    className={styles.tagsWrapper}
                    onMouseLeave={!isMobile ? disableTagsMenu : null}
                    
                  >
                    <button
                      className={styles.navButton}
                      onMouseOver={!isMobile ? loadTags : null}
                      onClick={isMobile ? redirectToMobileTags : null}
                      aria-label="Tags"
                    >
                      <FontAwesomeIcon icon={faTags}></FontAwesomeIcon>
                      <span>Kategorie</span>
                    </button>

                    {tagsStatus && (
                      <div className={styles.tagsContainer}>
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
                        </div>
                        <button
                          className={styles.filterButton}
                          onClick={applyTags}
                        >
                          <span>Filtruj</span>
                        </button>
                      </div>
                    )}
                  </div>

                </li>

                <li><Link to="/logout" className={styles.link}><FontAwesomeIcon icon={faSignOutAlt} /> Wyloguj</Link></li>
                <li className={styles.hidden}>
                  <button
                    className={styles.navButton}
                    onClick={toggleSearch}
                    aria-label="Search"
                  >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <span>Szukaj</span>
                  </button>
                </li>
              </>
            )}
            {admin && (
              <li><Link to="/admin-panel" className={styles.link}><FontAwesomeIcon icon={faUserTie} />Panel administratora</Link></li>
            )}
            {user && (
              <>
                <li>
                  {hide && <SearchBar onSearch={handleSearch} />}
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navigation;
