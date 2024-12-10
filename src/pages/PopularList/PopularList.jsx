import React, { useContext, useEffect, useState } from 'react'
import './PopularList.css'
import Navbar from '../../components/Navbar/Navbar'
import Cards from '../../components/Cards/Cards'
import Footer from '../../components/Footer/Footer'
import { AppContext } from '../../context/AppContext'
import { fetchPopularList } from '../../services/api'
import PageComp from '../../components/Page/PageComp'

const PopularList = () => {

    const { navigate, setLoading, sortBy, popularListActivePage, setPopularListActivePage, discover, setDiscover } = useContext(AppContext)

    const [type, setType] = useState('all');

    const [totalPages, setTotalPages] = useState(1)


    useEffect(() => {
        setPopularListActivePage(1)
    }, [])

    useEffect(() => {
        const fetchPopular = async () => {
            setLoading(true)
            try {
                const res = await fetchPopularList(popularListActivePage, type, sortBy)
                setDiscover(res?.results)
                setPopularListActivePage(res?.page)
                setTotalPages(res?.total_pages)

                console.log("sortBy: ", sortBy)
                console.log("page: ", popularListActivePage)
                console.log("totalPages: ", totalPages)
                console.log("popular-list: ", discover)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPopular()
        navigate(`/popular/${type}/${popularListActivePage}`)

    }, [type, popularListActivePage, sortBy, navigate])

    return (
        <div className='popular-list'>
            <Navbar />
            <div className="popular-content">
                <div className="popular-selected">
                    <select onChange={(e) => setType(e.target.value)} value={type}>
                        <option value="all">ALL</option>
                        <option value="movie">MOVIE</option>
                        <option value="tv">TV</option>
                    </select>
                </div>
                <Cards title={`POPULAR ${type.toUpperCase()} LIST`} type={type} />
                <PageComp popularListActivePage={popularListActivePage} setPopularListActivePage={setPopularListActivePage} totalPages={totalPages} />
                <Footer />
            </div>
        </div>
    )
}

export default PopularList