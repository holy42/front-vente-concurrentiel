import React from "react"
import '@fontsource/roboto/500.css'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo2.png'
import titre from './titre2.png'
import axios from 'axios'

import { styled } from '@mui/material/styles'
import { Typography, Button } from '@mui/material'
import { MailOutlineSharp, LockOutlined } from "@mui/icons-material"

const SubButton = styled(Button)({
    padding: '10px 30px',
    border: '2px solid ',
    background: 'transparent',
    borderColor: '#ff7f00',
    color: '#ff7f00',
    margin: 'auto',
    borderRadius: '999px',
    marginTop: '10px',
    '&:hover': {
        background: '#ff7f00',
        border: '2px solid white',
        color: 'white',
        boxShadow: 'none',
    },
})

const LoginButton = styled(Button)({
    padding: '10px 30px',
    border: '2px solid ',
    backgroundImage: 'linear-gradient( 80deg, #ed2645, #ff394b, #ff7f00, #ffd400)',
    borderColor: 'white',
    color: 'white',
    margin: 'auto',
    borderRadius: '999px',
    marginTop: '0',
    '&:hover': {
        background: 'linear-gradient(225deg, #ed2645, #ff394b, #ff7f00, #ffd400)',
    },
})


export default function Login({ }) {
    const navigate = useNavigate()

    const isClient = () => {
        const mail = document.getElementById("email").value
        const password = document.getElementById("mdp").value
        
        var w = document.getElementById('warn')

        // if(mail && password) {
        //     w.style.display = 'none'
            
        // ------- Get login Client -------- 
        // axios.post('http://localhost:8092/auth/client/login', {mail, password}).then(function (response) {
        //     const {idCli} = response.data.idCli
        //     navigate('/accueil', {state: {id : idCli}})
        // }, function (error) {
        //     console.log(error)
        //     w.style.display = 'inline'
        // })
        // document.getElementById("email").value = ''
        // document.getElementById("mdp").value = ''

        // }
        // else {
        //     w.style.display = 'inline'
        // }

    }

    return (
        <>
            <div id='back'>
                <div id="container">

                    <div id='left'>
                        
                        {/* <Typography id='p'>Entrez vos données</Typography> */}
                        <div id='logo-login' style={{ marginTop: '30px',margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                            <img src={logo} alt="logo" width={'50px'} height={'55px'}/>
                            <img src={titre} alt="titre" width={'130px'} height={'55px'} style={{marginLeft: '5px'}}/>
                        </div>

                        <div id="input-group">
                            <div id='input'>
                                <MailOutlineSharp style={{ color: 'gray' }} />
                                <input type="text" id='email' placeholder="Email" />
                            </div>
                            <div id='input'>
                                <LockOutlined style={{ color: 'gray' }} />
                                <input type="password" id='password' placeholder="Mot de passe" />
                            </div>
                            <Typography id='warn' sx={{ display: 'none', color: '#ed1111', fontWeight: '500', marginTop: '2%', fontSize: 13 }}>*Entrez vos données correctement</Typography>
                        </div>

                        <Typography id='mdp'>Mot de passe oublié ?</Typography>

                        <LoginButton onClick={isClient}>Se connecter</LoginButton>
                    </div>

                    <div id='right'>
                    {/* position: 'absolute' , top: 5, left: 5, */}
                        <Typography sx={{ color: '#ff7f00', fontWeight: '700', marginTop: '15%', fontSize: 35 }}>Bienvenue !</Typography>
                        <Typography sx={{ color: 'gray', fontWeight: '500', marginBottom: '50%', fontSize: 15, width: '70%', margin: 'auto', height: 'fit-content' }}>
                            Inscrivez-vous si vous n'avez pas encore de compte !!
                        </Typography>
                        <Link to="/suscribe" id='link'>
                            <SubButton>
                                S'inscrire
                            </SubButton>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}