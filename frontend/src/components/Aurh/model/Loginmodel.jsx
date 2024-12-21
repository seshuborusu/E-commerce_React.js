import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import { ToastContainer,toast,Bounce } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Loginmodal() {
    const [open, setOpen] = React.useState(false);
    const [logged, setLogged] = React.useState(false)
    const [token, setToken] = useState("")
    const navigate=useNavigate()

    useEffect(() => {
        const storedtoken = localStorage.getItem("token")
        if (storedtoken) {
            setToken(storedtoken)
        }
    }, [open])


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const switchSignup = () => {
        setLogged(false)
    }

    const SwitchLogin = () => {
        setLogged(true)

    }



    const logoutUser = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate("/")
        toast.success('Logout Succesfully', {
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

    return (
        <div>
            <ToastContainer />
            {token ? (<Button variant="contained" size='medium' onClick={logoutUser}>Logout</Button>) : (<Button onClick={handleOpen} variant="contained" size='medium'>Sign Up</Button>)}



            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {
                            logged ? (<Login onswitch={switchSignup} onclose={handleClose} />) : (<Signup onswitch={SwitchLogin} />)
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
