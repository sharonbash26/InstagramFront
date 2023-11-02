export function SelectedImgForEditing({ uploadedImageUrl, onNext ,onBack}) {
    if (!uploadedImageUrl) {
        return null
    }
    console.log('uploadddddd img url', uploadedImageUrl);

    return (
        <section className="selected-img-for-editing" >
            <section className="header">
                <button className="back" onClick={onBack}><img src="back.svg"></img></button>
                <h4>Crop</h4>
                <button className="next" onClick={onNext}>Next</button>
            </section>
            
            <div className="full-img" style={{ backgroundImage: `url(${uploadedImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '100%', height: '639px' }}>
            </div>
        </section>
    )
}
