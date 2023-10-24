import { logout } from "../store/user.actions"
import { useNavigate } from 'react-router-dom'

export function MoreModal() {
    const navigate = useNavigate();
    const handleLogout = () => {
        logout()
        navigate('/login')
    }
    return (
        <section className="MoreModal">
            <button className="Log out" onClick={handleLogout}>Log out</button>
        </section>
    )
}