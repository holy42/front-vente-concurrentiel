import { React, useState, useEffect } from 'react'
// import "./admin.css"
import "./exemple.css"
import { Link } from 'react-router-dom'
import logo from './image/logo2.png'
import titre from './image/titre2.png'
import V17 from './voiture/V17.png'
import pdp from './image/pdp.jpg'
import Snackbars from '../modal/snackbar'
import Modals from '../modal/modal'
import axios from 'axios'

import { Close, PersonOutlined, WidgetsOutlined, FactoryOutlined, Logout, LeaderboardOutlined, Search, Edit, Delete } from '@mui/icons-material'
import { PersonOutline, MailOutlineSharp, LockOutlined, HomeOutlined, CallOutlined, CheckCircle, Cancel, Help, ShoppingBagOutlined } from "@mui/icons-material"

import { styled } from '@mui/material/styles'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid'
import { frFR } from '@mui/x-data-grid/locales'
import { Box, InputBase, IconButton, Avatar, Button } from '@mui/material'
import { Typography, FormControl, Stack, Rating } from '@mui/material'

const url = 'http://localhost:8080/'

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        border: 'none',
        backgroundColor: 'rgb(245 245 245)',
        '&:hover': {
            backgroundColor: 'rgb(245 245 245)',
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    [`& .${gridClasses.row}.odd`]: {
        border: 'none',
        '&:hover': {
            backgroundColor: 'white',
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    border: 'none',
    textAlign: 'center'
}))

const EditButton = styled(Button)({
    padding: '10px 100px',
    border: '2px solid ',
    backgroundImage: 'linear-gradient( 80deg, #ed2645, #ff394b, #ff7f00, #ffd400)',
    borderColor: 'white',
    color: 'white',
    margin: 'auto',
    borderRadius: '999px',
    marginTop: '10px',
    '&:hover': {
        background: 'linear-gradient(225deg, #ed2645, #ff394b, #ff7f00, #ffd400)',
    },
})

export default function AdminFournisseur() {
    const [fournisseur, setFournisseur] = useState([])
    const [input, setInput] = useState({})
    const [form, setForm] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)

    // ------ Get all fournisseur -------
    useEffect(() => {
        axios.get(url + 'fournisseur/fournisseurs').then(function (response) {
            setFournisseur(response.data)
        }, function (error) {
            console.log(error)
        })
    }, [fournisseur])

    const columns = [
        { field: 'idFr', headerName: 'ID', headerClassName: 'super-app-theme--header', width: 70, headerAlign: 'center', },
        {
            field: 'avatar',
            headerName: 'Avatar',
            headerClassName: 'super-app-theme--header',
            width: 150,
            headerAlign: 'center',
            renderCell: (params) => {
                const src = `data:image/png;base64,${params.value}`
                return (
                    <IconButton sx={{ p: 0 }}>
                        <Avatar src={src} />
                    </IconButton>
                    // <img src={src} style={{ width: '80%', height: '70%', margin: 'auto' }} />
                )
            },
        },
        { field: 'nomFr', headerName: 'Nom', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'mailFr', headerName: 'Email', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'adresseFr', headerName: 'Adresse', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'contactFr', headerName: 'Contact', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        {
            field: 'action',
            headerName: 'Action',
            headerClassName: 'super-app-theme--header',
            width: 150,
            headerAlign: 'center',
            renderCell: (params) => {
                const row = params.row
                return (
                    <div style={{ display: 'grid', width: '100%', height: '100%', gridTemplateColumns: '50% 50%', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton sx={{ p: 1, width: 'fit-content', height: 'fit-content' }} disabled={row.accesFr} onClick={() => {
                            setInput(row)
                            setForm(true)
                        }}>
                            <Edit sx={{ color: '#ff9f00', }} />
                        </IconButton>

                        <IconButton sx={{ p: 1, width: 'fit-content', height: 'fit-content' }} disabled={!row.accesFr} onClick={() => {
                            setInput(row)
                            setModal(true)
                        }}>
                            <Delete sx={{ color: '#ed1111', }} />
                        </IconButton>

                    </div>
                )
            },
        },
    ]

    const rowUpdate = fournisseur.map(obj => {
        return { ...obj, avatar: obj.imgFr, id: obj.idFr, action: 'ok' }
    })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const editFournisseur = () => {
        var w = document.getElementById('warn')
        if (!input.nomFr || !input.mailFr || !input.adresseFr || !input.contactFr ) {
            w.style.display = 'inline'
        }else{
            w.style.display = 'none'
            const { avatar, id, action, role, ...reste } = input
            axios.put(url + 'fournisseur/fournisseursPut', reste).then(function (response) {
                setForm(false)
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
        }
    }

    const deleteFournisseur = () => {
        if (input.idFr) {
            axios.delete(url + `fournisseur/fournisseursDelete/${input.idFr}`).then(function (response) {
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
        }
    }

    const rechercheFournisseur = () => {
        const search = document.getElementById('search-fournisseur').value

        axios.get(url + `fournisseur/fournisseursRecherche/${search}`).then(function (response) {
            setFournisseur(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    return (
        <>
            <div id='admin-body'>
                <div id='admin-left'>

                    <div id='admin-menu'>
                        <div id='admin-logo'>
                            <div id='logo-container'>
                                <img src={logo} alt="logo" />
                                <img src={titre} alt="titre" />
                            </div>
                        </div>

                        <div id='menu-container'>
                            <Link id='link' to='/admin/client'>
                                <div id='menu-button'>
                                    <PersonOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Client</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/fournisseur'>
                                <div id='menu-button' className='active'>
                                    <FactoryOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Fournisseur</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/produit'>
                                <div id='menu-button'>
                                    <WidgetsOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Produit</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/achat'>
                                <div id='menu-button' >
                                    <ShoppingBagOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Achat</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/dashboard'>
                                <div id='menu-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                    <LeaderboardOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Dashboard</Typography>
                                </div>
                            </Link>
                        </div>

                        <div id='admin-logout'>
                            <div id='menu-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                <Logout id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Se déconnecter</Typography>
                            </div>
                        </div>
                    </div>

                </div>

                <div id='admin-right'>
                    <div id='admin-header'>
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Fournisseurs</Typography>
                        <div id='container-search'>
                            <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher des fournisseurs"
                                    inputProps={{ 'aria-label': 'recherche' }}
                                    id='search-fournisseur'
                                />
                                <IconButton onClick={rechercheFournisseur} type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                    <Search sx={{ color: "white" }} />
                                </IconButton>
                            </div>
                        </div>
                        <IconButton sx={{ p: 0, marginLeft: '20px' }}>
                            <Avatar src={pdp} />
                        </IconButton>
                    </div>

                    <div id='admin-container'>
                        <Box id='admin-tableau' sx={{ '& .super-app-theme--header': { color: 'rgb(38 38 38)', fontSize: 17, textAlign: 'center' } }}>
                            <StripedDataGrid
                                columns={columns}
                                rows={rowUpdate}
                                getRowClassName={(params) =>
                                    params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                                }
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 12,
                                        },
                                    },
                                }}
                                rowHeight={60}
                                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                sx={{
                                    '& .MuiDataGrid-cell': {
                                        textAlign: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }}
                            // slots={{ toolbar: GridToolbar }}
                            />
                        </Box>
                    </div>
                </div>
            </div>

            {form && <div id='admin-bg-form'>
                <div id='admin-form'>
                    <IconButton sx={{
                        position: 'absolute',
                        top: 7,
                        right: 7,
                        '&:hover': {
                            color: '#ed111127'
                        }
                    }}
                        onClick={() => setForm(false)}
                    >
                        <Close sx={{
                            color: 'gray',
                            '&:hover': {
                                color: 'red'
                            }
                        }}
                        />
                    </IconButton>

                    <div id="input-group">
                        <div style={{
                            width: '100%',
                            textAlign: 'center',
                            // backgroundImage: 'linear-gradient(#ed2645, #ff394b, #ff7f00, #ffd400)', 
                            backgroundClip: 'text',
                            marginTop: '2%',
                            marginBottom: '10%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}>
                            <Edit sx={{ color: '#ff7f00', fontSize: 30, }} />
                            <Typography sx={{ color: '#ff7f00', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: '500', fontSize: 28, marginLeft: '5%' }}>Modifier Fournisseur</Typography>
                        </div>

                        <div id='input'>
                            <FactoryOutlined style={{ color: 'gray' }} />
                            <input type="text" id='nomFr' name='nomFr' value={input.nomFr} onChange={handleChange} placeholder="Nom fournisseur" />
                        </div>

                        <div id='input'>
                            <MailOutlineSharp style={{ color: 'gray' }} />
                            <input type="text" id='email' name='mailFr' value={input.mailFr} onChange={handleChange} placeholder="Email" />
                        </div>

                        <div id='input'>
                            <HomeOutlined style={{ color: 'gray' }} />
                            <input type="text" id='adresse' name='adresseFr' value={input.adresseFr} onChange={handleChange} placeholder="Adresse" />
                        </div>

                        <div id='input'>
                            <CallOutlined style={{ color: 'gray' }} />
                            <input type="text" id='contact' name='contactFr' value={input.contactFr} onChange={handleChange} placeholder="Contact" />
                        </div>
                        <span id='warn' style={{ display: 'none', color: '#ed1111', fontWeight: '500', marginTop: '2%', fontSize: 13 }}>*Veuillez remplir tous les champs</span>
                    </div>

                    <EditButton onClick={editFournisseur}>Modifier</EditButton>
                </div>
            </div>}

            {modal && <Modals
                icon={<Cancel sx={{ color: '#ed1111', width: 60, height: 60 }} />}
                color={'#ed1111'}
                para1={`Voulez-vous vraiment supprimer le fournisseur '${input.nomFr}'?`}
                para2={'Vous ne pouvez plus annuler une fois valider'}
                button={'Supprimer'}
                close={() => setModal(false)}
                action={deleteFournisseur}
            />}
            {success &&
                <Snackbars
                    icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                    para={"L'opération a été effectuée avec succès"}
                    color={"#24cf0e"}
                />
            }
            {error &&
                <Snackbars
                    icon={<Cancel fontSize="inherit" sx={{ color: '#ed1111' }} />}
                    para={"Un problème est survenu lors de l'enregistrement"}
                    color={"#ed1111"}
                />
            }
        </>
    )
}