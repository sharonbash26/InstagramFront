import { useParams, useNavigate, Link } from 'react-router-dom'
import { pstService } from '../services/pst.service.local'
import { useEffect, useState } from 'react'

export function PostDetails() {
    const [pst, setPst] = useState(null)

    const { pstId } = useParams()

    useEffect(() => {
        loadPost()
    }, [pstId])

    async function loadPost() {
        const pst = await pstService.getById(pstId)
        console.log('ppppppppp',pst.imgUrl)
        setPst(pst)
    }
    if (!pst) return <p>Loading...</p>
    return (
        <section className='pst-details'>
            <pre>{JSON.stringify(pst)}</pre>

        </section>
    )
}