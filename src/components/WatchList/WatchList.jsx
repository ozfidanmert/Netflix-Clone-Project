import React, { useContext, useEffect, useState } from 'react'
import './WatchList.css'
import { ratingToPercentage, resolveRatingColor } from '../../utils/helpers'
import CircularProgress from '@mui/joy/CircularProgress'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import { imagePath } from '../../services/api'
import loading_gif from '../../assets/netflix_spinner.gif'
import { MdBookmarkAdded, MdOutlineBookmarkAdded } from 'react-icons/md'
import { CiBookmarkRemove } from 'react-icons/ci'

const WatchList = () => {

  const { loading, navigate, watchList, fetchWatchList, removeWatchlist } = useContext(AppContext)



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
          <h2>My Watch List</h2>
        </div>

        <div className="watch-cards-list">
          {
            watchList && watchList?.length > 0 ? (
              watchList?.map((item, i) => (

                <div key={i} className="watch-card-item">
                  <img
                    onClick={() => navigate(`/detail/${item.type}/${item.watchId}`)}
                    src={`${imagePath}${item?.poster}`} />

                  <div className="watch-add-list"
                    onClick={() => removeWatchlist(item.watchId)}>
                    <CiBookmarkRemove color='red' size={22} />
                    <p>Remove Watchlist</p>
                  </div>

                  <div className="watch-card-text">
                    <h5>{item?.name}</h5>
                    <p>{item?.date?.slice(0, 4) || item?.date?.slice(0, 4)}</p>
                    <CircularProgress size="lg" color={resolveRatingColor(item?.average)} determinate value={Number(ratingToPercentage(item?.average))}>
                      {ratingToPercentage(item?.average)}%
                    </CircularProgress>
                  </div>
                </div>
              ))
            )
              : (
                <div className="watch-info">
                  <h1>İzleme listesi bulunamadı!</h1>
                </div>
              )
          }
        </div>
      </div>
  )
}

export default WatchList