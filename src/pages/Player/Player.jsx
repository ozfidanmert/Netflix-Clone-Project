import React, { useContext } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { AppContext } from '../../context/AppContext';

const Player = () => {
    const { navigate, dataVideo } = useContext(AppContext)


    return (
        <div className="player">
            <img onClick={() => navigate(-1)} src={back_arrow_icon} className="back-arrow" alt="Back" />
            <iframe
                width="95%"
                height="92%"
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                src={"https://www.youtube.com/embed/" + dataVideo?.key}
            ></iframe>
            {console.log(dataVideo)}
            <div className="player-info">
                <p>Published At: <span>{dataVideo?.published_at}</span></p>
                <p>Movie Name: <span>{dataVideo?.name}</span></p>
                <p>Type: <span>{dataVideo?.type}</span></p>
            </div>
        </div>
    );
};

export default Player;
