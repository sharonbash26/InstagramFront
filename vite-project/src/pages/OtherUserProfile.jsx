import { useSelector } from 'react-redux'
import { UserUpperPart } from '../cmps/UserUpperPart'
import { UserBottomPart } from '../cmps/UserBottomPart'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserUpperPartOther } from '../cmps/UserUpperPartOther'

export function OtherUserProfile() {
    const user = useSelector(storeState => storeState.userModule.user)
    console.log('user',user)

    return (
        <section className='profile-user-page'>
            <UserUpperPartOther />
            <UserBottomPart />
            <div className="nested-route">
            <Outlet />
        </div>
        </section>

    )
}