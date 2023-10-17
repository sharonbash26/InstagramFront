import { useSelector } from 'react-redux'
import { UserUpperPart } from '../cmps/UserUpperPart'
import { UserBottomPart } from '../cmps/UserBottomPart'

export function ProfileUserPage() {
    const user = useSelector(storeState => storeState.userModule.user)

    console.log('user name', user)
    // console.log('user photos', user.userPhotos[0].src)
    return (
        <section className='profile-user-page'>
            <UserUpperPart />
            <UserBottomPart />
        </section>

    )
}