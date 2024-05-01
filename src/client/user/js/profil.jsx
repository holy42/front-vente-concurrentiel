import { React, useEffect, useRef, useState } from 'react'
import "../css/profil.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../image/logo2.png'
import titre from '../image/titre2.png'
import pdp from '../image/pdp.jpg'
import Modals from '../../../modal/modal'
import Snackbars from '../../../modal/snackbar'

import { Cancel, Help, CheckCircle, PersonOutline, History, ReportProblemOutlined, Logout, HomeOutlined, EditRounded } from '@mui/icons-material'

import { styled } from '@mui/material/styles';
import { InputAdornment, Box, InputLabel, OutlinedInput, Input, IconButton, FormHelperText, Avatar, Button } from '@mui/material'
import { Typography, TextField, FormControl } from '@mui/material'
import FilledInput from '@mui/material/FilledInput'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'

const url = 'http://localhost:8080/'

export default function Profil({ }) {
    const [showPassword, setShowPassword] = useState(false)
    const [input, setInput] = useState({
        idCli: 1,
        imgCli: pdp,
        pseudo: 'Holy',
        adresse: 'BP 122 Fianarantsoa',
        mailCli: 'holymanarivo@gmail.com',
        contact: '0344643461',
        mdpCli: '1234'
    })
    const [modal, setModal] = useState(false)
    const [suppression, setSuppression] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const history = useNavigate()
    const inputRef = useRef(null)

    // ou get client via bdd (plus pratique)
    // const location = useLocation()
    // const idCli = location.state.id
    //     useEffect(() => {
    //     axios.get(url+ `getUnClient/${idCli}`).then(function (response){
    //         setInput(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [input])

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    // -------------- Modifier client ----------------
    const editClient = () => {
        axios.put(url + 'clientsPut', input).then(function (response) {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        }, function (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

    // --------------- Supprimer client -------------
    const suppClient = () => {
        axios.delete(url + `clientsDelete/${input.idCli}`).then(function (response) {
            history('/login')
        }, function (error) {
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 5000)
        })
    }

    const verification = () => {
        var w = document.getElementById('warn')
        if(input.pseudo && input.mailCli && input.adresse && input.contact ) {
            setModal(true)
            w.style.display = 'none'
        }
        else {
            w.style.display = 'inline'
        }
    }

    const handleImgChange = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setInput({...input, imgCli: reader.result})
        }
        reader.readAsDataURL(file)
    }

    const importer = () => {
        inputRef.current.click()
    }

    return (
        <>
            <div id='profil-body'>
                <div id='profil-left'>
                    <div id='profil-logo'>
                        <div id='logo-container'>
                            <img src={logo} alt="logo" />
                            <img src={titre} alt="titre" />
                        </div>
                    </div>

                    <div id='profil-nav'>
                        <div id='nav-container'>

                            <Link id='link' to={{
                                        pathname: '/accueil',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button'>
                                    <HomeOutlined sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography sx={{ fontSize: 17, fontWeight: '500', }}>Accueil</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/profil',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button' className='active'>
                                    <PersonOutline sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography sx={{ fontSize: 17, fontWeight: '500', }}>Compte</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/historique',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button'>
                                    <History sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography sx={{ fontSize: 17, fontWeight: '500', }}>Historique</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/activite',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                    <ReportProblemOutlined sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography sx={{ fontSize: 17, fontWeight: '500', }}>Signaler un problème</Typography>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div id='profil-logout'>
                        <div id='nav-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                            <Logout sx={{ fontSize: 25, margin: 'auto' }} />
                            <Typography sx={{ fontSize: 17, fontWeight: '500', }}>Se déconnecter</Typography>
                        </div>
                    </div>
                </div >

                <div id='profil-right'>
                    <div id='compte-header'>
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%' }}>Mon Compte</Typography>
                    </div>
                    <div id='compte-container'>
                        <div id='compte-img'>
                            <Avatar src={input.imgCli} sx={{ height: 200, width: 200, marginTop: '10%', border: '2px solid rgb(238 238 238)', }} />
                            <Button onClick={importer}
                                startIcon={<EditRounded />}
                                sx={{
                                    color: '#ff7f00',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    marginTop: '0%',
                                }}
                            >
                                Modifier l'image
                            </Button>
                            <input type='file' accept='image/*' ref={inputRef} style={{display: 'none', }} onChange={handleImgChange} />
                        </div>

                        <form id='compte-form' action=''>
                            <div id='form-container'>
                                <div id='compte-input'>
                                    <TextField
                                        id="pseudo"
                                        label="Pseudo"
                                        value={input.pseudo}
                                        name="pseudo"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        // size="small"
                                        sx={{ backgroundColor: 'white', '&:focus': { outline: 'none', border: '2px solid #ff7f00' } }}
                                    />
                                </div>
                                <div id='compte-input'>
                                    <TextField
                                        id="adresse"
                                        label="Adresse"
                                        value={input.adresse}
                                        name="adresse"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        sx={{ backgroundColor: 'white', '&:focus': { outline: 'none', border: '2px solid #ff7f00' } }}
                                    // size="small"
                                    />
                                </div>
                                <div id='compte-input'>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        value={input.mailCli}
                                        name="mailCli"
                                        onChange={(e) => handleChange(e)}
                                        required
                                        sx={{ backgroundColor: 'white', '&:focus': { outline: 'none', border: '2px solid #ff7f00' } }}
                                    // size="small"
                                    />
                                </div>
                                <div id='compte-input'>
                                    <TextField
                                        id="contact"
                                        label="Contact"
                                        value={input.contact}
                                        name="contact"
                                        required
                                        onChange={(e) => handleChange(e)}
                                        sx={{ backgroundColor: 'white', '&:focus': { outline: 'none', border: '2px solid #ff7f00' } }}
                                    // size="small"
                                    />
                                </div>
                                {/* <FormControl sx={{ width: '100%', backgroundColor: 'white' }} variant="outlined">
                                    <OutlinedInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={input.mdpCli}
                                        name="mdpCli"
                                        required
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
                                    />
                                </FormControl> */}
                                <span id='warn' style={{ display: 'none', fontWeight: '500', color: '#ed1111', margin: 'auto' }}>*Veuillez remplir tous les champs</span>
                            </div>

                            <div id='form-btn'>
                                <Button onClick={verification}
                                    // startIcon={<EditRounded />}
                                    sx={{
                                        color: '#ff7f00',
                                        border: '2px solid #ff7f00',
                                        backgroundColor: 'white',
                                        borderRadius: '10px',
                                        marginTop: '0%',
                                        padding: '10px 0px',
                                        marginBottom: '20%',
                                        '&:hover': {
                                            backgroundColor: '#ff7f00',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Enregistrer les modifications
                                </Button>
                                <Button onClick={()=>setSuppression(true)}
                                    // startIcon={<EditRounded />}
                                    sx={{
                                        color: '#ed1111',
                                        backgroundColor: 'white',
                                        border: '2px solid',
                                        borderRadius: '10px',
                                        marginTop: '0%',
                                        padding: '10px 0px',
                                        marginBottom: '20%',
                                        '&:hover': {
                                            backgroundColor: '#ed1111',
                                            color: 'white',
                                        }
                                    }}
                                >
                                    Supprimer mon compte
                                </Button>
                            </div>
                        </form>

                        {/* <div id='compte-btn'>

                        </div> */}
                    </div>
                </div>
            </div >
            {modal && <Modals
                icon={<Help sx={{ color: '#0f7bd4', width: 60, height: 60 }} />}
                color={'#0f7bd4'}
                para1={`Voulez-vous vraiment modifier vos données?`}
                para2={'Vous pouvez encore les modifier plus tard'}
                button={'Valider'}
                close={() => setModal(false)}
                action={editClient}
            />}
            {suppression && <Modals
                icon={<Cancel sx={{ color: '#ed1111', width: 60, height: 60 }} />}
                color={'#ed1111'}
                para1={`Voulez-vous vraiment supprimer vos données?`}
                para2={'Vos données seront perdues. Cette action est irreversible'}
                button={'Supprimer'}
                close={() => setSuppression(false)}
                action={suppClient}
            />}
            {success &&
                <Snackbars
                    icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                    para={"Vos modifications ont été enregistrées avec succès"}
                    color={"#24cf0e"}
                />
            }
            {error &&
                <Snackbars
                    icon={<Cancel fontSize="inherit" sx={{ color: '#ed1111' }} />}
                    para={"un problème est survenu lors de l'enregistrement"}
                    color={"#ed1111"}
                />
            }
        </>
    )
}