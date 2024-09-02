import React, { useContext, useState } from 'react'
import {Box, TextField, Button, styled,Typography} from '@mui/material'
import { API } from '../../service/api.js';
import { DataContext } from '../../context/DataProvider.js';
import { useNavigate } from 'react-router-dom';

// initial signup values
const signupInitialValues={
  name:'',
  username:'',
  password:''
}
// initial login values
const loginInitialValues={
  username:'',
  password:''
}


const Login = ({isUserAuthenticated}) => {
  //use state for toggle
  const [account,setToggleAccount]=useState('login');
  const [signup,setSignup]=useState(signupInitialValues);
  const [login,setLogin]=useState(loginInitialValues);
  const [error,setError]=useState('');
  //context api data
  const {setAccount}=useContext(DataContext);
  //navigate
  const navigate=useNavigate();

  //setting the signup values
  const onInputChange=(e)=>{
    setSignup({...signup,[e.target.name]:e.target.value})
    console.log(e.target.name,e.target.value,signup);
  }

  //setting the login values
  const onValueChange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value})
  }

  //on signup
  const signupUser=async()=>{
    let response=await API.userSignup(signup)
    if(response.isSuccess){
      console.log("response")
      console.log(response)
      setSignup(signupInitialValues)
      setToggleAccount('login')
    }else{
      setError('something went wrong please try again later')
    }
  }

  //on login
  const loginUser=async()=>{
    let response=await API.userLogin(login)
    if(response.isSuccess){
      console.log("response")
      console.log(response)
      setLogin(loginInitialValues)
      setError('')
      sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`)
      sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`)
      setAccount({username:response.data.username,name:response.data.name})
      isUserAuthenticated(true)
      navigate('/')
    }else{
      setError('something went wrong please try again later')
    }
  }


  return (
    <Component>
      <Box>
        {/* image */}
        <Image src="https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png" alt="" />

        {
          account==='login'?
            (
              <Wrappper>
                {/* /////////////////////login////////////////////// */}
                {/* labels */}
                <TextField onChange={onValueChange} name='username' id="standard-basic" label="Username" variant="standard" />
                <TextField onChange={onValueChange} name='password' id="standard-basic" label="Password" variant="standard" />

                {error && <Error>{error}</Error>}
                {/* buttons */}
                <LoginButton onClick={loginUser} variant="contained">Login</LoginButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <SignUpButton onClick={()=>setToggleAccount('signup')} variant="outlined">Create an account</SignUpButton>

              </Wrappper>
            )
            :
            (
              <Wrappper>
                {/* /////////////////////register////////////////////// */}
                {/* labels */}
                <TextField onChange={onInputChange} name='name' id="standard-basic" label="Name" variant="standard" />
                <TextField onChange={onInputChange} name='username' id="standard-basic" label="Username" variant="standard" />
                <TextField onChange={onInputChange} name='password'id="standard-basic" label="Password" variant="standard" />

                {error && <Error>{error}</Error>}
                {/* buttons */}
                <SignUpButton onClick={signupUser} variant="outlined">Sign up</SignUpButton>
                <Text style={{textAlign:'center'}}>OR</Text>
                <LoginButton onClick={()=>setToggleAccount('login')} variant="contained">Already have an account</LoginButton>

              </Wrappper>
            )
          }
      </Box>

    </Component>
  )
}

export default Login



//for image
const Image=styled('img')({
  width:100,
  margin:'auto',
  display:'flex',
  padding:'50px 0 0'
})
//for outer layout
const Component=styled(Box)`
  width:400px;
  margin:auto;
  box-shadow:5px 2px 5px 2px rgba(0 0 0/0.6);
  margin-top:90px;
`// for image and textField layout
const Wrappper=styled(Box)`
  padding:25px 35px;
  display:flex;
  flex-direction:column;
  flex:1;
  &>div,&>button,&>p{
    margin-top:20px
  }
`//login button styling
const LoginButton=styled(Button)`
  background:#FB641B;
  color:#fff;
  height:48px;
  border-radius:6px
`//sign up button styling
const SignUpButton=styled(Button)`
  background:#fff;
  color:#2874f0;
  height:48px;
  border-radius:2px;
  box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`//OR styling
const Text=styled(Typography)`
  font-size:14px;
  color:#878787;
`//error styling
const Error=styled(Typography)`
  font-size:10px;
  color:#ff6161;
  line-height:0;
  margin-top:10px;
  font-weight:600
`