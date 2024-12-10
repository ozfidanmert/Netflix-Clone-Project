import React, { useContext, useEffect } from 'react'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import {Route, Router, Routes, useNavigate } from 'react-router-dom'
import Player from './pages/Player/Player'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Main from './pages/Main/Main'
import AppContextProvider, { AppContext } from './context/AppContext'
import MovieDetail from './components/MovieDetail/MovieDetail'
import TvShows from './pages/TvShows/TvShows'
import Movies from './pages/movies/Movies'
import MyList from './pages/MyList/MyList'
import Profile from './pages/Profile/Profile'
import Search from './pages/Search/Search'
import ScrollTop from './components/ScrollTop/ScrollTop'
import PopularList from './pages/PopularList/PopularList'


const App = () => {


  return (
    <div>
      <ToastContainer limit={7} newestOnTop={true} pauseOnHover={true} pauseOnFocusLoss={true} closeOnClick={true} autoClose={2200} theme='dark' />

      <AppContextProvider>
          <ScrollTop />

          <Routes >
            <Route path='/tr' element={<Main />} />
            <Route path='/' element={<Home />} />
            
            <Route path='/login' element={<Login />} />

            <Route path='/player/:type/:id' element={<Player />} />
            <Route path='/detail/:type/:id' element={<MovieDetail />} />
            <Route path='/tv-shows/:category/:page' element={<TvShows />} />
            <Route path='/movies/:category/:page' element={<Movies />} />
            <Route path='/popular/:type/:page' element={<PopularList />} />
            <Route path='/my-list' element={<MyList />} />
            <Route path='/search' element={<Search />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
          </Routes>

      </AppContextProvider>

    </div>
  )
}

export default App
