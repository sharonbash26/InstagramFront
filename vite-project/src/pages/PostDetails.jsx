import { useParams, useNavigate, Link } from 'react-router-dom'
import { pstService } from '../services/pst.service.local'
import { useEffect, useState } from 'react'
import { ThreeDotModal } from '../cmps/ThreeDotModal'

export function PostDetails({ openDotModal, closeDotModal, onRemovePst }) {
    const [pst, setPst] = useState(null)
    const [isDotModalOpen, setIsDotModalOpen] = useState(false)


    const { pstId } = useParams()

    useEffect(() => {
        loadPost()
    }, [pstId])



    async function loadPost() {
        const pst = await pstService.getById(pstId)
        setPst(pst)
        console.log('pst txt', pst.by.fullname)
    }
    if (!pst) return <p>Loading...</p>
    return (


        <section className='pst-details'>
            {/* <pre>{JSON.stringify(pst)}</pre> */}
            <div className='img-side-details'>
                <img className="details-img" src="s3.jpg" ></img>
            </div>
            <div className='header-container-details-modal'>
                <section className='details-subject'>
                    <section className='first'>
                        <img className='profile-details-img' src={pst.imgUrl || "s3.jpg"} alt="pst preview"></img>
                        <h4>{pst.by.fullname}</h4>
                    </section>
                    <section className='second'>
                        <button onClick={openDotModal}><img className="three-dot-icon" src="3dot.svg"></img></button>
                        {isDotModalOpen && <ThreeDotModal closeDotModal={closeDotModal} onRemovePst={() => onRemovePst(pst._id)}></ThreeDotModal>}
                    </section>
                </section>

            </div>
            <div className='body-container-details-modal'>
                <section className='first'>
                    <img className='profile-details-img' src={pst.imgUrl || "s3.jpg"} alt="pst preview"></img>
                    <h4>{pst.by.fullname}</h4>
                    <h4>{pst.txt}</h4>
                    
                </section>
            </div>
            <div className='actions-container'>

            </div>



        </section>
    )
}