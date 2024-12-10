import React, { useContext, useEffect, useState } from 'react'
import './Cards.css'
import { AppContext } from '../../context/AppContext'
import { imagePath } from '../../services/api'
import loading_gif from '../../assets/netflix_spinner.gif'
import CircularProgress from '@mui/joy/CircularProgress'
import { ratingToPercentage, resolveRatingColor } from '../../utils/helpers'

import { CiBookmarkRemove } from "react-icons/ci";
import { MdBookmarkAdded } from "react-icons/md";


const Cards = ({ title, type }) => {
    const { loading, discover, sortBy, setSortBy, navigate, fetchWatchList, removeWatchlist, addWatchList, isItemInWatchList, selectedMovieGenres, setSelectedMovieGenres, selectedTvGenres, setSelectedTvGenres } = useContext(AppContext)



    const handleWatchListClick = (itemId, item) => {
        if (isItemInWatchList(itemId)) {
            removeWatchlist(itemId);
        } else {
            addWatchList(item.id, item.media_type ? item.media_type : type, item.name, item.title, item.first_air_date, item.release_date, item.vote_average, item.poster_path);
            console.log("media_type:", item.name)
        }
    }

    const handleMovieGenreChange = (event) => {
        const genreValue = event.target.value;
        const isChecked = event.target.checked


        setSelectedMovieGenres((prevGenres) => {
            if (isChecked) {
                return [...prevGenres, genreValue]
            } else {
                return prevGenres.filter((genre) => genre !== genreValue)
            }
        })
    }
    const handleTvGenreChange = (event) => {
        const genreValue = event.target.value;
        const isChecked = event.target.checked

        setSelectedTvGenres((prevGenres) => {
            if (isChecked) {
                return [...prevGenres, genreValue]
            } else {
                return prevGenres.filter((genre) => genre !== genreValue)
            }
        })
    }

    const handleGenresClick = () => {
        const cardsGenres = document.querySelector('.cards-genres');
        const genresBtn = document.querySelector('.genres-btn');

        if (cardsGenres.style.display === 'none' || cardsGenres.style.display === '') {
            cardsGenres.style.display = 'flex';
            genresBtn.style.backgroundColor = 'rgba(30, 30, 30, 0.792)'

        } else {
            cardsGenres.style.display = 'none';
            genresBtn.style.backgroundColor = 'black'
        }
    };


    const movieGenres = [
        { value: "28", label: "Action" },
        { value: "35", label: "Comedy" },
        { value: "12", label: "Adventure" },
        { value: "16", label: "Animation" },
        { value: "80", label: "Crime" },
        { value: "99", label: "Documentary" },
        { value: "18", label: "Drama" },
        { value: "10751", label: "Family" },
        { value: "14", label: "Fantasy" },
        { value: "27", label: "Horror" },
        { value: "36", label: "History" },
        { value: "9648", label: "Mystery" },
        { value: "10749", label: "Romance" },
        { value: "878", label: "Science Fiction" },
        { value: "53", label: "Thriller" },
        { value: "10752", label: "War" },
    ];


    const tvGenres = [
        { value: "10763", label: "News" },
        { value: "10759", label: "Action & Adventure" },
        { value: "35", label: "Comedy" },
        { value: "37", label: "Western" },
        { value: "16", label: "Animation" },
        { value: "80", label: "Crime" },
        { value: "10762", label: "Kids" },
        { value: "99", label: "Documentary" },
        { value: "18", label: "Drama" },
        { value: "10751", label: "Family" },
        { value: "10768", label: "War & Politics" },
        { value: "10767", label: "Talk" },
        { value: "36", label: "History" },
        { value: "9648", label: "Mystery" },
        { value: "10749", label: "Romance" },
        { value: "10766", label: "Soap" },
        { value: "10765", label: "Sci-Fi & Fantasy" },
        { value: "10764", label: "Reality" },
    ];

    let genres = title.includes("Movies") ? movieGenres : tvGenres


    useEffect(() => {
        fetchWatchList()
    }, [loading])


    return (
        loading
            ? <div className="login-spinner">
                <img src={loading_gif} />
            </div>
            : <div className='cards'>
                <div className="cards-content">
                    <div className="cards-content-title">
                        <h2>{title}</h2>
                    </div>
                    <div className="cards-content-input">
                        {
                            title?.startsWith("POPULAR") || title?.startsWith("Search") ? null
                                :
                                <>
                                    <button onClick={handleGenresClick} className='genres-btn'>Genres</button>
                                    <div className="selected">
                                        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                            <option value="popularity.desc">Popular</option>
                                            <option value="vote_average.desc&vote_count.gte=1000">Top Rated</option>
                                        </select>
                                    </div>
                                </>
                        }
                    </div>
                </div>
                {
                    title?.startsWith("POPULAR") || title?.startsWith("Search") ? null
                        : <div className="cards-genres">
                            <div className="genres">
                                {genres.map((genre) => (
                                    <p
                                        key={genre.value}
                                        onClick={() =>
                                            (title.includes("Movies") ? handleMovieGenreChange : handleTvGenreChange)({
                                                target: {
                                                    value: genre.value,
                                                    checked: title.includes("Movies")
                                                        ? !selectedMovieGenres.includes(genre.value)
                                                        : !selectedTvGenres.includes(genre.value),
                                                },
                                            })
                                        }
                                    >
                                        {genre.label}
                                        <input
                                            value={genre.value}
                                            type="checkbox"
                                            onChange={title.includes("Movies") ? handleMovieGenreChange : handleTvGenreChange}
                                            checked={
                                                title.includes("Movies")
                                                    ? selectedMovieGenres.includes(genre.value)
                                                    : selectedTvGenres.includes(genre.value)
                                            }
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </p>
                                ))}
                            </div>
                        </div>
                }

                <div className="cards-list">
                    {
                        discover && discover.length > 0 ? (
                            discover?.map((item, i) => (
                                item?.poster_path ? (
                                    <div key={i} className="card-item">
                                        <img
                                            onClick={() => navigate(`/detail/${item.media_type ? item.media_type : type}/${item.id}`)}
                                            src={`${imagePath}${item?.poster_path}`} />
                                        <div
                                            onClick={() => handleWatchListClick(item.id, item)}
                                            className="add-list">
                                            {
                                                isItemInWatchList(item.id) ? (
                                                    <>
                                                        <CiBookmarkRemove color="red" size={22} />
                                                        <p>Remove Watchlist</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <MdBookmarkAdded color="red" size={22} />
                                                        <p>Add to Watchlist</p>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div className="card-text">
                                            <h5>{item?.name || item?.name || item?.title}</h5>
                                            <p>{item?.first_air_date?.slice(0, 4) || item?.release_date?.slice(0, 4)}</p>
                                            <CircularProgress size="lg" color={resolveRatingColor(item?.vote_average)} determinate value={Number(ratingToPercentage(item?.vote_average))}>
                                                {ratingToPercentage(item?.vote_average)}%
                                            </CircularProgress>
                                        </div>
                                    </div>
                                ) : null
                            ))
                        ) : (
                            <div className="watch-info">
                                <h1>İçerik Bulunamadı!</h1>
                            </div>
                        )
                    }
                </div>
            </div>
    )
}

export default Cards
