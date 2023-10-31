export function SelectedImgForEditing({ uploadedImageUrl, onNext }) {
    if (!uploadedImageUrl) {
        return null
    }
    console.log('uploadddddd img url', uploadedImageUrl);

    return (
        <section className="selected-img-for-editing" >
            <section className="header">
                <button className="back">⬅</button>
                <h4>Crop</h4>
                <button className="next" onClick={onNext}>Next</button>
            </section>

            <div className="full-img" style={{ backgroundImage: `url(${uploadedImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center center', width: '702px', height: '680px' }}>
            </div>




        </section>
    );
}
