import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Profile.css'
import { AppContext } from '../../context/AppContext'
import loading_gif from '../../assets/netflix_spinner.gif'
import { toast } from 'react-toastify'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, logout } from '../../firebase'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'


const Profile = () => {

    const { userInfo, loading } = useContext(AppContext);

    const [profileEdit, setProfileEdit] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordRepeat, setNewPasswordRepeat] = useState("")
    const [newChangePassword, setNewChangePassword] = useState(false)


    useEffect(() => {
        setFirstName(userInfo?.name || "");
        setLastName(userInfo?.lastname || "");
    }, [loading]);


    const profileUpdate = async (event) => {
        event.preventDefault()

       

        const user = auth?.currentUser
        const credential = EmailAuthProvider.credential(user.email, currentPassword)

        const userId = auth?.currentUser?.uid
        const docRef = doc(db, "user", userId)

        try {
            // Şifre değişikliği yapılacaksa
            if (newPassword.length > 0 && newPasswordRepeat.length > 0) {
                if (newPassword === newPasswordRepeat) {
                    await reauthenticateWithCredential(user, credential);
                    await updatePassword(user, newPassword);
                    toast.success("Password Changed!");
                    logout() //* çıkış yapar
                } else {
                    toast.error("Passwords do not match");
                    return;
                }
            } 
            

            if (firstName.length > 0 && lastName.length > 0) {
                await updateDoc(docRef, {
                    name: firstName,
                    lastname: lastName
                });
                toast.success("Profile Updated!");
            }
    
        } catch (error) {
            console.error(error);
            toast.error("An error occurred!");
        }

    }




    return (
        loading ?
            <div className="login-spinner">
                <img src={loading_gif} alt="Loading..." />
            </div>
            : <div className='profile'>
                <Navbar />
                <div className="profile-content">

                    <form onSubmit={profileUpdate} >

                        <div className="profile-form">
                            <h1>PROFILE</h1>
                            <h4 
                            onClick={() => profileEdit ? setProfileEdit(false) : setProfileEdit(true)}
                            >Profile Edit</h4>
                            <div className='name-edit'>
                                <input disabled={!profileEdit} type="text" placeholder='FirstName'
                                    onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                                <input disabled={!profileEdit} type="text" placeholder='LastName' onChange={(e) => setLastName(e.target.value)} value={lastName} />
                            </div>
                            <p>Password Change</p>
                            <div>
                                <input className='password-input' onChange={(e) => setCurrentPassword(e.target.value)} type="password" placeholder='Current Password' />
                                <input className='password-input' onChange={(e) => setNewPassword(e.target.value)} type="password" placeholder='New Password' />
                                <input className='password-input' onChange={(e) => setNewPasswordRepeat(e.target.value)} type="password" placeholder='New Password' />
                            </div>
                            <button type="submit">SAVE</button>
                        </div>

                    </form>

                </div>
            </div>
    )
}

export default Profile