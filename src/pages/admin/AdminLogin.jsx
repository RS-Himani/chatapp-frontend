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

const AdminLogin = () => {

    const { isAdmin } = useSelector((state) => state.auth);

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

                    <TextField 
                        required
                        fullWidth
                        type='password'
                        label="Password"
                        margin='normal'
                        variant='outlined'
                        value={secretKey.value}
                        onChange={secretKey.changeHandler}
                    />

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