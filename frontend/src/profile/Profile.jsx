import { Link,Outlet } from "react-router-dom"

function Profile(){
    return (
        <div className="container mt-5 shadow-lg">
            <div className="row" style={{height:"400px"}}>
                <div className="col-3 bg-success">
                    <div className="container-fluid h-100 d-flex flex-column justify-content-evenly align-items-center">
                        <div className="row ">
                            <div className="col-12 ">
                                <Link className="text-decoration-none text-light fs-5" to={"personaldetails"}>Personal Details</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12  fs-5">
                                <Link to="professionaldetails" className="text-decoration-none text-light">Professional Details</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 fs-5">
                                <Link to="contactdetails" className="text-decoration-none text-white">Contact</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="col-9 p-4"><Outlet/></div>
            </div>
        </div>
    )
}
export default Profile