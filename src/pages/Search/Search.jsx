import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Search.css'
import Cards from '../../components/Cards/Cards'
import { AppContext } from '../../context/AppContext'
import { fetchSearch } from '../../services/api'
import PageComp from '../../components/Page/PageComp'
import Footer from '../../components/Footer/Footer'

const Search = () => {

    const { sortBy, setLoading, searchValue, setSearchValue, setDiscover, searchActivePage, setSearchActivePage } = useContext(AppContext)

    const [totalPages, setTotalPages] = useState(1)
    const [type, setType] = useState('movie')


    useEffect(() => {
        setSearchActivePage(1)
        setSearchValue("")
    }, [])


    useEffect(() => {

        const searchMovie = async () => {
            setLoading(true)
            try {
                const res = await fetchSearch(searchValue, searchActivePage, type, sortBy)
                setDiscover(res?.results)
                setTotalPages(res?.total_pages)
                setSearchActivePage(res?.page)

                window.scrollTo(0, 0);

                console.log("page: ", res?.page)
                console.log("value: ", res)
                console.log("totalpage: ", res?.total_pages)

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)

            }
        }
        searchMovie()

    }, [searchActivePage, searchValue, type])


    return (
        <div className='search-main'>
            <Navbar />

            <div className="search-content">
                <div className='search-input'>
                    <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        type="text" placeholder='Search movies, tv shows...' />
                    <select onChange={(e) => setType(e.target.value)} >
                        <option value="movie">MOVIE</option>
                        <option value="tv">TV</option>
                    </select>
                </div>

                <Cards title={`Search ${type.toUpperCase()} & ${searchValue.toUpperCase()}`} type={type} />
                <PageComp setSearchActivePage={setSearchActivePage} searchActivePage={searchActivePage} totalPages={totalPages} />
            </div>
            <Footer />
        </div>
    )
}

export default Search