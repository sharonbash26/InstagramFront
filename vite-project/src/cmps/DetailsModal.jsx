export function DetailsModal(){
    
    return(
        <section className="modal">
        <section className='left-side-media'>
        <img src={pst.imgUrl}></img>
        </section>

        <section className='right-side-info'>
        <h4>{pst.by.fullname}</h4>
        <h4>{pst.txt}</h4>
        </section>
        </section>

    )
}