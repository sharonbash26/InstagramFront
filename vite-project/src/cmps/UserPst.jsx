import { useEffect, useState } from 'react';
import { loadUserLoggedPsts } from '../store/user.actions';

export function UserPst() {
    const [userPsts, setUserPsts] = useState([]); // Initialize userPsts as an empty array

    useEffect(() => {
        // Load user posts and update the state when they are loaded
        loadUserLoggedPsts()
            .then((psts) => {
                setUserPsts(psts);
                console.log('User posts:', psts);
            })
            .catch((err) => {
                console.error('Error loading user posts', err);
                showErrorMsg('Cannot load user logged posts');
            });
    }, []);

    return (
        <div>
          
            <ul>
                {userPsts.map((pst, index) => (
                    <li key={index}>
                        <div>
                            <p>{pst.txt}</p>
                            <p>{pst.tag}</p>
                            <img src={pst.imgUrl} alt="Post Image" />
                        </div>
                    </li>
                ))}
            </ul>

        </div>
    );
}
