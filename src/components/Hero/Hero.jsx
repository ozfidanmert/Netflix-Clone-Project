import React from 'react'
import './Hero.css'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from '../TitleCards/TitleCards'

const Hero = () => {
    return (
        <div className='hero'>
            <img src={hero_banner} className='banner-img' />
            <div className="hero-caption">
                <img src={hero_title} className='caption-img' />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto consequuntur repudiandae minus aliquam similique architecto maxime asperiores, quis nam quisquam?</p>
                <div className="hero-btns">
                    <button className='btn'><img src={play_icon} /> Play</button>
                    <button className='btn dark-btn'><img src={info_icon} /> More Info</button>
                </div>
                <div className='title-cardss'>
                    <TitleCards title={"Popular on Netflix"} category={"popular"} />
                </div>
            </div>
        </div>
    )
}

export default Hero
