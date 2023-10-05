import { useParams, useNavigate, Link } from 'react-router-dom'
import { pstService } from '../services/pst.service.local'
import { useEffect, useState } from 'react'

export function PostDetails() {
    const [post, setPost] = useState(null)

    const { pstId } = useParams()

    useEffect(() => {
        loadPost()
    }, [pstId])

    async function loadPost() {
        const post = await pstService.getById(pstId)
        setPost(post)
    }

    if (!post) return <p>Loading...</p>
    return (
        <section>
            <h1>hello</h1>
            <pre>{JSON.stringify(post)}</pre>
        </section>
    )
}