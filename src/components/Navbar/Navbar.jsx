import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search_icon.svg'
import bell from '../../assets/bell_icon.svg'
import profile from '../../assets/profile_img.png'
import caret from '../../assets/caret_icon.svg'
import { auth, logout } from '../../firebase'
import { AppContext } from '../../context/AppContext'
import { useLocation } from 'react-router-dom'
import { GrMenu } from "react-icons/gr";
import { IoMdBackspace } from "react-icons/io";




const Navbar = () => {

    const { navigate, userInfo, sortBy, tvActivePage, movieActivePage, popularListActivePage } = useContext(AppContext)
    const navRef = useRef()
    const { pathname } = useLocation()
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        if (pathname.includes('/tv-shows')) {
            const navTv = document.querySelector('.nav-tv')
            navTv.classList.add('active')
        } else if (pathname.includes('/movies')) {
            const navMovies = document.querySelector('.nav-movies')
            navMovies.classList.add('active')
        } else if (pathname.includes('/popular')) {
            const navPopular = document.querySelector('.nav-popular')
            navPopular.classList.add('active')
        } else if (pathname.includes('/my-list')) {
            const navMyList = document.querySelector('.nav-mylist')
            navMyList.classList.add('active')
        } else if (pathname.includes('/search')) {
            const navSearch = document.querySelector('.search')
            navSearch.classList.add('active')
        } else if (pathname === '/') {
            const navHome = document.querySelector('.nav-home')
            navHome.classList.add('active')
        }

    }, [pathname])


    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                if (window.scrollY >= 100) {
                    navRef.current.classList.add('nav-dark');
                } else {
                    navRef.current.classList.remove('nav-dark');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div ref={navRef} className='navbar'>
            <div className="navbar-left">
                <img onClick={() => navigate('/')} src={logo} alt="logo" />
                <ul>
                    <li className='nav-home' onClick={() => navigate('/')} >Home</li>
                    <li className='nav-tv' onClick={() => navigate(`/tv-shows/${sortBy}/${tvActivePage}`)} >TV Shows</li>
                    <li className='nav-movies' onClick={() => navigate(`/movies/${sortBy}/${movieActivePage}`)} >Movies</li>
                    <li className='nav-popular' onClick={() => navigate(`/popular/alll/${popularListActivePage}`)} >Popular List</li>
                    <li className='nav-mylist' onClick={() => navigate('/my-list')}>My List</li>
                </ul>
            </div>

            <div className="navbar-right">
                <img onClick={() => navigate('/search')} src={search} className='icons search' />
                <img src={bell} className='icons' />

                <div className='navbar-profile'>
                    <img src={profile} className='profile' />
                    <img src={caret} />
                    <div className="dropdown">
                        <p>Hello {userInfo?.name}!</p>
                        <p onClick={() => navigate('/profile')} >Profile</p>
                        <p onClick={() => navigate('/my-list')}>Watch List</p>
                        <p onClick={() => logout()}>Oturumu Kapat</p>
                    </div>
                </div>
                <GrMenu onClick={() => setVisible(true)}  className='menu-icon active' fontSize={24} />
            </div>

            <div className={`navbar-menu ${visible ? 'active' : null}`}>
                <div onClick={() => setVisible(false)} className="menu-exit">
                    <p>CLOSE</p>
                    <IoMdBackspace fontSize={20} />
                </div>
                <div className="navbar-list">
                    <ul>
                        <li className='nav-home' onClick={() => navigate('/')} >Home</li>
                        <li className='nav-tv' onClick={() => navigate(`/tv-shows/${sortBy}/${tvActivePage}`)} >TV Shows</li>
                        <li className='nav-movies' onClick={() => navigate(`/movies/${sortBy}/${movieActivePage}`)} >Movies</li>
                        <li className='nav-popular' onClick={() => navigate(`/popular/alll/${popularListActivePage}`)} >Popular List</li>
                        <li className='nav-mylist' onClick={() => navigate('/my-list')}>My List</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Navbar
