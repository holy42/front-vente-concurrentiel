import { React, useState } from 'react'
// import "./admin.css"
import "./exemple.css"
import { Link } from 'react-router-dom'
import logo from './image/logo2.png'
import titre from './image/titre2.png'
import V17 from './voiture/V17.png'
import pdp from './image/pdp.jpg'

import CloseIcon from '@mui/icons-material/Close'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined'
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined'
import SearchIcon from '@mui/icons-material/Search'

import { styled } from '@mui/material/styles'
import { DataGrid, gridClasses, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { frFR } from '@mui/x-data-grid/locales'
import { Checkbox, Box, Slider, Paper, InputBase, IconButton, Badge, Avatar, Button } from '@mui/material'
import { MenuItem, Menu, Typography, Tooltip, TextField, FormControl, Stack, Rating, Pagination, } from '@mui/material'

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        border: 'none',
        backgroundColor: 'rgb(245 245 245)',
        '&:hover': {
            backgroundColor: 'rgb(232 232 232)',
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    [`& .${gridClasses.row}.odd`]: {
        border: 'none',
        '&:hover': {
            backgroundColor: 'rgb(232 232 232)',
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
    },
    border: 'none',
    textAlign: 'center'
}));

export default function AdminClient() {
    // const [data, setData] = useSstate({})

    const rows = [
        { id: 1, Produit: 'Audi V08-A55', Compagnie: 'Audi', Prix: '10000000', Quantité: '4', Date: '11/04/2024' },
        { id: 2, Produit: 'Velo V08-A57', Compagnie: 'Velo', Prix: '1500000', Quantité: '2', Date: '11/04/2024' },
        { id: 3, Produit: 'BMW V14-B55', Compagnie: 'BMW', Prix: '1400000', Quantité: '1', Date: '11/04/2024' },
        { id: 4, Produit: 'Samsung Galaxy', Compagnie: 'Samsung', Prix: '200000', Quantité: '2', Date: '11/04/2024' },
        { id: 5, Produit: 'Table 16*16', Compagnie: 'Table', Prix: '107000', Quantité: '1', Date: '11/04/2024' },
        { id: 6, Produit: 'Cable USB', Compagnie: 'MSV', Prix: '30000', Quantité: '3', Date: '11/04/2024' },
    ]

    return (
        <>
            {/* <div id='admin-body'>
                <div id='admin-header'>
                    <div id='admin-logo'>
                        <div id='logo-container'>
                            <img src={logo} alt="logo" />
                            <img src={titre} alt="titre" />
                        </div>
                    </div>
                    <Typography sx={{ fontSize: 25, fontWeight: '500', color: '#ff7f00', marginLeft: '2%', }}>Page Admin</Typography>
                </div>
                <div id='admin-container'>
                    <div id='button-group'>
                        <div id='button-menu' className='activatedClient'>
                            <PersonOutlinedIcon sx={{ fontSize: 50, color: '#ffd400', marginLeft: '20%' }} />
                            <div style={{ float: 'right' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Clients</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ffd400', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedFournisseur'>
                            <FactoryOutlinedIcon sx={{ fontSize: 45, color: '#ed2645', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Fournisseurs</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ed2645', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedProduit'>
                            <WidgetsOutlinedIcon sx={{ fontSize: 45, color: '#ff7f00', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Produits</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ff7f00', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedDashboard'>
                            <LeaderboardOutlinedIcon sx={{ fontSize: 45, color: '#8311ed', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 18, fontWeight: '500', color: '#8311ed', marginLeft: '2%', }}>Dashboard</Typography>
                                <Typography sx={{ fontSize: 20, fontWeight: '500', color: '#8311ed', marginLeft: '2%', }}></Typography>
                            </div>
                        </div>

                    </div>
                    <Box id='admin-tableau' sx={{ '& .super-app-theme--header': { color: '#ff7f00', fontSize: 17 } }}>
                        <StripedDataGrid
                            columns={[
                                { field: 'Produit', headerClassName: 'super-app-theme--header', width: 200, },
                                { field: 'Compagnie', headerClassName: 'super-app-theme--header', width: 200 },
                                { field: 'Prix', headerClassName: 'super-app-theme--header', width: 200 },
                                { field: 'Quantité', headerClassName: 'super-app-theme--header', width: 200 },
                                { field: 'Date', headerClassName: 'super-app-theme--header', width: 200 }
                            ]}
                            rows={rows}
                            getRowClassName={(params) =>
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 8,
                                    },
                                },
                            }}
                            localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                            slots={{ toolbar: GridToolbar }}
                        // slotProps={{ toolbar: { printOptions: { hideFooter: true, hideToolbar: true } } }}
                        />
                    </Box>
                </div>
            </div> */}

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
                                    <PersonOutlinedIcon id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Client</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/fournisseur'>
                                <div id='menu-button'>
                                    <FactoryOutlinedIcon id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Fournisseur</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/produit'>
                                <div id='menu-button'>
                                    <WidgetsOutlinedIcon id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Produit</Typography>
                                </div>
                            </Link>

                            <Link id='link' to='/admin/dashboard'>
                                <div id='menu-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                    <LeaderboardOutlinedIcon id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='menu-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Dashboard</Typography>
                                </div>
                            </Link>
                        </div>

                        <div id='admin-logout'>
                            <div id='menu-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                <LogoutIcon id='menu-icon' sx={{ fontSize: 25, margin: 'auto' }} />
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
                                />
                                <IconButton type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                    <SearchIcon sx={{ color: "white" }} />
                                </IconButton>
                            </div>
                        </div>
                        <IconButton sx={{ p: 0, marginLeft: '20px' }}>
                            <Avatar src={pdp} />
                        </IconButton>
                    </div>
                    <div id='admin-container'>


                        <Box id='admin-tableau' sx={{ '& .super-app-theme--header': { color: '#ff7f00', fontSize: 17 } }}>
                            <StripedDataGrid
                                columns={[
                                    { field: 'Produit', headerClassName: 'super-app-theme--header', width: 200, },
                                    { field: 'Compagnie', headerClassName: 'super-app-theme--header', width: 200 },
                                    { field: 'Prix', headerClassName: 'super-app-theme--header', width: 200 },
                                    { field: 'Quantité', headerClassName: 'super-app-theme--header', width: 200 },
                                    { field: 'Date', headerClassName: 'super-app-theme--header', width: 200 }
                                ]}
                                rows={rows}
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
                                localeText={frFR.components.MuiDataGrid.defaultProps.localeText}
                                slots={{ toolbar: GridToolbar }}
                            // slotProps={{ toolbar: { printOptions: { hideFooter: true, hideToolbar: true } } }}
                            />
                        </Box>
                    </div>
                    {/* <div id='button-group'>
                        <div id='button-menu' className='activatedClient'>
                            <PersonOutlinedIcon sx={{ fontSize: 50, color: '#ffd400', marginLeft: '20%' }} />
                            <div style={{ float: 'right' }}>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Clients</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ffd400', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedFournisseur'>
                            <FactoryOutlinedIcon sx={{ fontSize: 45, color: '#ed2645', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Fournisseurs</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ed2645', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedProduit'>
                            <WidgetsOutlinedIcon sx={{ fontSize: 45, color: '#ff7f00', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Produits</Typography>
                                <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ff7f00', marginLeft: '2%', }}>125</Typography>
                            </div>
                        </div>

                        <div id='button-menu' className='activatedDashboard'>
                            <LeaderboardOutlinedIcon sx={{ fontSize: 45, color: '#8311ed', marginLeft: '20%' }} />
                            <div>
                                <Typography sx={{ fontSize: 18, fontWeight: '500', color: '#8311ed', marginLeft: '2%', }}>Dashboard</Typography>
                                <Typography sx={{ fontSize: 20, fontWeight: '500', color: '#8311ed', marginLeft: '2%', }}></Typography>
                            </div>
                        </div>

                    </div> */}
                </div>
            </div>

        </>
    )
}