import { TextBox } from "./TextBox";

export function AddTextToPost({ uploadedImageUrl }) {
    return (
        <section className="add-text-to-post">
            <button>⬅</button>
            <h4>Create new post</h4>
            <button>Share</button>
            {/* <TextBox /> */}
            {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />}
            <TextBox />
        </section>
    )
}