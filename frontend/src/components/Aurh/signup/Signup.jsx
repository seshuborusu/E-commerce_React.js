import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from "axios"
import { toast, Bounce } from 'react-toastify';


function Signup({ onswitch }) {
    let [userdata, setUserdata] = useState({
        name: "", mobile: 0, password: ""
    })

    const getuserdetails = (event) => {
        const { name, value } = event.target
        setUserdata({ ...userdata, [name]: value })
    }



    const postData = () => {
        console.log(userdata);
        axios.post("http://localhost:1234/routes/adduser", userdata).then((res) => {
            console.log(res.data);
            if (res.data.ok) {
                onswitch()
            } else {
                // alert("user already register")

                toast.error('User  already exists', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }
        }).catch((error) => {
            console.log("error");
            alert("Error while signup")
        })
    }

    return (
        <div className='container-fluid'>
 
            <h3 className='text-center'> Sign Up </h3>

            <Box
                // component="frm"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"

            >
                <TextField
                    id="outlined-name-input"
                    label="Name"
                    type="text"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name='name'

                />

                <TextField
                    id="outlined-mobile-input"
                    label="Mobile"
                    type="number"
                    autoComplete=""
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name="mobile"


                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name="password"

                />

                <div className='  text-center mt-2'> <button className=' btn-danger btn  butn  px-4 ' onClick={postData}>
                    Submit</button></div>
                <div className='text-center mt-2'><p>Already an Account? <span className='text-link fw-bold' onClick={onswitch} style={{ cursor: "pointer" }}>Login</span> </p></div>
            </Box>

        </div>








    )
}
export default Signup