import axios from "axios";


export const imagePath = "https://image.tmdb.org/t/p/w500"

const baseUrl = "https://api.themoviedb.org/3"
const apiKey = import.meta.env.VITE_API_KEY;


export const fetchMovieType = async (type, category) => {
    const { data } = await axios.get(`${baseUrl}/${type}/${category}?api_key=${apiKey}`)
    return data?.results
}

//* MOVIE && TV DETAILS

export const fetchDetails = async (type, id) => {
    const { data } = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`)
    return data
}

//* MOVIE && TV CREDITS

export const fetchCredits = async (type, id) => {
    const { data } = await axios.get(`${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`)
    return data
}

//* MOVIE && TV VIDEO

export const fetchVideo = async (type, id) => {
    const { data } = await axios.get(`${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`)
    return data?.results
}


//* TV DISCOVER
export const fetchTvDiscover = async (page, sort, genres) => {
    const { data } = await axios.get(`${baseUrl}/discover/tv?api_key=${apiKey}&page=${page}&sort_by=${sort}&with_genres=${genres}`)

    return data
}


//* MOVIE DISCOVER

export const fetchMovieDiscover = async (page, sort, genres) => {
    const { data } = await axios.get(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sort}&with_genres=${genres}`)
    return data
}


//* SEARCH
export const fetchSearch = async (query, page, type, sort) => {
    const { data } = await axios.get(`${baseUrl}/search/${type}?api_key=${apiKey}&query=${query}&page=${page}&sort_by=${sort}`)
    return data
}


//* POPULAR ALL MOVIE & TV LIST

export const fetchPopularList = async (page, type, sort) => {
    const {data} = await axios.get(`${baseUrl}/trending/${type}/day?api_key=${apiKey}&page=${page}&sort_by=${sort}`)
    return data
}