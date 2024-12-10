import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import Cards from '../../components/Cards/Cards'
import Navbar from '../../components/Navbar/Navbar'
import './Movies.css'
import { fetchMovieDiscover } from '../../services/api'
import PageComp from '../../components/Page/PageComp'
import { AppContext } from '../../context/AppContext'

const Movies = () => {

    const { navigate, setLoading, setDiscover, discover, sortBy, movieActivePage, setMovieActivePage, selectedMovieGenres} = useContext(AppContext)

    const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {
        setMovieActivePage(1)
    }, [])


    useEffect(() => {
        const sortByParam = sortBy === "popularity.desc" ? "popular" : "top-rated"
        navigate(`/movies/${sortByParam}/${movieActivePage}`)
        
    }, [sortBy, navigate, movieActivePage])


    useEffect(() => {
        const fetchTv = async () => {
            setLoading(true)
            try {
                const res = await fetchMovieDiscover(movieActivePage, sortBy,selectedMovieGenres)
                setDiscover(res?.results)
                setMovieActivePage(res?.page)
                setTotalPages(res?.total_pages)

                console.log("movies: ", discover)
                console.log("totalPages: ", totalPages)

            } catch (error) {
                console.error(error, " error")
            } finally {
                setLoading(false)
                
            }
        }

        fetchTv()
    }, [movieActivePage, sortBy, selectedMovieGenres])

    return (
        <div className='movies'>
            <Navbar />
            <div className="movies-content">
                
                <Cards title={"Discover Movies"} type={'movie'} />
                <PageComp movieActivePage={movieActivePage} setMovieActivePage={setMovieActivePage} totalPages={totalPages} />
            </div>
            <Footer />
        </div>
    )
}

export default Movies