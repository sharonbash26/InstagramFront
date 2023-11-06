import { useSelector } from 'react-redux'
import { UserUpperPart } from '../cmps/UserUpperPart'
import { UserBottomPart } from '../cmps/UserBottomPart'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

export function ProfileUserPage() {
    const user = useSelector(storeState => storeState.userModule.user)
    console.log('user', user)
    const navigate = useNavigate('/')
    const { userId } = useParams()

    useEffect(() => { 
        navigate(`/profile/${userId}/psts`)
    }, [])

    return (
        <section className='profile-user-page'>
            <UserUpperPart />
            <UserBottomPart />
            <div className="nested-route">
                <Outlet />
            </div>
        </section>

    )
}