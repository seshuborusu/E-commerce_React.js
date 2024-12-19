import Electronics from "../electronics/Electronics"
import Womensclothing from "../womens/Womensclothing"
import Footer from "../Footer/Footer"

function Home() {
    return (
        <div className="container-fluid p-0 ">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner  ">
                    <div className="carousel-item active">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1733837923_web-2024-12-10t190831.586.jpg" className="w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1733913353_faces_cananda_free_nail_paint_copy_1_copy_1_copy_1_copy_1_copy_1_2596x836.jpeg" className="w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://media6.ppl-media.com/tr:w-1280,c-at_max,pr-true,dpr-2/mediafiles/ecomm/misc/1733896721_garnier_spf_skin_2596x836.jpeg" className="d-block w-100" alt="..." />
                    </div>
                </div>
            </div>
            <div className="my-3 p-0"><img src="https://images-static.nykaa.com/uploads/dd133d2a-9b0e-411d-ab27-f189fab8cfa0.jpg?tr=cm-pad_resize,w-12000" height={100} width={"100%"}></img></div>
            <div><Womensclothing/></div>
            <Footer/>
        </div>
    )
}
export default Home