import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Login from '../login/Login';
import Signup from '../signup/Signup';

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
    const [logged,setLogged]=React.useState(false)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const switchSignup=()=>{
        setLogged(false)
    }

    const SwitchLogin=()=>{
        setLogged(true)
    }

    return (
        <div>
            <Button onClick={handleOpen} variant="contained" size='medium'>Sign Up</Button>
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
                        logged?(<Login onswitch={switchSignup}/>):(<Signup onswitch={SwitchLogin}/>)
                      }
                    
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
