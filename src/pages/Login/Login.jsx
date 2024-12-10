import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { auth, db, login, signup } from '../../firebase'
import loading_gif from '../../assets/netflix_spinner.gif'
import { AppContext } from '../../context/AppContext'

const Login = () => {

    const [signState, setSignState] = useState("Giriş Yap")
    const [name, setName] = useState("")
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, setLoading, navigate } = useContext(AppContext)



    const onSubmitHandler = async (event) => {

        event.preventDefault()
        setLoading(true)
        if (signState === "Üye Ol") {
            await signup(name, lastname, email, password)
        }
        else if (signState === "Giriş Yap") {
            await login(email, password)
            if (auth?.currentUser) {
                navigate('/')

            } else {
                navigate('/login')
            }

        }
        setLoading(false)
    }

    useEffect(() => {
        if (auth.currentUser) {
            navigate('/')
        }
        else return
    }, [])



    return (
        auth.currentUser
            ? navigate('/')
            : (
                loading
                    ? <div className="login-spinner">
                        <img src={loading_gif} />
                    </div>
                    : <div className='login'>
                        <img onClick={() => navigate('/tr')} src={logo} className='login-logo' />
                        <div className="login-form">
                            <h1>{signState}</h1>

                            <form onSubmit={onSubmitHandler} >

                                {signState === "Üye Ol"
                                    ? <input onChange={(e) => setName(e.target.value)} className='input-user' type="text" placeholder='Adınız' required />
                                    : <></>
                                }
                                {signState === "Üye Ol"
                                    ? <input onChange={(e) => setLastName(e.target.value)} className='input-user' type="text" placeholder='Soyadınız' required />
                                    : <></>
                                }

                                <input onChange={(e) => setEmail(e.target.value)} className='input-user' type="email" placeholder='E-Mail' required />

                                <input onChange={(e) => setPassword(e.target.value)} className='input-user' type="password" placeholder='Parola' required />

                                <button type='submit'>{signState}</button>

                                <div className='form-help'>
                                    {
                                        signState === 'Giriş Yap' ?
                                            <div className="remember">
                                                <input type="checkbox" />
                                                <label htmlFor="">Beni Hatırla</label>
                                            </div>
                                            : <div className="remember">
                                                <input required type="checkbox" />
                                                <label htmlFor="">Okudum, onaylıyorum.</label>
                                            </div>
                                    }
                                    <p>Yardıma ihtiyacım var?</p>
                                </div>

                            </form>
                            <div className='form-switch'>
                                {
                                    signState === "Üye Ol" ? <p>Mevcut üyeliğin var mı? <span onClick={() => setSignState("Giriş Yap")}>Hemen giriş yap!</span></p>
                                        : <p>Üyeliğin yok mu? <span onClick={() => setSignState("Üye Ol")} >Hemen üye ol!</span></p>
                                }



                            </div>
                        </div>
                    </div>)

    )
}

export default Login
