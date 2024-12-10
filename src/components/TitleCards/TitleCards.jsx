import React, { useContext, useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import { fetchMovieType, imagePath } from '../../services/api'
import loading_gif from '../../assets/netflix_spinner.gif'
import { AppContext } from '../../context/AppContext'



const TitleCards = ({ title, category }) => {

    const { loading, setLoading } = useContext(AppContext)
    const [apiData, setApiData] = useState([])
    const refs = useRef()

    const handleWheels = (event) => {
        event.preventDefault();
        refs.current.scrollLeft += event.deltaY;
    }


    const type = "movie"

    useEffect(() => {
        if (refs.current) {
            refs.current.addEventListener('wheel', handleWheels);
        }

        return () => {
            if (refs.current) {
                refs.current.removeEventListener('wheel', handleWheels);
            }
        };
    }, [refs.current]);


    useEffect(() => {

        setLoading(true)

        fetchMovieType(type, category)
            .then(res => setApiData(res))

            .catch(err => console.error(err))
            .finally(() => setLoading(false))

        console.log(apiData)

    }, [category])



    return (
        loading
            ? <div className="login-spinner">
                <img src={loading_gif} />
            </div>
            : <div className='title-cards'>
                <h2>{title}</h2>
                <div className="card-list" ref={refs}>
                    {
                        apiData?.map((card, i) => (
                            <Link key={i} to={`/detail/${card?.media_type ? card?.media_type : type + '/'}${card?.id}`}>
                                <div key={i} className='card'>
                                    <img src={`${imagePath}/${card?.backdrop_path}`} />
                                    <p>{card?.original_title}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
    )
}

export default TitleCards
