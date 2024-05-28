import React, { useState } from 'react';
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
import { CameraAlt as CameraAltIcon } from'@mui/icons-material';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { userNameValidator } from '../utils/validators';
import { blue } from '../constants/color';
import axios from "axios";
import { server } from "../constants/config";
import { userExists } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {

   const [isLogin, setIsLogin] = useState(true);
   const [isLoading, setIsLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


   const toggleLogin = () => setIsLogin((prev) => !prev);

   const name = useInputValidation("");
   const bio = useInputValidation("");
   const username = useInputValidation("", userNameValidator);
   //const password = useStrongPassword();
    const password = useInputValidation("");

    const avatar = useFileHandler("single",);

    const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
    //console.log("Data : ", data)
      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
      //sessionStorage.setItem("userToken", JSON.stringify(data.token));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file);
    formData.append("name", name.value);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );

      dispatch(userExists(data.user));
      toast.success(data.message, {
        id: toastId,
      });
      //localStorage.setItem("userToken", JSON.stringify(data.token));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
                <motion.div
                   initial={{ opacity: 0, y: "-100%" }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.3 }}
                >
                <Paper elevation={3}
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                >
                    {isLogin ? (
                        <>
                            <Typography variant='h5'> Login </Typography>
                            <form 
                                style={{
                                    width: "100%",
                                    marginTop: "1rem"
                                }}
                                onSubmit={handleLogin}
                            >
                                <TextField 
                                    required
                                    fullWidth
                                    label="UserName"
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />

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
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />
                                </FormControl>

                                {/* <TextField 
                                    required
                                    fullWidth
                                    type='password'
                                    label="Password"
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                /> */}

                                <Button
                                    sx={{
                                        marginTop: '1rem',
                                    }}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    Login
                                </Button>

                                <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                <Button
                                    variant='text'
                                    fullWidth
                                    onClick={toggleLogin}
                                    disabled={isLoading}
                                >
                                    Sign Up
                                </Button>

                            </form>
                        </>
                    ) : (
                        <>
                            <Typography variant='h5'> Sign Up </Typography>
                            <form 
                                style={{
                                    width: "100%",
                                    marginTop: "1rem"
                                }}
                                onSubmit={handleSignUp}
                            >
                                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                                    <Avatar
                                        sx={{
                                            width: "10rem",
                                            height: "10rem",
                                            objectFit: "contain"
                                        }}
                                        src={avatar.preview}
                                    />
                                    
                                    {avatar.error && (
                                        <Typography m={"1rem"} color="error" variant='caption'>
                                            {avatar.error}
                                        </Typography>
                                    )}

                                    <IconButton
                                        sx={{
                                            position: "absolute",
                                            bottom: "0",
                                            right: "0",
                                            color: "white",
                                            bgcolor: "rgb(0,0,0,0.5)",
                                            ":hover": {
                                                bgcolor: "rgb(0,0,0,0.7)"
                                            }
                                        }}
                                        component="label"
                                    >
                                        <>
                                        <CameraAltIcon />
                                        <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} /> 
                                        </>
                                    </IconButton>
                                </Stack>
                                <TextField 
                                    required
                                    fullWidth
                                    label="Name"
                                    margin='normal'
                                    variant='outlined'
                                    value={name.value}
                                    onChange={name.changeHandler}
                                />

                                <TextField 
                                    required
                                    fullWidth
                                    label="Bio"
                                    margin='normal'
                                    variant='outlined'
                                    value={bio.value}
                                    onChange={bio.changeHandler}
                                />

                                <TextField 
                                    required
                                    fullWidth
                                    label="UserName"
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                />

                                {username.error && (
                                    <Typography color="error" variant='caption'>
                                        {username.error}
                                    </Typography>
                                )}

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
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />
                                </FormControl>

                                {/* <TextField 
                                    required
                                    fullWidth
                                    type='password'
                                    label="Password"
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                /> */}

                                {password.error && (
                                    <Typography color="error" variant='caption'>
                                        {password.error}
                                    </Typography>
                                )}

                                <Button
                                    sx={{
                                        marginTop: '1rem',
                                    }}
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    fullWidth
                                    disabled={isLoading}
                                >
                                    Sign Up
                                </Button>

                                <Typography textAlign={'center'} m={'1rem'}>OR</Typography>

                                <Button
                                    variant='text'
                                    fullWidth
                                    onClick={toggleLogin}
                                    disabled={isLoading}
                                >
                                    Login
                                </Button>

                            </form>
                        </>
                        
                        )}
                </Paper>

                </motion.div>
                    
            </Container>
        </div>
    );
}

export default Login;
