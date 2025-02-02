import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import MovieCatalog from './components/MoviesPage/MoviesPage';
import Logout from './components/Logout';
import UploadFile from './components/Forms/UploadFile';
import AdminPanel from './components/MoviesCatalog/MoviesAdminPanel';
import {useTags} from './context/TagsContext'
import Tags from './components/Tags/Tags'
import Admin from './components/AdminPanel/AdminPanel'
import ActorForm from './components/Forms/ActorForm';
import TagForm from './components/Forms/TagForm';


const RoutesConfig = ({ user, admin, searchQuery, setSearchQuery, isSearchVisible, setIsSearchVisible }) => {
  const { tags } = useTags();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/catalog"
        element={
          <MovieCatalog
            key={tags.join('-')}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            isSearchVisible={isSearchVisible}
            setIsSearchVisible={setIsSearchVisible}
          />
        }
      />
      <Route path="/video/:id" element={<VideoPlayer />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/admin-panel/video-form" element={admin ? <UploadFile /> : <Login />} />
      <Route path="/admin-panel/edit" element={admin ?
        <AdminPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isSearchVisible={isSearchVisible}
          setIsSearchVisible={setIsSearchVisible} /> : <Login />}
      />
      <Route path='/admin-panel' element={<Admin />}></Route>
      <Route path="/tags" element={<Tags />} />
      <Route path="admin-panel/actor-form" element={<ActorForm />}></Route>
      <Route path="admin-panel/tag-form" element={<TagForm />}></Route>

    </Routes>
  );
};

export default RoutesConfig;
