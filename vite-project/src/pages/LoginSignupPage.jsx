import { LoginSignup } from "../cmps/LoginSignup"
import { Link, NavLink } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'


export function LoginSignupPage(){
    const user = useSelector(storeState => storeState.userModule.user)
    const [isLogin, setLogin] = useState(false)


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch(err) {
            showErrorMsg('Cannot signup')
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
        <header className="app-header">
            <nav>
                {/* {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)} */}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl }
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