import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Login from '../login/Login';
import Signup from '../signup/Signup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from '../Profile-dropdown/Profiledropdown';
import "./Loginmodel.css"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Default for mobile devices (90% of the screen)
    maxWidth: 400, // Maximum width for larger screens
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 3,
    '@media (min-width: 600px)': { width: '60%' }, // For medium screens (tablets)
    '@media (min-width: 960px)': { width: '35%' }, // For large screens (desktops)
};

export default function Loginmodal() {
    const [open, setOpen] = React.useState(false);
    const [logged, setLogged] = React.useState(false)
    const [token, setToken] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const storedtoken = localStorage.getItem("token")
        if (storedtoken) {
            setToken(true)
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

    return (
        <div>

            {token ? (<div className=""><ProfileDropdown setToken={setToken} handleOpen={handleOpen}/>
            </div>) : (<Button onClick={handleOpen} variant="contained" size='medium' className='signup-btn'>Sign Up</Button>)}

            <ToastContainer />

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
                    <Box sx={style} width={"90%"}>
                        {
                            logged ? (<Login onswitch={switchSignup} onclose={handleClose} />) : (<Signup onswitch={SwitchLogin} />)
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
