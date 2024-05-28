import React, { useEffect, useState } from 'react';
import { 
    Avatar, 
    Button, 
    Container, 
    IconButton, 
    Paper, 
    Stack, 
    TextField, 
    Typography,
} from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { blue } from '../../constants/color';
import { useInputValidation } from '6pp';
import { Navigate } from 'react-router-dom';
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AdminLogin = () => {

    const { isAdmin } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

    const dispatch = useDispatch();

    const secretKey =useInputValidation("");

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    }

    useEffect(() => {
        dispatch(getAdmin());
      }, [dispatch]);

    if (isAdmin) return <Navigate to="/admin/dashboard" />;

    return (
        <div
            style={{
                backgroundImage:
                    blue
            }}
        >
            <Container 
                component={"main"} 
                maxWidth="xs"
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Paper elevation={3}
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                    
                <Typography variant='h5'> Admin Login </Typography>
                <form 
                    style={{
                        width: "100%",
                        marginTop: "1rem"
                    }}
                    onSubmit={submitHandler}
                >

                    <FormControl 
                        variant="outlined"
                        required
                        fullWidth
                    >
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            value={secretKey.value}
                            onChange={secretKey.changeHandler}
                        />
                    </FormControl>
                    {/* <TextField 
                        required
                        fullWidth
                        type='password'
                        label="Password"
                        margin='normal'
                        variant='outlined'
                        value={secretKey.value}
                        onChange={secretKey.changeHandler}
                    /> */}

                    <Button
                        sx={{
                            marginTop: '1rem',
                        }}
                        type='submit'
                        variant='contained'
                        color='primary'
                        fullWidth
                    >
                        Login
                    </Button>
                </form>
                        
                </Paper>
            </Container>
        </div>
    );
}

export default AdminLogin;
