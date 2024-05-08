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

export default function AdminClient() {
    const [client, setClient] = useState([])
    const [input, setInput] = useState({})
    const [form, setForm] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)

    // ------ Get all client -------
    useEffect(() => {
        axios.get(url + 'client/clients').then(function (response) {
            setClient(response.data)
        }, function (error) {
            console.log(error)
        })
    }, [client])

    const columns = [
        { field: 'idCli', headerName: 'ID', headerClassName: 'super-app-theme--header', width: 70, headerAlign: 'center', },
        {
            field: 'avatar',
            headerName: 'Avatar',
            headerClassName: 'super-app-theme--header',
            width: 100,
            headerAlign: 'center',
            renderCell: (params) => {
                const src = `data:image/png;base64,${params.value}`
                return (
                    <IconButton sx={{ p: 0 }}>
                        <Avatar src={src} />
                    </IconButton>
                )
            },
        },
        { field: 'pseudo', headerName: 'Pseudo', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'mailCli', headerName: 'Email', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'adresse', headerName: 'Adresse', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'contact', headerName: 'Contact', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
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
                        <IconButton sx={{ p: 1, width: 'fit-content', height: 'fit-content' }} disabled={!row.acces} onClick={() => {
                            setInput(row)
                            setForm(true)
                        }}>
                            <Edit sx={{ color: '#ff9f00', }} />
                        </IconButton>

                        <IconButton sx={{ p: 1, width: 'fit-content', height: 'fit-content' }} disabled={!row.acces} onClick={() => {
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

    const rowUpdate = client.map(obj => {
        return { ...obj, avatar: obj.imgCli, id: obj.idCli, action: 'ok' }
    })

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const editClient = () => {
        var w = document.getElementById('warn')
        if (!input.pseudo || !input.mailCli || !input.adresse || !input.contact ) {
            w.style.display = 'inline'
        }else{
            w.style.display = 'none'
            const { avatar, id, action, role, ...reste } = input
            axios.put(url + 'client/clientsPut', reste).then(function (response) {
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

    const deleteClient = () => {
        if (input.idCli) {
            axios.delete(url + `client/clientsDelete/${input.idCli}`).then(function (response) {
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

    const rechercheClient = () => {
        const search = document.getElementById('search-client').value

        axios.get(url + `client/clientsRecherche/${search}`).then(function (response) {
            setClient(response.data)
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
                                <div id='menu-button' className='active'>
                                    <PersonOutlined id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Client</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/fournisseur'>
                                <div id='menu-button'>
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
                                <div id='menu-button'>
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
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Clients</Typography>
                        <div id='container-search'>
                            <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher des clients"
                                    inputProps={{ 'aria-label': 'recherche' }}
                                    id='search-client'
                                />
                                <IconButton onClick={rechercheClient} type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
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
                                        textAlign: 'center'
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
                            <Typography sx={{ color: '#ff7f00', textDecoration: 'underline', textUnderlineOffset: '5px', fontWeight: '500', fontSize: 30, marginLeft: '5%' }}>Modifier Client</Typography>
                        </div>

                        <div id='input'>
                            <PersonOutline style={{ color: 'gray' }} />
                            <input type="text" id='pseudo' name='pseudo' value={input.pseudo} onChange={handleChange} placeholder="Pseudo" />
                        </div>

                        <div id='input'>
                            <MailOutlineSharp style={{ color: 'gray' }} />
                            <input type="text" id='email' name='mailCli' value={input.mailCli} onChange={handleChange} placeholder="Email" />
                        </div>

                        <div id='input'>
                            <HomeOutlined style={{ color: 'gray' }} />
                            <input type="text" id='adresse' name='adresse' value={input.adresse} onChange={handleChange} placeholder="Adresse" />
                        </div>

                        <div id='input'>
                            <CallOutlined style={{ color: 'gray' }} />
                            <input type="text" id='contact' name='contact' value={input.contact} onChange={handleChange} placeholder="Contact" />
                        </div>
                        <span id='warn' style={{ display: 'none', color: '#ed1111', fontWeight: '500', marginTop: '2%', fontSize: 13 }}>*Veuillez remplir tous les champs</span>
                    </div>

                    <EditButton onClick={editClient}>Modifier</EditButton>
                </div>
            </div>}

            {modal && <Modals
                icon={<Cancel sx={{ color: '#ed1111', width: 60, height: 60 }} />}
                color={'#ed1111'}
                para1={`Voulez-vous vraiment supprimer le client '${input.pseudo}'?`}
                para2={'Vous ne pouvez plus annuler une fois valider'}
                button={'Supprimer'}
                close={() => setModal(false)}
                action={deleteClient}
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
                    para={"un problème est survenu lors de l'enregistrement"}
                    color={"#ed1111"}
                />
            }
        </>
    )
}