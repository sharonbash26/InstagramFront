import { Link } from "react-router-dom";

export function PostPreview({ pst }) {
    const {txt, imgUrl,by, _id } = pst || {}
    console.log('txtinP',txt)
    console.log('imgUrl',imgUrl)
    console.log('by',by)
    // const robohashUrl = `https://robohash.org/${pst._id}?set=set4&size=150x150`
    return (
        <article className="pst-Preview">

            <h4>{txt}</h4>
            console.log('txt',txt)
            <img src={imgUrl}></img>
            console.log('imgUrl',imgUrl)
            <h2>By:{by}</h2>
            <hr />
            {/* <Link to={`/pst/${_id}`}>Details</Link> */}
            {/* <Link className="details-btn" to={`/pst/${_id}`}>Details</Link> */}

        </article>
    )

}