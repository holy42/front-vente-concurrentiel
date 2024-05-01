import { React, useEffect, useState } from 'react'
import "./dashboard.css"
import "./exemple.css"
import { Link } from 'react-router-dom'
import logo from './image/logo2.png'
import titre from './image/titre2.png'
import V17 from './voiture/V17.png'
import pdp from './image/pdp.jpg'
import Modals from '../modal/modal'
import Snackbars from '../modal/snackbar'

import { PieChart } from '@mui/x-charts/PieChart'
import { LineChart } from '@mui/x-charts/LineChart'

import { Delete, PersonOutlined, WidgetsOutlined, FactoryOutlined, Logout, LeaderboardOutlined, ShoppingBagOutlined, ChevronRight, ChevronLeft, Cancel, CheckCircle, } from '@mui/icons-material'

import { styled } from '@mui/material/styles'
import { IconButton, Avatar, Button } from '@mui/material'
import { Typography, FormControl, Select, Menu, MenuItem } from '@mui/material'
import axios from 'axios'

const url = 'http://localhost:8080/'

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        backgroundColor: 'transparent',
        // borderColor: 'white',
        borderRadius: '10px',
        outline: 'white',
        height: '10px',
        color: 'rgb(115 115 115)',
        fontSize: '0.85rem',
        width: '100%',
        '&:focus': {
            borderColor: '#ff7f00',
            outline: '#ff7f00'
        },
    },
}))

export default function AdminDashboard() {
    // const [data, setData] = useState({})  // -------------- Décommenter
    // const [rows, setRows] = useState({})
    // const [datas, setDatas] = useState({}) 
    const [page, setPage] = useState(1)
    const [tri, setTri] = useState('')
    const [modal, setModal] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [id, setId] = useState(null)
    const [produit, setProduit] = useState({})
    const [count, setCount] = useState({client: 0, fourni: 0, achat: 0, produit: 0})

    const data = [
        { label: 'Group A', value: 2400 },
        { label: 'Group B', value: 4567 },
        { label: 'Group C', value: 1398 },
        { label: 'Group D', value: 9800 },
        { label: 'Group E', value: 3908 },
        { label: 'Group F', value: 4800 },
    ]

    const rowDatas = [
        { idPro: 1, design: 'Audi V08-A55', nomFr: 'Audi', idFr: 1, imgPro: V17 },
        { idPro: 2, design: 'Velo V08-A57', nomFr: 'Velo', idFr: 2, imgPro: V17 },
        { idPro: 3, design: 'BMW V14-B55', nomFr: 'BMW', idFr: 3, imgPro: V17 },
        { idPro: 4, design: 'Samsung Galaxy', nomFr: 'Samsung', idFr: 4, imgPro: V17 },
        { idPro: 5, design: 'Table 16*16', nomFr: 'Table', idFr: 5, imgPro: V17 },
        { idPro: 6, design: 'Cable USB', nomFr: 'MSV', idFr: 6, imgPro: V17 },
        { idPro: 7, design: 'Cable ', nomFr: 'MSV', idFr: 6, imgPro: V17 },
        { idPro: 8, design: 'Cable', nomFr: 'MSV', idFr: 6, imgPro: V17 },
        { idPro: 9, design: 'Cable USB', nomFr: 'MSV', idFr: 6, imgPro: V17 },
        { idPro: 10, design: 'Cable USB', nomFr: 'MSV', idFr: 6, imgPro: V17 },
    ]

    const categ = ['Voiture', 'Meuble', 'Chaussure', 'Téléphone']

    const pieParams = { height: 230, width: 400, margin: { right: 100 } }

    // --------- Pagination -----------
    const elemPage = 7
    const totalPage = Math.ceil(rowDatas.length / elemPage)
    const start = (page - 1) * elemPage
    const end = start + elemPage
    const dataPage = rowDatas.slice(start, end)

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPage))
    }

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const handleChangeSelect = (event) => {
        setTri(event.target.value)
    }


    // ----------- Logique pour get les produits à effacer ------------------
    // useEffect(()=> {
    //     axios.get(url + '').then(function (response) {
    //         setRows(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [rows])

    // const rowDatas = Object.entries(rows).map(([key, value]) => ({ index: key, ...value, }))


    // ------------ Logique pour retirer les produits ------------------
    const deletePro = (id) => {
        setId(id)
        setModal(true)
    }

    const deleteProBdd = () => {
        // axios.delete(url + `produitsDelete/${id}`).then(function (response) {
        //     setId(null)
        //     setSuccess(true)
        //     setTimeout(() => {
        //         setSuccess(false)
        //     }, 5000)
        // }, function (error) {
        //     setError(true)
        //     setTimeout(() => {
        //         setError(false)
        //     }, 5000)
        //     console.log(error)
        // })
    }

    // ---------- décommenter -------------------
    // useEffect(() => {
    //     axios.get(url + 'produits').then(function (response) {
    //          setProduit(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [produit])

    // const produitDatas = Object.entries(produit).map(([key, value]) => ({ index: key, ...value, }))
    // const categ = [...new Set(data.map(obj => obj.categorie))]


    // -------------- Logique pour récupérer les 6 produits les plus vendus par catégorie avec leur nombre -------------
    // useEffect(() => {
    //     axios.get(url+`produitsPlusVenduCateg/${tri}`).then(function (response) {
    //         setData(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [data])


    // -------------- Logique pour les revenus des 6 derniers mois -----------------
    // useEffect(() => {
    //     axios.get(url+`produitsPlusVenduCateg/${tri}`).then(function (response) {
    //         setDatas(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [datas])

    // -------------- Logique pour les nb de clients -----------------
    // useEffect(() => {
    //     axios.get(url+`clientsNb`).then(function (response) {
    //         setCount({...count, client: response.data})
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [])

    // -------------- Logique pour les nb de fournisseurs -----------------
    // useEffect(() => {
    //     axios.get(url+`fournisseursNb`).then(function (response) {
    //         setCount({...count, fourni: response.data})
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [])

    // -------------- Logique pour les nb de produits -----------------
    // useEffect(() => {
    //     axios.get(url+`produitsNb`).then(function (response) {
    //         setCount({...count, produit: response.data})
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [])

    // -------------- Logique pour les nb de achats -----------------
    // useEffect(() => {
    //     axios.get(url+`achatsTotal`).then(function (response) {
    //         setCount({...count, achat: response.data})
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [])

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

                            <Link id='link' to='/admin/dashboard'>
                                <div id='menu-button' className='active' style={{ borderBottom: '2p x solid rgb (238, 238, 238)' }}>
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
                        <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Dashboard</Typography>

                        <div id='container-search'>
                            {/* <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Rechercher des clients"
                                    inputProps={{ 'aria-label': 'recherche' }}
                                />
                                <IconButton type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                    <Search sx={{ color: "white" }} />
                                </IconButton>
                            </div> */}
                        </div>

                        <IconButton sx={{ p: 0, ml: 2 }}>
                            <Avatar src={pdp} />
                        </IconButton>
                    </div>

                    <div id='admin-container-dash'>
                        <div id='admin-count'>
                            <div id='top-btn'>
                                <div id='button-menu' className='activatedClient'>
                                    <PersonOutlined sx={{ fontSize: 50, color: '#ffd400', marginLeft: '20%' }} />
                                    <div style={{ float: 'right' }}>
                                        <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Clients</Typography>
                                        <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ffd400', marginLeft: '2%', }}>125</Typography>
                                    </div>
                                </div>

                                <div id='button-menu' className='activatedFournisseur'>
                                    <FactoryOutlined sx={{ fontSize: 45, color: '#ed2645', marginLeft: '20%' }} />
                                    <div>
                                        <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Fournisseurs</Typography>
                                        <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ed2645', marginLeft: '2%', }}>125</Typography>
                                    </div>
                                </div>

                                <div id='button-menu' className='activatedProduit'>
                                    <WidgetsOutlined sx={{ fontSize: 45, color: '#ff7f00', marginLeft: '20%' }} />
                                    <div>
                                        <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Produits</Typography>
                                        <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#ff7f00', marginLeft: '2%', }}>125</Typography>
                                    </div>
                                </div>

                                <div id='button-menu' className='activatedDashboard'>
                                    <ShoppingBagOutlined sx={{ fontSize: 45, color: '#8311ed', marginLeft: '20%' }} />
                                    <div>
                                        <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '2%', }}>Achat</Typography>
                                        <Typography sx={{ fontSize: 22, fontWeight: '500', color: '#8311ed', marginLeft: '2%', }}>222</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='admin-bottom'>
                            <div id='admin-liste'>
                                <table id='liste-pro'>
                                    <thead>
                                        <tr>
                                            <th>
                                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>Image</Typography>
                                            </th>
                                            <th>
                                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>Produit</Typography>
                                            </th>
                                            <th>
                                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>Fournisseur</Typography>
                                            </th>
                                            <th>
                                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>Retiter</Typography>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataPage.map((item) => {
                                            return (
                                                <tr key={item.idPro}>
                                                    <td><img src={item.imgPro} alt='voiture' width={'70px'} height={'40px'} /></td>
                                                    <td>
                                                        <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>{item.design}</Typography>
                                                    </td>
                                                    <td>
                                                        <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>{item.nomFr}</Typography>
                                                    </td>
                                                    <td>
                                                        <IconButton onClick={() => deletePro(item.idPro)}>
                                                            <Delete sx={{ '&:hover': { color: '#ed1111' } }} />
                                                        </IconButton>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>

                                <div style={{ width: 'fit-content', marginLeft: 'auto', height: '100%' }}>
                                    <IconButton onClick={prevPage} type="button" sx={{ visibility: (totalPage > 1 && page === totalPage) ? 'visible' : 'hidden', p: '1', width: 'fit-content', backgroundColor: 'rgba(128,128,128,0.15)' }} aria-label="prev">
                                        <ChevronLeft sx={{ color: "rgb(38 38 38)" }} />
                                    </IconButton>

                                    <IconButton onClick={nextPage} type="button" sx={{ visibility: (totalPage > 1 && page === 1) ? 'visible' : 'hidden', p: '1', width: 'fit-content', backgroundColor: 'rgba(128,128,128,0.15)' }} aria-label="next">
                                        <ChevronRight sx={{ color: "rgb(38 38 38)" }} />
                                    </IconButton>

                                </div>
                            </div>
                            <div id='admin-graphe'>
                                <div style={{ width: '90%', position: 'relative', height: '95%', borderRadius: '10px', margin: 'auto', background: 'white', marginTop: '10px' }}>
                                    <Typography sx={{ fontSize: 17, position: 'absolute', top: 2, left: '50%', transform: 'translate(-50%)', fontWeight: '500', color: 'rgb(110 110 110)' }}>Revenu par mois</Typography>
                                    <LineChart
                                        xAxis={[
                                            {
                                                scaleType: 'point',
                                                data: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
                                                colorMap: {
                                                    type: 'continuous',
                                                    min: 0,
                                                    max: 5000,
                                                    color: ['#c51c53', '#6b2cf5']
                                                }
                                            }
                                        ]}
                                        yAxis={[
                                            {
                                                colorMap: {
                                                    type: 'continuous',
                                                    min: 0,
                                                    max: 5000,
                                                    color: ['#6b2cf5', '#c51c53']
                                                }
                                            }
                                        ]}
                                        series={[
                                            {
                                                data: [7000, 6000, 3500, 4000, 8000, 10000],
                                                area: true
                                            },
                                        ]}
                                        width={650}
                                        height={280}
                                        sx={{ ml: 6 }}
                                    />
                                </div>

                                <div style={{ width: '90%', display: 'grid', gridTemplateColumns: '30% 70%', position: 'relative', height: '95%', borderRadius: '10px', margin: 'auto', background: 'white', marginTop: '10px' }}>
                                    <FormControl size="small" sx={{ m: 1, width: '50%', height: '40px', float: 'right' }}>
                                        <StyledSelect
                                            sx={{}}
                                            value={tri}
                                            onChange={handleChangeSelect}
                                            displayEmpty
                                            label='Catégorie'
                                            inputProps={{ 'aria-label': 'sort' }}
                                            autoWidth
                                        >
                                            {categ.map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item} >{item}</MenuItem>
                                                )
                                            })}
                                        </StyledSelect>
                                    </FormControl>

                                    <PieChart
                                        series={[
                                            {
                                                data: data,
                                                innerRadius: 70,
                                                outerRadius: 93,
                                                paddingAngle: 3,
                                                cornerRadius: 2,
                                                startAngle: -180,
                                                endAngle: 180,
                                                highlightScope: { faded: 'global', highlighted: 'item' },
                                                faded: { innerRadius: 10, additionalRadius: -10, },
                                            },
                                        ]}
                                        {...pieParams}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {modal && <Modals
                icon={<Cancel sx={{ color: '#ed1111', width: 60, height: 60 }} />}
                color={'#ed1111'}
                para1={`Voulez-vous vraiment retirer ce produit ?`}
                para2={'Cette action est irreversible. Les données de ce produit seront perdues'}
                button={'Valider'}
                close={() => setModal(false)}
                action={deleteProBdd}
            />}
            {success &&
                <Snackbars
                    icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                    para={"Le produit a été supprimé avec succès"}
                    color={"#24cf0e"}
                />
            }
            {error &&
                <Snackbars
                    icon={<Cancel fontSize="inherit" sx={{ color: '#ed1111' }} />}
                    para={"un problème est survenu lors de la suppression"}
                    color={"#ed1111"}
                />
            }
        </>
    )
}