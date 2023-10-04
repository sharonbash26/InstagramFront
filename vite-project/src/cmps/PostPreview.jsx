import { Link } from "react-router-dom";
import { utilService } from "../services/util.service";
// import img from '../assets/img/1.jpg'


export function PostPreview({ pst }) {
    console.log('pst', pst);
    const { txt, imgUrl, by, _id } = pst
    console.log('txtinP', txt)
    // console.log('imgUrl', imgUrl)
    console.log('by', by)
    return (
        <article className="pst-Preview">
            <h4>{txt}</h4>
            {/* <img src={utilService.getAssetSrc('react.svg')} alt="pst preview"></img> */}
            <img src="s2.jpg" alt="pst preview"></img>
            <h2>By:{by.fullname}</h2>
            <hr />

        </article>
    )

}