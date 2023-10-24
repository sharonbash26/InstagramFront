import { LoginSignup } from "../cmps/LoginSignup"
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from 'react'
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";

export function LoginSignupPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    const slideshowImages = ["frontSign.png", "a.png"]
    const [currentImgIndex, setCurrentImgIndex] = useState(0);


    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImgIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
        }, 5000)

        return () => clearTimeout(timer)
    }, [currentImgIndex])

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            navigate('/pst')
        } catch (err) {
            showErrorMsg('Cannot login')
            navigate('//pst')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
            navigate('/pst')
        } catch (err) {
            showErrorMsg('Cannot signup')
            navigate('/pst')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="login-signup-page">
            <div className="illustration">
                <div className="left-img">
                    <img src={slideshowImages[currentImgIndex]} alt="Slideshow" className="slideshow-image" />
                </div>
            </div>
            <nav>

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {/* {user.imgUrl } */}
                            {user.fullname}
                        </Link>

                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav>
        </header>
    )

}