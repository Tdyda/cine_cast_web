import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation';
import RoutesConfig from './Routes';
import './context/TagsContext'
import { TagsProvider } from './context/TagsContext';
import { Helmet } from 'react-helmet';

const App = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser(true);
      if (decoded.role === 'admin') {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    }
    document.body.classList.add('bg');
  }, []);

  return (
    <TagsProvider>
      <Router>
      <Helmet>
        <title>CineCast</title>
      </Helmet>
        <Navigation
          user={user}
          admin={admin}
          setSearchQuery={setSearchQuery}
          setIsSearchVisible={setIsSearchVisible}
          isSearchVisible={isSearchVisible}
        />
        <RoutesConfig
          user={user}
          admin={admin}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible}
        />
      </Router>
    </TagsProvider>
  );
};

export default App;
