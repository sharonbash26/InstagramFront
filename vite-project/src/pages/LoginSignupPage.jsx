import { LoginSignup } from "../cmps/LoginSignup"
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { useNavigate } from 'react-router-dom';




export function LoginSignupPage(){
    const user = useSelector(storeState => storeState.userModule.user)

    const navigate = useNavigate();


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
            navigate('/'); 
        } catch(err) {
            showErrorMsg('Cannot login')
            navigate('/'); 
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
            navigate('/');
        } catch(err) {
            showErrorMsg('Cannot signup')
            navigate('/'); 
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch(err) {
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="login-signup-page">
            <div className="illustration">
                <img src="home-phones-2x.png" className="left-img"></img>
                {/* <img src="frontSign.png"></img> */}
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