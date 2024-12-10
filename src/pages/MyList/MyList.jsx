import React from 'react'
import './MyList.css'
import Navbar from '../../components/Navbar/Navbar'
import WatchList from '../../components/WatchList/WatchList'
import Footer from '../../components/Footer/Footer'


const MyList = () => {

    return (
        <div className='my-list'>
            <Navbar />
            <div className="watch-list-content">
               <WatchList/>
            </div>
            <Footer/>
        </div>
    )
}

export default MyList