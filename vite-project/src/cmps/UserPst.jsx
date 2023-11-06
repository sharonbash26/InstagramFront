import { useEffect, useState } from 'react';
import { loadUserLoggedPsts } from '../store/user.actions';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Link } from "react-router-dom";


export function UserPst() {
    const [userPsts, setUserPsts] = useState([]);
    const [isIconShown, setIsIconShown] = useState()
    const { userId } = useParams()

    useEffect(() => {
        // Load user posts and update the state when they are loaded
        loadUserLoggedPsts(userId)
            .then((psts) => {
                setUserPsts(psts);
                console.log('User posts:', psts);
            })
            .catch((err) => {
                console.error('Error loading user posts', err);
                showErrorMsg('Cannot load user logged posts');
            });
    }, []);

    function toggleIcons(state) {
        setIsIconShown(state)
    }

    return (
        <div className='user-pst'>

            <ul>
                {userPsts.map((pst, index) => (
                    <li key={index}>
                        <div className='user-pst-preview' onMouseEnter={() => { toggleIcons(true) }} onMouseLeave={() => { toggleIcons(false) }}>
                            {/* <p>{pst.txt}</p> */}
                            {/* <p>{pst.tag}</p> */}

                            <Link to={`/profile/${pst.by._id}/psts/${pst._id}`}>
                                <img src={pst.imgUrl} alt="Post Image" />
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
}
