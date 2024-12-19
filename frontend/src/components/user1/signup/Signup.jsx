import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
function Signup({ onswitch }) {
    return (
        <div className='container-fluid'>
            <h3 className='text-center'> Sign Up </h3>
            
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"

            >
                <TextField
                    id="outlined-password-input"
                    label="Name"
                    type="text"
                    autoComplete="current-password"
                    size='small'
                    color='success'

                />

                <TextField
                    id="outlined-password-input"
                    label="Mobile"
                    type="number"
                    autoComplete=""
                    size='small'
                    color='success'


                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    color='success'

                />

                <div className='  text-center mt-2'> <button className=' btn-danger btn  butn  px-4 '>
                    Submit</button></div>
                <div className='text-center mt-2'><p>Already an Account? <span className='text-link fw-bold'  onClick={onswitch} style={{cursor:"pointer"}}>Login</span> </p></div>
            </Box>

        </div>








    )
}
export default Signup