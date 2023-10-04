export function NavHeader() {
    return (
        <section className="container-nav-side">
            <div className="logo">
                <img src="logo.svg"></img>
            </div>

            <section className="btn-container">
                <button><img src="svgs_collection/svg1.svg"></img><span className="home-span">Home</span></button>
                <button><img src="svgs_collection/svg2.svg"></img><span>Search</span></button>
                <button><img src="svgs_collection/svg4.svg"></img><span>Explore</span></button>
                <button><img src="svgs_collection/svg7.svg"></img><span>Reels</span></button>
                <button><img src="svgs_collection/svg5.svg"></img><span>Messages</span></button>
                <button><img src="svgs_collection/svg6.svg"></img><span>Notifications</span></button>
                <button><i className="fa-regular fa-square-plus"></i>Create</button>
                <button><img className="profile-icon-img" src="s3.jpg"></img>Profile </button>
                <button><img src="svgs_collection/svg8.svg"></img>Threads</button>
                <button><img src="svgs_collection/svg10.svg"></img>More</button>
            </section>


        </section>
    )
}