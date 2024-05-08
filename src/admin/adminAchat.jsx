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

export default function AdminAchat() {
    const [achat, setAchat] = useState([])

    // ------ Get all achat -------
    useEffect(() => {
        axios.get(url + 'achat/achatDashboard').then(function (response) {
            setAchat(response.data)
        }, function (error) {
            console.log(error)
        })
    }, [achat])

    const columns = [
        {
            field: 'client',
            headerName: 'Client',
            headerClassName: 'super-app-theme--header',
            width: 200,
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
        {
            field: 'fournisseur',
            headerName: 'Fournisseur',
            headerClassName: 'super-app-theme--header',
            width: 200,
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
        {
            field: 'produit',
            headerName: 'Produit',
            headerClassName: 'super-app-theme--header',
            width: 200,
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
        { field: 'qteAchat', headerName: 'Quantité', headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
        { field: 'dateAchat', headerName: `Date d'achat`, headerClassName: 'super-app-theme--header', width: 200, headerAlign: 'center', },
    ]

    const rowUpdate = achat.map((obj, index) => {
        return { ...obj, client: obj.imgCli, fournisseur: obj.imgFr, produit: obj.imgPro, id: index,}
    })

    const rechercheAchat = () => {
        const search = document.getElementById('search-achat').value

        axios.get(url + `achat/achatsRecherche/${search}`).then(function (response) {
            setAchat(response.data)
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
                                <div id='menu-button' >
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
                                <div id='menu-button' className='active'>
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
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Achats</Typography>
                        <div id='container-search'>
                            {/* <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher des achats"
                                    inputProps={{ 'aria-label': 'recherche' }}
                                    id='search-achat'
                                />
                                <IconButton onClick={rechercheAchat} type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                    <Search sx={{ color: "white" }} />
                                </IconButton>
                            </div> */}
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
        </>
    )
}