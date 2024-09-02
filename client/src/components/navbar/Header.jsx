import { AppBar, styled, Toolbar} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <Component>
        <Container>
            <Link to='/'>HOME</Link>
            <Link to='/about'>ABOUT</Link>
            <Link to='/contact'>CONTACT</Link>
            <Link to='/login'>LOGOUT</Link>
        </Container>
    </Component>
  )
}

const Component=styled(AppBar)`
    background:#FFFFFF;
    color:#000;
`
const Container=styled(Toolbar)`
    justify-content:center;
    &>a{
        padding:20px;
        text-decoration:none;
        color:#000;
    }
`

export default Header
