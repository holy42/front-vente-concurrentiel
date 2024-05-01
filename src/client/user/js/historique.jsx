import { React, useState } from 'react'
import "../css/historique.css"
import { Link, useLocation } from 'react-router-dom'
import logo from '../image/logo2.png'
import titre from '../image/titre2.png'
import V17 from '../../voiture/V17.png'
import pdp from '../image/pdp.jpg'

import CloseIcon from '@mui/icons-material/Close'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import HistoryIcon from '@mui/icons-material/History'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'

import { styled } from '@mui/material/styles'
import { DataGrid, gridClasses, GridToolbar, GridToolbarExport } from '@mui/x-data-grid'
import { frFR } from '@mui/x-data-grid/locales'
import { Box, Typography } from '@mui/material'
import axios from 'axios'

const url = 'http://localhost:8080/'

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
}))

export default function Historique() {
    // const [data, setData] = useState({})

    const rows = [
        { id: 1, Produit: 'Audi V08-A55', Compagnie: 'Audi', Prix: '10000000', Quantité: '4', Date: '11/04/2024' },
        { id: 2, Produit: 'Velo V08-A57', Compagnie: 'Velo', Prix: '1500000', Quantité: '2', Date: '11/04/2024' },
        { id: 3, Produit: 'BMW V14-B55', Compagnie: 'BMW', Prix: '1400000', Quantité: '1', Date: '11/04/2024' },
        { id: 4, Produit: 'Samsung Galaxy', Compagnie: 'Samsung', Prix: '200000', Quantité: '2', Date: '11/04/2024' },
        { id: 5, Produit: 'Table 16*16', Compagnie: 'Table', Prix: '107000', Quantité: '1', Date: '11/04/2024' },
        { id: 6, Produit: 'Cable USB', Compagnie: 'MSV', Prix: '30000', Quantité: '3', Date: '11/04/2024' },
    ]


    // ou get client via bdd (plus pratique)
    // const location = useLocation()
    // const idCli = location.state.id

    // useEffect(() => {
    //     axios.get(url + `achatsParClient/${idCli}`).then(function (response) {
    //         setData(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [data])

    return (
        <>
            <div id='historique-body'>
                <div id='historique-left'>
                    <div id='historique-logo'>
                        <div id='logo-box'>
                            <img src={logo} alt="logo" />
                            <img src={titre} alt="titre" />
                        </div>
                    </div>

                    <div id='historique-nav'>
                        <div id='nav-box'>

                            <Link id='link' to={{
                                        pathname: '/accueil',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button'>
                                    <HomeOutlinedIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Accueil</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                pathname: '/profil',
                                // state: {id: idCli} décommenter
                            }}>
                                <div id='nav-button'>
                                    <PersonOutlineIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Compte</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/historique',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button' className='active'>
                                    <HistoryIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Historique</Typography>
                                </div>
                            </Link>

                            <Link id='link' to={{
                                        pathname: '/activite',
                                        // state: {id: idCli} décommenter
                                    }}>
                                <div id='nav-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                                    <ReportProblemOutlinedIcon sx={{ fontSize: 25, margin: 'auto' }} />
                                    <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Signaler un problème</Typography>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div id='historique-logout'>
                        <div id='nav-button' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
                            <LogoutIcon sx={{ fontSize: 25, margin: 'auto' }} />
                            <Typography id='nav-titre' sx={{ fontSize: 17, fontWeight: '500', }}>Se déconnecter</Typography>
                        </div>
                    </div>
                </div >

                <div id='historique-right'>
                    <div id='historique-header'>
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Historique des achats</Typography>
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
                    <div id='historique-box'>
                        <div id='historique-entete'>
                            <div id='date-achat'>
                                <input type="month" name="avant" id="avant" />
                                <span>-</span>
                                <input type="month" name="apres" id="apres" />
                            </div>
                        </div>

                        <Box id='historique-tableau' sx={{ '& .super-app-theme--header': { color: '#ff7f00', fontSize: 17 } }}>
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
                </div>
            </div >
        </>
    )
}