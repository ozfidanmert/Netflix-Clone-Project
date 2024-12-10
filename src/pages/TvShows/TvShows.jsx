import React, { useContext, useEffect, useState } from 'react'
import './TvShows.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Cards from '../../components/Cards/Cards'
import { AppContext } from '../../context/AppContext'
import { fetchTvDiscover } from '../../services/api'
import PageComp from '../../components/Page/PageComp'

const TvShows = () => {

    const { navigate, setLoading, discover, setDiscover, sortBy, tvActivePage, setTvActivePage, selectedTvGenres } = useContext(AppContext)

    const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {
        setTvActivePage(1)
    }, [])


    useEffect(() => {
        const sortByParam = sortBy === "popularity.desc" ? "popular" : "top-rated"

        navigate(`/tv-shows/${sortByParam}/${tvActivePage}`)
    }, [sortBy, navigate, tvActivePage])


    useEffect(() => {

        const fetchTv = async () => {
            setLoading(true)
            try {
                const res = await fetchTvDiscover(tvActivePage, sortBy, selectedTvGenres)
                setDiscover(res?.results)
                setTvActivePage(res?.page)
                setTotalPages(res?.total_pages)
                              

                console.log("sortBy: ", sortBy)
                console.log("page: ", tvActivePage)
                console.log("totalPages: ", totalPages)
                console.log("tv-shows: ", discover)

            } catch (error) {
                console.error(error, " error")
            } finally {
                setLoading(false)
            }
        }

        fetchTv()
    }, [tvActivePage, sortBy, selectedTvGenres])

    return (
        <div className='tv-shows'>
            <Navbar />
            <div className="tv-content">
                <Cards title={"Discover Tv"} type={'tv'} />
                <PageComp tvActivePage={tvActivePage} setTvActivePage={setTvActivePage} totalPages={totalPages} />
            </div>
            <Footer />
        </div>
    )
}

export default TvShows