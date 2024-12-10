import React, { useContext, useEffect, useRef, useState } from 'react'
import './MovieDetail.css'
import Navbar from '../Navbar/Navbar'
import { CiBookmarkRemove, CiCalendarDate } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { Link, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { fetchCredits, fetchDetails, fetchVideo, imagePath } from '../../services/api'
import loading_gif from '../../assets/netflix_spinner.gif'
import CircularProgress from '@mui/joy/CircularProgress';
import { ratingToPercentage, resolveRatingColor } from '../../utils/helpers'
import Footer from '../Footer/Footer';
import { MdBookmarkAdded } from 'react-icons/md';
import { MdLocalMovies } from "react-icons/md";
import { FaComments } from "react-icons/fa";
import { auth, db } from '../../firebase';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';




const MovieDetail = () => {

    const router = useParams()
    const refs = useRef()
    const { type, id } = router
    const { loading, setLoading, dataDetail, setDataDetail, navigate,
        dataCredit, setDataCredit, dataVideo, setDataVideo, isItemInWatchList, addWatchList, removeWatchlist, userInfo } = useContext(AppContext)

    const [commentText, setCommentText] = useState(null)
    const [comments, setComments] = useState([])
    const userId = auth.currentUser?.uid

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const [detailsData, creditsData, videoData] = await Promise.all([
                    fetchDetails(type, id),
                    fetchCredits(type, id),
                    fetchVideo(type, id),
                ]);

                //setDetails
                setDataDetail(detailsData)
                console.log("DataDetail: ", dataDetail)

                //setCredits
                setDataCredit(creditsData)
                console.log("creditsData: ", dataCredit)

                //* setDataVideo
                const trailerVideo = videoData?.find((video) => video?.type === "Trailer")
                setDataVideo(trailerVideo)
                getComments()


            } catch (error) {
                console.log(error, "error")
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    const addComment = async () => {

        try {
            const commentRef = doc(db, 'comments', `${userId}_${id}`)
            const docSnapshot = await getDoc(commentRef)
            if (docSnapshot.exists()) {
                toast.error("Tekrar yorum yapamazsın")
                return
            }
            if (commentText.length < 5) {
                toast.error("5 karakterden daha az yorum yapamazsın!")
                return
            }

            await setDoc(commentRef, {
                createAt: serverTimestamp(),
                userId: userId,
                commentWatchId: id,
                type: type,
                name: `${userInfo?.name} ${userInfo?.lastname}`,
                text: commentText
            })
            setCommentText("")
            toast.success("Yorum eklendi!")
            getComments()

        } catch (error) {
            console.log(error)
            toast.error("Yorum eklenirken bir hata oluştu!")
        }
    }

    const getComments = async () => {

        const q = query(collection(db, "comments"), where("commentWatchId", "==", id))
        const querySnapshot = await getDocs(q)

        const items = []
        querySnapshot.forEach((item) => {
            items.push(item.data())
        })
        setComments(items)
        console.log("comments: ", comments)

    }

    const commentsLength = () => {
        window.scrollTo({
            top: document.body.scrollHeight-1100, // Sayfanın toplam yüksekliği
            behavior: 'smooth', // Yumuşak kaydırma efekti
        });
    }

    const handleWatchListClick = (itemId, item) => {
        if (isItemInWatchList(itemId)) {
            removeWatchlist(itemId);
        } else {
            addWatchList(item.id, type, item.name, item.title, item.first_air_date, item.release_date, item.vote_average, item.poster_path);
        }
    }


    const handleWheels = (event) => {
        event.preventDefault()
        refs.current.scrollLeft += event.deltaY
    }

    useEffect(() => {
        if (refs.current) {
            refs.current.addEventListener('wheel', handleWheels)
        }

        return () => {
            if (refs.current) {
                refs.current.removeEventListener('wheel', handleWheels)
            }
        }
    }, [refs.current])




    return (
        loading
            ? <div className="login-spinner">
                <img src={loading_gif} />
            </div>
            : <div className='movie'>
                <Navbar />

                <div className="movie-detail">
                    <div style={{
                        backgroundImage: `linear-gradient(#000000bd, #000000bd), url('${imagePath}/${dataDetail?.backdrop_path}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} className='movie-content'>
                        <img src={`${imagePath}/${dataDetail?.poster_path}`} />
                        <div className='movie-description'>

                            <h1>{dataDetail?.title ? dataDetail?.title : dataDetail?.name} <span>{`(${dataDetail?.release_date ? dataDetail.release_date?.slice(0, 4) : dataDetail?.first_air_date?.slice(0, 4)})`}</span></h1>
                            <div className="date">
                                <div>
                                    <CiCalendarDate size={18} />
                                    <p>{dataDetail?.release_date ? dataDetail?.release_date : "-"}</p>
                                </div>
                                <div>
                                    <CiClock2 size={18} />
                                    <p>{dataDetail?.runtime ? dataDetail.runtime + " m" : "-"} </p>
                                </div>
                                <div onClick={commentsLength} className="comments-icon">
                                    <FaComments />
                                    <p>{`Comments(${comments.length})`}</p>
                                </div>
                            </div>

                            <div className="movie-score">
                                <CircularProgress size="lg" color={resolveRatingColor(dataDetail?.vote_average)} determinate value={Number(ratingToPercentage(dataDetail?.vote_average))}>
                                    {ratingToPercentage(dataDetail?.vote_average)}%
                                </CircularProgress>
                                <p className='score-text'>User Score</p>
                                <Link to={`/player/${type}/${id}`} className="movie-watch">
                                    <MdLocalMovies className='movie-watch-icon' color='red' size="18" />
                                    <button >Movie Trailer Watch</button>
                                </Link>
                                <div
                                    onClick={() => handleWatchListClick(dataDetail?.id, dataDetail)}
                                    className="movie-add">
                                    {
                                        isItemInWatchList(dataDetail?.id) ? (
                                            <>
                                                <CiBookmarkRemove color="red" size={22} />
                                                <p>Remove Watchlist</p>
                                            </>
                                        )
                                            : (
                                                <>
                                                    <MdBookmarkAdded color="red" size={22} />
                                                    <p>Add to Watchlist</p>
                                                </>
                                            )
                                    }
                                </div>
                            </div>


                            <div className="movie-tagline">
                                <p>{dataDetail?.tagline}</p>
                            </div>

                            <div className="movie-overview">
                                <h1>Overview</h1>
                                <p>{dataDetail?.overview}</p>
                            </div>

                            <div className="movie-types">
                                {
                                    dataDetail?.genres?.map((item, i) => (
                                        <p key={i}>{item?.name}</p>
                                    ))
                                }
                            </div>

                        </div>
                    </div>

                    <div className="casts">
                        <h2>CAST</h2>
                        {
                            dataCredit?.cast?.length != 0
                                ? <div className="cast-player" ref={refs} >
                                    {
                                        dataCredit?.cast
                                            ?.filter(item => item.known_for_department === "Acting" && item.popularity >= 4)
                                            ?.map((item, i) => (
                                                <div key={i} className="cast">
                                                    <img src={`${imagePath}/${item?.profile_path}`} />
                                                    <p>{item?.name}</p>
                                                </div>
                                            ))

                                    }
                                </div>
                                : <div className='detail-not-found'>
                                    <h1>Cast Not Found!</h1>
                                </div>
                        }
                    </div>
                    <hr />
                    <div className="trailer">
                        <h2>TRAILER</h2>

                        {
                            dataVideo?.key ? <iframe
                                className='iframe'
                                src={`https://www.youtube.com/embed/${dataVideo?.key}`}
                                title="TRAILER"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                                : <div className='detail-not-found'>
                                    <h1>Trailer Not Found!</h1>
                                </div>
                        }
                    </div>
                    <hr />


                    <div className="comments">
                        <h1>COMMENTS</h1>

                        <div className="comment-write">
                            <textarea onChange={(e) => setCommentText(e.target.value)} maxLength={450} value={commentText} placeholder='Your Comment...'></textarea>
                            <div className="comment-btn">
                                <div>
                                    <input type="checkbox" />
                                    <span>Spoiler içerir</span>
                                </div>
                                <button onClick={addComment}>Yorum Yap</button>
                            </div>
                        </div>

                        {
                            comments.length > 0 ? comments.map((comment) => {
                                // createAt verisini al
                                const rawTimestamp = comment.createAt;

                                // Firestore timestamp'ini Date nesnesine dönüştür
                                const timestamp = rawTimestamp.seconds * 1000 + rawTimestamp.nanoseconds / 1000000;
                                const date = new Date(timestamp);

                                // Türkiye saatine göre formatla
                                const formattedDate = date.toLocaleString("tr-TR", {
                                    timeZone: "Europe/Istanbul",
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                    <div key={comment.userId} className="user-comments">
                                        <div className="comment-user-info">
                                            <p className='comment-name'>{comment?.name}</p>
                                            <p className='comment-date'>{formattedDate}</p>
                                        </div>
                                        <div className="user-comment">
                                            <p>{comment.text}</p>
                                        </div>
                                    </div>
                                );
                            }) : <p className='not-comment'>Yorum Bulunamadı!</p>
                        }

                    </div>
                    <hr />
                </div>
                <Footer />
            </div>


    )
}

export default MovieDetail