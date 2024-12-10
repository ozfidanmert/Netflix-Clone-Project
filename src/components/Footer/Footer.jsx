import React from 'react'
import './Footer.css'
import facebook_icon from '../../assets/facebook_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import youtube_icon from '../../assets/youtube_icon.png'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-icons">
                <img src={facebook_icon} />
                <img src={instagram_icon} />
                <img src={twitter_icon} />
                <img src={youtube_icon} />
            </div>
            <ul>
                <li>Auido Description</li>
                <li>Help Centre</li>
                <li>Git Cards</li>
                <li>Media Centre</li>
                <li>Investor Relations</li>
                <li>Jobs</li>
                <li>Terms of Use</li>
                <li>Privacy</li>
                <li>Legal Notices</li>
                <li>Cookie Preferences</li>
                <li>Corparate Information</li>
                <li>Contact us</li>
            </ul>
            <p className='copyright-text'>1997-2024 Netflix, Inc.</p>
        </div>
    )
}

export default Footer
