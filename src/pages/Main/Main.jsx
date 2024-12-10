import React, { useContext, useEffect } from 'react'
import './Main.css'
import logo from '../../assets/logo.png'
import banner1 from '../../assets/tv1.png'
import banner2 from '../../assets/tv2.png'
import banner3 from '../../assets/download.png'
import banner5 from '../../assets/kids.png'
import Footer from '../../components/Footer/Footer'
import { AppContext } from '../../context/AppContext'
import { auth } from '../../firebase'

const Main = () => {

    const { navigate } = useContext(AppContext)


    return (
        auth.currentUser
            ? navigate('/')
            : <div className='main'>
                <div className="main-home">
                    <div className="nav">
                        <img src={logo} alt="logo" />
                        <button onClick={() => navigate('/login')}>Oturum Aç</button>
                    </div>

                    <div className="home-content">
                        <h1>Sınırsız film, dizi ve çok daha fazlası</h1>
                        <h3>149,99 TL ile başlayan fiyatlarla. İstediğiniz zaman iptal edebilirsiniz.</h3>
                        <p>İzlemeye hazır mısınız? Üye olmak ya da hesabınıza tekrar ulaşmak için tek yapmanız gereken e-posta adresinizi girmek.</p>
                        <div className="sign-up">
                            <input type="email" placeholder='E-posta adresi' required />
                            <button onClick={() => navigate('/login')}>{`Başlayın`}</button>
                        </div>

                    </div>
                    <hr />
                </div>

                <div className="main-content">

                    <div className='main-content-one'>
                        <div className="content-text">
                            <h1>Televizyonunuzda İzleyebilirsiniz.</h1>
                            <p>Akıllı TV, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray oynatıcılar ve daha fazlasında seyredin.</p>
                        </div>
                        <img src={banner1} />
                    </div>
                    <hr />
                    <div className='main-content-one'>
                        <div className="content-text">
                            <h1>İstediğiniz her yerde izleyin!</h1>
                            <p>Telefonda, tablette, bilgisayarda, televizyonda sınırsız film ve dizi izleyin.</p>
                        </div>
                        <img src={banner2} />
                    </div>
                    <hr />
                    <div className='main-content-one'>
                        <div className="content-text">
                            <h1>İstediğiniz her yerde izleyin!</h1>
                            <p>Telefonda, tablette, bilgisayarda, televizyonda sınırsız film ve dizi izleyin.</p>
                        </div>
                        <img src={banner3} />
                    </div>
                    <hr />
                    <div className='main-content-one'>
                        <div className="content-text">
                            <h1>Çevrimdışı izlemek için içerikleri indirin!</h1>
                            <p>En sevdiğiniz içerikleri kolayca kaydedin ve her zaman izleyecek bir şeyleriniz olsun.</p>
                        </div>
                        <img src={banner5} />
                    </div>
                    <hr />
                </div>

                <Footer />


            </div>
    )
}

export default Main