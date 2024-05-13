import { React, useState,useEffect } from 'react'
import "../css/activite.css"
import { Link, useLocation } from 'react-router-dom'
import logo from '../image/logo2.png'
import titre from '../image/titre2.png'
import V17 from '../../voiture/V17.png'
import pdp from '../image/pdp.jpg'
import axios from 'axios'
import Modals from '../../../modal/modal'
import Snackbars from '../../../modal/snackbar'

import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import HistoryIcon from '@mui/icons-material/History'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { CheckCircle, Cancel, Help } from "@mui/icons-material"

import { styled } from '@mui/material/styles'
import { DataGrid, gridClasses } from '@mui/x-data-grid'
import { Switch, Typography, IconButton, FormControlLabel, Avatar, Button } from '@mui/material'

const url = 'http://localhost:8080/'

export default function Activite() {
    const [input,setInput]=useState([])
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    // const [data, setData] = useState([]) 

    // ou get client via bdd (plus pratique)
    const location = useLocation()
    const idCli = location.state?.id || 4
        useEffect(() => {
        axios.get('http://localhost:8080/client/'+ `clients/${idCli}`).then(function (response){
            setInput(response.data)
        }, function (error) {
            console.log(error)
        })
    }, [input])

    
    

    const envoyerMail = () => {
        const texte = document.getElementById('text-mail').innerHTML
        // ------- Changer acces client
        axios.put('http://localhost:8080/client/' + `clientsAccesPut/${loading}/${idCli}`).then(function (response) {
            setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 5000)
            }, function (error) {
                setError(true)
                setTimeout(() => {
                    setError(false)
                }, 5000)
                console.log(error)
        })

        // ---- logique envoi mail ----
    }

    return (
        <>
            <div id='activite-body'>
                <div id='activite-left'>
                    <div id='activite-logo'>
                        <div id='logo-container'>
                            <img src={logo} alt="logo" />
                            <img src={titre} alt="titre" />
                        </div>
                    </div>

                    <div id='activite-nav'>
                        <div id='nav-container'>

                            <Link id='link' to={{
                                        pathname: '/accueil',
                                        state: {id: idCli} 
                                    }}>
                                <div id='nav-button'>
                                    <HomeOutlinedIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Accueil</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/profil',
                                        state: {id: idCli} 
                                    }}>
                                <div id='nav-button'>
                                    <PersonOutlineIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Compte</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/historique',
                                        state: {id: idCli} 
                                    }}>
                                <div id='nav-button'>
                                    <HistoryIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Historique</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/activite',
                                        state: {id: idCli} 
                                    }}>
                                <div id='nav-button' className='active' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                    <ReportProblemOutlinedIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Signaler un problème</Typography>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div id='activite-logout'>
                        <div id='nav-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                            <LogoutIcon sx={{ fontSize: 25, margin: 'auto' }} />
                            <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Se déconnecter</Typography>
                        </div>
                    </div>
                </div >

                <div id='activite-right'>
                    <div id='activite-header'>
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Signaler un problème</Typography>
                        {/* <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Rechercher des produits"
                                inputProps={{ 'aria-label': 'recherche' }}
                            />
                            <IconButton type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                <SearchIcon sx={{ color: "white" }} />
                            </IconButton>
                        </div> */}
                    </div>
                    <div id='activite-container'>
                        <div id='activite-page'>
                            <Typography></Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)', width: '80%', marginLeft: '10%' }}>
                                Si vous rencontrez un problème concernant votre compte ou un problème pendant votre navigation ou si vous avez besoin d'assistance, veuillez nous contacter en cliquant sur le bouton en dessous pour nous envoyer un email.
                            </Typography>
                            <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)', width: '80%', marginLeft: '10%' }}>
                                Assurez-vous d'autoriser l'accès à votre compte. Notre équipe administrative prendra en charge votre demande dans les plus brefs délais. Merci pour votre coopération.
                            </Typography>
                            <FormControlLabel
                                sx={{
                                    display: 'block', width: '80%', marginLeft: '10%',
                                }}
                                control={
                                    <Switch
                                        checked={loading}
                                        onChange={() => setLoading(!loading)}
                                        name="loading"
                                        color="primary"
                                    />
                                }
                                label="Autoriser l'accès"
                            />

                            <div id='email-para'>
                                <p contentEditable="true" id='text-mail'></p>
                            </div>

                            <Button onClick={envoyerMail}
                                startIcon={<ForwardToInboxIcon />}
                                sx={{
                                    border: '1px solid',
                                    color: '#ff7f00',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    marginTop: '0%', width: 'fit-content', marginLeft: '10%'
                                }}
                            >
                                Envoyer un email
                            </Button>
                        </div>
                    </div>
                </div>
            </div >

            {success &&
                <Snackbars
                    icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                    para={"L'email a été envoyé avec succès"}
                    color={"#24cf0e"}
                />
            }
            {error &&
                <Snackbars
                    icon={<Cancel fontSize="inherit" sx={{ color: '#ed1111' }} />}
                    para={"un problème est survenu lors de l'envoi"}
                    color={"#ed1111"}
                />
            }
        </>
    )
}