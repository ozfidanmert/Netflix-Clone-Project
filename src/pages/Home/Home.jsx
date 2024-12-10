import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import TitleCards from '../../components/TitleCards/TitleCards'
import Footer from '../../components/Footer/Footer'

const Home = () => {
    return (
        <div className='home'>
            <Navbar/>
            <Hero/>
            <div className="more-cards">
                <TitleCards title={"Blockbuster Movies"} category={"top_rated"}  />
                <TitleCards title={"Only on Netflix"} category={"popular"} />
                <TitleCards title={"Upcoming"} category={"upcoming"} />
                <TitleCards title={"Top Pics four"}  category={"now_playing"} />
            </div>
            <Footer/>

        </div>
    )
}

export default Home
