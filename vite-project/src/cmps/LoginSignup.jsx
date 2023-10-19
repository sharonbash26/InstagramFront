import { useState, useEffect } from 'react'
import { userService } from '../services/user.service'
import { ImgUploader } from './ImgUploader'

import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
export function LoginSignup(props) {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [isSignup, setIsSignup] = useState(false)
    const [users, setUsers] = useState([])
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' })
        setIsSignup(false)
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        props.onLogin(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        props.onSignup(credentials)
        clearState()
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl })
    }

    return (
        <div className="login-page">
            <div className="logo">
                <img src="logo.svg"></img>
            </div>
            <p>
                <button className="btn-link" onClick={toggleSignup}>{!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            
            {<form className="login-form" onSubmit={onLogin}>
                <select
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                >
                    <option value="">Select User</option>
                    {users.map(user => <option key={user._id} value={user.username}>{user.fullname}</option>)}
                </select>
                {/* <input
                        type="text"
                        name="username"
                        value={username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        autoFocus
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    /> */}
                <button>Login!</button>
                <div className="login-with-facebook">
                            {!profile ? (
                                <LoginSocialFacebook
                                    appId="1715906822256982"
                                    onResolve={(response) => {
                                        console.log(response);
                                        setProfile(response.data);
                                    }}
                                    onReject={(error) => {
                                        console.log(error);
                                    }}
                                >
                                    <FacebookLoginButton />
                                </LoginSocialFacebook>
                            ) : (
                                ""
                            )}

                            {profile ? (
                                <div>
                                    {/* <h1>{user.fullname}</h1> */}
                                    {/* <img src={profile.picture.data.url} /> */}
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
            </form>}
            <div className="signup-section">
                {<form className="signup-form" onSubmit={onSignup}>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Fullname"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="username"
                        value={credentials.username}
                        placeholder="Username"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        placeholder="Password"
                        onChange={handleChange}
                        required
                    />
                    {/* <ImgUploader onUploaded={onUploaded} /> */}
                    <button >Signup!</button>
                </form>}
            </div>
            <div className='apps-options'>
                <h4>Get the app.</h4>
                <section className='links-imgs'>
                <img src='googleplay.png' className='google-play-img'></img> 
                <img src="microsoft.png" className='microsoft-img'></img>
                </section>
            </div>
        </div>
    )
}