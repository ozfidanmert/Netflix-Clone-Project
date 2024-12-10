import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './NotFound.css'
import { AppContext } from '../../context/AppContext'
import { auth } from '../../firebase'

const NotFound = () => {

    const {navigate} = useContext(AppContext)

    useEffect(() => {
        setTimeout(() => {
            if (auth.currentUser) {
                navigate('/home')
            }
            else {
                navigate('/')
            }
        }, 8000);
    }, [])

    return (
        <div className='not-found'>
            <Navbar />
            <div className="info">
                <h1>HATALI SAYFA!</h1>
                <p>Ana sayfaya yönlendiriliyorsunuz...</p>
            </div>
        </div>
    )
}

export default NotFound
