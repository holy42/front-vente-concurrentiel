import { React, useState } from "react"
import './suscribe.css'
import '@fontsource/roboto/500.css'
import { PersonOutline, MailOutlineSharp, LockOutlined, HomeOutlined, CallOutlined, East, ChevronLeft } from "@mui/icons-material"
import { Link, useNavigate } from 'react-router-dom'
import logo from './logo2.png'
import titre from './titre2.png'
import axios from 'axios'

import { styled } from '@mui/material/styles';
import { Typography, Button, IconButton } from '@mui/material'

const LoginButton = styled(Button)({
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

const SubButton = styled(Button)({
    padding: '12px 30px',
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

export default function Suscribe({ }) {
    const [confirm, setConfirm] = useState(false)
    const [input, setInput] = useState({pseudo: '', contact: '', adresse: '', mailCli: '', pswd: '', mdpCli: ''})
    const navigate = useNavigate()

    const verification = () => {
        var w = document.getElementById('warn')

        if (input.contact && input.adresse && input.pseudo) {
            setConfirm(true)
            w.style.display = 'none'
        } else {
            w.style.display = 'inline'
        }
    }

    const handleChange = (e) => {
        setInput({...input, [e.target.name] : e.target.value})
    }

    // ----------- Ajout client ---------
    const ajoutClient = () => {
        var w = document.getElementById('warn2')
        console.log(input)


        if (input.mdpCli !== input.pswd) {
            w.style.display = 'inline'
            w.innerHTML = '*Le deuxième mot de passe ne correspond pas au premier'
        }else if (input.contact && input.adresse && input.pseudo && input.mailCli && input.mdpCli && input.pswd) {
            w.style.display = 'none'

            axios.post('http://localhost:8080/clientsPost', input).then(function (response) {
                const {idCli} = response.data.idCli
                navigate('/accueil', {state: {id : idCli}})
            }, function (error) {
                console.log(error)
            })
            setInput({pseudo: '', contact: '', adreese: '', mailCli: '', pswd: '', mdpCli: ''})
        }else {
            w.style.display= 'inline'
            w.innerHTML = '*Veuillez remplir les champs correctements'
        }

    }

    return (
        <>
            <div id='back'>
                <div id="container-sus">
                    <div id='leftSus'>
                        <Typography sx={{ color: '#ff7f00', fontWeight: '700', marginTop: '15%', fontSize: 35 }}>Bienvenue !</Typography>
                        <Typography sx={{ color: 'gray', fontWeight: '500', marginBottom: '50%', fontSize: 15, width: '70%', margin: 'auto', height: 'fit-content' }}>
                            Connectez-vous si vous avez déja un compte !!
                        </Typography>
                        <Link to="/login" id='link'>
                            <LoginButton>
                                Se connecter
                            </LoginButton>
                        </Link>
                    </div>

                    {!confirm && <div id='rightSus'>
                        {/* <Typography id='p'>Créer un Compte</Typography> */}
                        <div id='logo-login' style={{ marginTop: '30px', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={logo} alt="logo" width={'50px'} height={'55px'} />
                            <img src={titre} alt="titre" width={'130px'} height={'55px'} style={{ marginLeft: '5px' }} />
                        </div>

                        <div id="input-group">
                            <div id='input'>
                                < PersonOutline style={{ color: 'gray' }} />
                                <input id='pseudo' name='pseudo' onChange={handleChange} value={input.pseudo} type="text" placeholder="Pseudo" />
                            </div>
                            <div id='input'>
                                <HomeOutlined style={{ color: 'gray' }} />
                                <input id='adresse' name='adresse' onChange={handleChange} value={input.adresse}  type="text" placeholder="Adresse" />
                            </div>
                            <div id='input'>
                                <CallOutlined style={{ color: 'gray' }} />
                                <input id='contact' name='contact' onChange={handleChange} value={input.contact}  type="text" placeholder="Contact" />
                            </div>

                        </div>
                        <span id='warn' style={{ display: 'none', color: '#ed1111', fontWeight: '500', marginTop: '2%', }}>*Veuillez remplir tous les champs</span>

                        <SubButton onClick={verification} endIcon={<East sx={{ fontSize: 35, ml: 1 }} />}>Suivant</SubButton>
                    </div>}

                    {confirm && <div id='rightSus'>
                        {/* <Typography id='p'>Créer un Compte</Typography> */}
                        <IconButton onClick={()=>setConfirm(false)} sx={{ position: 'absolute', top: 5, left: 5, background: 'rgba(128,128,128,0.1)' }}>
                            <ChevronLeft sx={{
                                color: 'gray',
                                // '&:hover': {
                                //     color: 'red'
                                // }
                            }}
                            />
                        </IconButton>


                        <div id='logo-login' style={{ marginTop: '30px', margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <img src={logo} alt="logo" width={'50px'} height={'55px'} />
                            <img src={titre} alt="titre" width={'130px'} height={'55px'} style={{ marginLeft: '5px' }} />
                        </div>

                        <div id="input-group">
                            <div id='input'>
                                <MailOutlineSharp style={{ color: 'gray' }} />
                                <input id='mailCli' name='mailCli' onChange={handleChange} value={input.mailCli}  type="text" placeholder="Email" />
                            </div>
                            <div id='input'>
                                <LockOutlined style={{ color: 'gray' }} />
                                <input id='pswd' name='pswd' onChange={handleChange} value={input.pswd}  type="password" placeholder="Mot de passe" />
                            </div>
                            <div id='input' style={{ marginTop: '30px' }}>
                                <LockOutlined style={{ color: 'gray' }} />
                                <input id='mdpCli' name='mdpCli' onChange={handleChange} value={input.mdpCli}  type="password" placeholder="Confirmer votre mot de passe" />
                            </div>

                        </div>
                        <span id='warn2' style={{ display: 'none', color: '#ed1111', fontWeight: '500', marginTop: '2%'}}></span>

                        <SubButton onClick={ajoutClient}>S'inscrire</SubButton>
                    </div>}
                </div>
            </div>
        </>
    )
}