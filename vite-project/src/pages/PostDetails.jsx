import { useParams, useNavigate, Link } from 'react-router-dom'
import { pstService } from '../services/pst.service.local'
import { useEffect, useState } from 'react'
import { ThreeDotModal } from '../cmps/ThreeDotModal'
import { CommentDetails } from '../cmps/CommentDetails'
import { CommentList } from '../cmps/CommentList'
import { useDispatch, useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { loadPost } from '../store/pst.actions'


export function PostDetails({ openDotModal, closeDotModal, onRemovePst }) {
    // const [pst, setPst] = useState(null)
    const [isDotModalOpen, setIsDotModalOpen] = useState(false)
    const navigate = useNavigate()
    const pst = useSelector(storeState => storeState.pstModule.selectedPost)
    let userLogged = userService.getLoggedinUser()
    const user = useSelector(storeState => storeState.userModule.user)
    const userId = user._id


    function closeModalWithRouter() {
        navigate(-1)
    }


    const { pstId } = useParams()

    useEffect(() => {
        loadPost(pstId)
    }, [])

    const navigateProfileUser = () => {
        navigate(`/profile/${pst.by._id}`);
    }

    function getRandomTimeStringV2() {
        // Decide randomly whether to return hours or minutes
        const isHour = Math.random() < 0.5; 
      
        if (isHour) {
          // Generate a random hour between 1 and 3
          const hour = Math.floor(Math.random() * 3) + 1;
          return `${hour}h`;
        } else {
          // Generate a random minute between 1 and 59
          const minute = Math.floor(Math.random() * 59) + 1;
          return `${minute}m`;
        }
      }

    if (!pst) return <p>Loading...</p>
    return (
        <section className="pst-details-container">

            <section className='pst-details'>
                {/* <pre>{JSON.stringify(pst)}</pre> */}
                <div className='img-side-details'>

                    <img className="details-img" src={pst.imgUrl} ></img>
                </div>

                <div className='header-container-details-modal'>
                    <div className='all'>
                        <section className='details-subject'>
                            <section className='first'>
                                <button onClick={navigateProfileUser}><img className='profile-details-img' src={pst.by.imgUrl || "emptyUser.jpeg"} alt="pst preview"></img>
                                </button>
                                {/* <h4>{userLogged.userName}</h4> */}
                                {/* <h4 style={{margin-top:6px}}>{pst.by.fullname}</h4> */}
                                <h4 style={{ marginTop: '6px' }}>{pst.by.fullname}</h4>

                            </section>
                            <section className='second'>
                                <button onClick={openDotModal}><img className="three-dot-icon" src="3dot.svg"></img></button>
                                {isDotModalOpen && <ThreeDotModal closeDotModal={closeDotModal} onRemovePst={() => onRemovePst(pst._id)}></ThreeDotModal>}
                                <svg onClick={closeModalWithRouter} aria-label="Close" className="cross-icon" color="rgb(255, 255, 255)" fill="rgb(255, 255, 255)" height="18" role="img" viewBox="0 0 24 24" width="18">
                                    <title>Close</title>
                                    <polyline fill="none" points="20.643 3.357 12 12 3.353 20.647" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></polyline>
                                    <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" x1="20.649" x2="3.354" y1="20.649" y2="3.354"></line>
                                </svg>
                            </section>
                        </section>
                        <div className='body-container-details-modal'>
                            <section className='first'>
                                <button onClick={navigateProfileUser}>
                                    <img className='profile-details-img' src={pst.by.imgUrl || "emptyUser.jpeg"} alt="pst preview"></img>
                                </button>
                                <h4 className='pst-by'>{pst.by.fullname}</h4>
                                <h4>{pst.txt}</h4>
                            </section>
                            {/* <div className='time'> */}
                            <div className='time-div'>


                                <p className='timee'>{getRandomTimeStringV2()}</p>
                            </div>
                            {/* </div> */}
                      
                        </div>


                        <CommentList pst={pst} />
                        {/* <div className='actions-container'>

                        </div> */}
                    </div>
                </div>
            </section>
            <div className="overlay" onClick={closeModalWithRouter}></div>
        </section>

    )
}