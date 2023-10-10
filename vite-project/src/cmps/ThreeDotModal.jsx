export function ThreeDotModal({ closeDotModal}) {

    return (
        <div className="modal-overlay">
        <section className="three-dot-modal">
            <button className="3btn" style={{ color: 'red' }}>Delete</button>
            <button className="3btn" style={{ color: 'red' }}>Report</button>
            <button className="3btn">Unfollow</button>
            <button className="3btn">Add to favorites</button>
            <button className="3btn">Not Interested</button>
            <button className="3btn">Go to post</button>
            <button className="3btn">Share to...</button>
            <button className="3btn">Copy link</button>
            <button className="3btn">About this account</button>
            <button className="3btn">Embed</button>
            <button className="3btn">Cancel</button>
        </section>
        </div>
    )
}