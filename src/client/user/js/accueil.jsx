import { React, useState, useEffect } from 'react'
import "../css/accueil.css"
import logo from '../image/logo2.png'
import titre from '../image/titre2.png'
import V17 from '../../voiture/V17.png'
import pdp from '../image/pdp.jpg'
import { Link, useLocation } from 'react-router-dom'
import BoxProduit from './boxProduit'
import Panier from './panier'
import Snackbars from '../../../modal/snackbar'
import Modals from '../../../modal/modal'

import axios from 'axios'
import { Search, ShoppingCartCheckout, AddShoppingCart, Warning, CheckCircle, Cancel, MoreVert } from '@mui/icons-material'
import { styled } from '@mui/material/styles';
import { Checkbox, Box, InputBase, IconButton, Badge, Avatar, Button, Rating, Pagination, } from '@mui/material'
import { MenuItem, Menu, Typography, Tooltip, Select, FormControl, TextField, Stack, } from '@mui/material'

const url = 'http://localhost:8080/'

const AddCartButton = styled(Button)({
    padding: '12px 10px',
    border: '1px solid',
    backgroundClip: 'text',
    color: 'transparent',
    backgroundImage: 'linear-gradient( #ed2645, #ff394b, #ff7f00, #ffd400)',
    borderColor: 'transparent',
    fontWeight: '600',
    margin: 'auto',
    '&:hover': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
})

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        //   top: 13,
        //   border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
        backgroundColor: '#ed1111',
        color: 'white'
    },
}))

const StyledSelect = styled(Select)(({ theme }) => ({
    '& .MuiSelect-select': {
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: '10px',
        outline: 'white',
        height: '10px',
        color: 'rgb(115 115 115)',
        fontSize: '0.85rem',
        '&:focus': {
            borderColor: '#ff7f00',
            outline: '#ff7f00'
        },
    },
}))

function CheckFilter({ value, change, checked }) {
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '10% 85%', gap: '5%', alignItems: 'center' }}>
                <Checkbox size='small' sx={{ color: "gray", '&.Mui-checked': { color: "#ff7f00" }, }} onChange={change} checked={checked.indexOf(value) !== -1} />
                <Typography>{value}</Typography>
            </div>
        </>
    )
}

function CardProduit({ show, addData, data }) {

    return (
        <>
            <div id='card-pro' >
                <div id='card-img' onClick={show}>
                    <img src={V17} alt="voiture" />
                    {/* <Checkbox size='small' onChange={change} sx={{ color: "gray", position: 'absolute', top: 0, right: 0, '&.Mui-checked': { color: "#ff7f00" }, }} /> */}
                </div>
                <div id='card-nom' onClick={show}>
                    <Typography sx={{ fontWeight: '600', fontSize: '1.1rem', color: 'rgb(38 38 38)' }}>{data.design}</Typography>
                </div>
                <div id='card-comp' onClick={show}>
                    <Typography sx={{ fontWeight: '500', color: 'rgb(115, 115, 115)' }}>Stock : {data.qte}</Typography>
                </div>
                <div id='card-review' onClick={show}>
                    <Stack spacing={1}>
                        <Rating name="half-rating-read" defaultValue={data.vote} precision={0.5} readOnly />
                    </Stack>
                    <Typography sx={{ color: 'rgb(130, 130, 130' }}>{data.vote}</Typography>
                </div>
                <div id='card-prix'>
                    <Typography sx={{ fontWeight: '600', fontSize: '1.25rem', color: 'rgb(38 38 38)' }}>Ar {data.prix}</Typography>
                    <IconButton onClick={addData} sx={{ position: 'absolute', top: 2, right: 15, p: 0 }}>
                        <AddShoppingCart sx={{ fontSize: 35, color: "#ff7f00", '&:hover': { color: "#ff5f00" }, }} />
                    </IconButton>
                </div>
            </div>
        </>
    )
}

const data = [
    { idPro: 1, idFr: 1, design: 'Audi V08-A50', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1000000, qte: 4, categorie: 'voiture', nbClic: 2, imgPro: '', avis: 20, vote: 3.5, date: '2024-01-11' },
    { idPro: 2, idFr: 2, design: 'Audi V08-A51', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1100000, qte: 4, categorie: 'velo', nbClic: 2, imgPro: '', avis: 20, vote: 4.5, date: '2024-02-11' },
    { idPro: 3, idFr: 3, design: 'Audi V08-A55', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1200000, qte: 4, categorie: 'table', nbClic: 2, imgPro: '', avis: 20, vote: 4, date: '2024-03-11' },
    { idPro: 4, idFr: 4, design: 'Audi V08-A53', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1300000, qte: 4, categorie: 'vêtement', nbClic: 2, imgPro: '', avis: 20, vote: 4.5, date: '2024-04-11' },
    { idPro: 5, idFr: 5, design: 'Audi V08-A50', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1400000, qte: 4, categorie: 'voiture', nbClic: 2, imgPro: '', avis: 20, vote: 3, date: '2024-05-11' },
    { idPro: 6, idFr: 6, design: 'Audi V08-A50', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1500000, qte: 4, categorie: 'velo', nbClic: 2, imgPro: '', avis: 20, vote: 3.5, date: '2024-06-11' },
    { idPro: 7, idFr: 7, design: 'Audi V08-A50', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1600000, qte: 4, categorie: 'ordinateur', nbClic: 2, imgPro: '', avis: 20, vote: 4.5, date: '2024-07-11' },
    { idPro: 8, idFr: 8, design: 'Audi V08-A51', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1700000, qte: 4, categorie: 'voiture', nbClic: 2, imgPro: '', avis: 20, vote: 2.5, date: '2024-08-11' },
    { idPro: 9, idFr: 9, design: 'Audi V08-A50', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1800000, qte: 4, categorie: 'table', nbClic: 2, imgPro: '', avis: 20, vote: 3, date: '2024-09-11' },
    { idPro: 10, idFr: 10, design: 'Audi V08-A51', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 1900000, qte: 4, categorie: 'vêtement', nbClic: 2, imgPro: '', avis: 20, vote: 4, date: '2024-10-11' },
    { idPro: 11, idFr: 11, design: 'Audi V08-A60', descri: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit', prix: 11000000, qte: 4, categorie: 'voiture', nbClic: 2, imgPro: '', avis: 20, vote: 4.5, date: '2024-11-11' },
]

export default function Accueil({ }) {
    // const [data, setData] = useState({})  // ---------- A décommenter
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [tri, setTri] = useState('')
    const [boxPro, setBoxPro] = useState(false)
    const [boxPanier, setBoxPanier] = useState(false)
    const [checked, setChecked] = useState([])
    const [boxData, setBoxData] = useState({})
    const [panierData, setPanierData] = useState([])
    const [alertDoubleData, setAlertDoubleData] = useState(false)
    const [dates, setDates] = useState({ debut: '', fin: '' })
    const [produits, setProduits] = useState([])
    const [prix, setPrix] = useState({ min: 0, max: 0 })
    const [page, setPage] = useState(1)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)


    // ------ Get all produit à décommenter ------

    const location = useLocation()
    const idCli = location.state?.id || 0
    // useEffect(() => {
    //     axios.get(url + 'produits').then(function (response) {
    //          setData(response.data)
    //     }, function (error) {
    //         console.log(error)
    //     })
    // }, [data])

    const produitsDatas = Object.entries(data).map(([key, value]) => ({ index: key, ...value, }))

    useEffect(() => {
        setProduits(produitsDatas)
    }, [data])

    useEffect(() => {
        const prixP = produitsDatas.map(item => item.prix)
        let p = { min: Math.min(...prixP), max: Math.max(...prixP) }
        setPrix(p)
    }, [])

    const categ = [...new Set(data.map(obj => obj.categorie))]

    // ------- Tri select change -------
    const handleChangeSelect = (event) => {
        setTri(event.target.value)
    }

    const settings = ['Aide', 'Se déconnecter']

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    // -------- Ouvre More btn en haut à droite du header -------
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    // -------- Ferme More btn en haut à droite du header -------
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    // ------- Checkbox filtre tableau --------
    const handleToggle = (value) => {
        const currentIndex = checked.indexOf(value)
        const newChecked = [...checked]

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked)
        handleCategorieChange(newChecked)
    }

    // ------- date de sortie ---------
    const handleDate = (e) => {
        let object = dates
        object[e.target.name] = e.target.value
        setDates(object)
        handleDateChange(formatDate(object.debut), formatDate(object.fin))
    }
    const handleDateChange = (debut, fin) => {
        const newData = produitsDatas.filter((item) => {
            return item.date >= debut && item.date <= fin
        })
        setProduits(newData)
        // console.log(newData)
    }
    const formatDate = (val) => {
        const [y, m] = val.split('-')
        const date = new Date(y, parseInt(m, 10) - 1)
        const fDate = date.toISOString().split('T')[0]
        return fDate
    }

    // ------- Filtre prix ----------
    const handlePrix = (e) => {
        let object = prix
        // let r = Math.round(parseInt(e.target.value, 10) / 1000) * 1000
        object[e.target.name] = parseInt(e.target.value, 10) + 1000
        setPrix(object)
        handlePrixChange(object)
    }
    const handlePrixChange = (obj) => {
        const newData = produitsDatas.filter((item) => {
            return item.prix >= obj.min && item.prix <= obj.max
        })
        setProduits(newData)
        // console.log(newData)
    }

    // ------- Filtre catégorie --------
    const handleCategorieChange = (select) => {
        if (select.length === 0) {
            setProduits(produitsDatas)
        } else {
            const newData = produitsDatas.filter((item) => select.includes(item.categorie))
            setProduits(newData)
        }
    }

    const boxDisplay = (display, boite) => {
        let data = showBox
        data[boite] = display
        setshowBox(data)
    }

    // -------- Ouvre le box détail du produit --------
    const showBoxProduit = (val) => {
        // boxDisplay(true, 'boxPro')
        setBoxPro(true)
        setBoxData(val)
    }

    // -------- Ferme le box détail du produit ---------
    const closeBoxPro = () => {
        setBoxData({})
        setBoxPro(false)
    }

    // ------- Ajoute les produits au panier ---------
    const addPanierData = (id, nb) => {
        const existe = panierData.some(item => item.idPro === id)
        if (existe) {
            setAlertDoubleData(true)
            setTimeout(() => {
                setAlertDoubleData(false)
            }, 5000)
        } else {
            const data = produitsDatas.find(p => p.idPro === id)
            const newData = { ...data }
            newData['count'] = nb
            // console.log(newData)
            setPanierData([...panierData, newData])
        }
    }

    // -------- Màj du panier ------------
    const updatePanierData = (id, nb) => {
        const update = panierData.map((item) => {
            if (item.idPro === id) return { ...item, count: nb }
            else return item
        })
        setPanierData(update)
    }

    // ------- Retire les produit du panier --------
    const removePanierData = (id) => {
        const newData = panierData.filter(p => p.idPro !== id)
        setPanierData(newData)
    }

    // ------- Recherche ----------
    const handleRecherche = () => {
        const search = document.getElementById('search-produit').value
        // if (search.length === 0) {
        //     setProduits(produitsDatas)
        // } else {
        //     const newData = produitsDatas.filter((item) => { return item.design.toLowerCase().includes(search.toLowerCase())})
        //     setProduits(newData)
        //     console.log(newData)
        // }

        // A Décommenter
        // axios.get(url + `produitsRecherche/${search}`).then(function (response) {
        //     setProduits(response.data)
        // }, function (error) {
        //     console.log(error)
        // })
    }

    // ------------ Tri ASC ----------
    const handleTriAZ = () => {
        axios.get(url + 'produitsDesignAsc').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // ------------ Tri DESC ----------
    const handleTriZA = () => {
        axios.get(url + 'produitsDesignDesc').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // ------------ Tri plus aimé ----------
    const handleTriAime = () => {
        axios.get(url + 'produitPlusAime').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // ------------ Tri plus visité ----------
    const handleTriVisite = () => {
        axios.get(url + 'produitsPlusVisite').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // ------------ Tri plus achete ----------
    const handleTriAchat = () => {
        axios.get(url + 'produitPlusVendu').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // ------------ Tri plus recent ----------
    const handleTriRecent = () => {
        axios.get(url + 'produitPlusRecent').then(function (response) {
            setProduits(response.data)
        }, function (error) {
            console.log(error)
        })
    }

    // --------- Pagination -----------
    const elemPage = 8
    const totalPage = Math.ceil(produits.length / elemPage)
    const start = (page - 1) * elemPage
    const end = start + elemPage
    const dataPage = produits.slice(start, end)

    const handlePageChange = (event, value) => {
        setPage(value)
    }

    // -------- Enregistrement des achat --------
    const postAchat = () => {
        panierData.map((item) => {
            const date = new Date()
            const y = date.getFullYear()
            const m = String(date.getMonth() + 1).padStart(2, '0')
            const d = String(date.getDate()).padStart(2, '0')
            const today = `${y}-${m}-${d}`
            const obj = {
                idPro: item.idPro,
                idCli: idCli,
                idFr: item.idFr,
                qteAchat: item.count,
                dateAchat: today,
            }

            // -------- à décommenter -----------
            // axios.post(url + 'achatsPost', obj).then(function (response) {
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
        })
        setPanierData([])
        setBoxPanier(false)
    }

    // -------- Annuler achat ---------
    const annulerAchat = () => {
        setPanierData([])
        setBoxPanier(false)
    }

    return (
        <>
            <div id='body-accueil'>
                <div id="left-accueil" >

                    <div id='logo'>
                        <img src={logo} alt="logo" />
                        <img src={titre} alt="titre" />
                    </div>
                    <div id='filtre'>
                        <div id='filtre-entete'>
                            <div style={{ width: '100%', height: 'fit-content' }}>
                                <Typography sx={{ fontWeight: "600", fontSize: 20, }}>Filtre</Typography>
                            </div>
                            <div>
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                        fontSize: 15,
                                        color: '#ff7f00',
                                        cursor: 'default',
                                        '&:hover': {
                                            color: "#ff5f00",
                                            backgroundColor: 'rgb(178, 178, 178, 0.2)',
                                            p: 0.5,
                                            borderRadius: '999px',
                                            width: 'fit-content'
                                        }
                                    }}
                                >
                                    Appliquer
                                </Typography>
                            </div>
                        </div>

                        <div id='filtre-cat'>
                            <div>
                                <Typography sx={{ fontWeight: '600', fontSize: '0.85rem' }}>CATÉGORIE :</Typography>
                            </div>

                            <div id='liste-cat'>

                                {/* ----- Données catégories ----- */}
                                {categ.map((item, index) => {
                                    return <CheckFilter key={index} value={item} change={() => handleToggle(item)} checked={checked} />
                                })}
                            </div>
                        </div>

                        <div id="filtre-comp">
                            <div>
                                <Typography sx={{ fontWeight: '600', fontSize: '0.85rem' }}>DATE DE SORTIE :</Typography>
                            </div>

                            <div id='liste-comp'>
                                <div>
                                    <Typography>Début : </Typography>
                                    <input type="month" value={dates.debut} onChange={handleDate} name="debut" id="debut" />
                                </div>

                                <div>
                                    <Typography>Fin : </Typography>
                                    <input type="month" value={dates.fin} onChange={(e) => handleDate(e)} name="fin" id="fin" />
                                </div>

                            </div>
                        </div>

                        <div id="filtre-prix">
                            <div>
                                <Typography sx={{ fontWeight: '600', fontSize: '0.85rem' }}>PRIX :</Typography>
                            </div>
                            <div id='prix'>
                                <TextField
                                    id="prix-min"
                                    label="Min"
                                    name='min'
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size='small'
                                    value={prix.min}
                                    onChange={handlePrix}
                                // variant="standard"
                                />

                                <TextField
                                    id="prix-max"
                                    label="Max"
                                    type="number"
                                    name='max'
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    size='small'
                                    value={prix.max}
                                    onChange={handlePrix}
                                // variant="standard"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div id="right-accueil" >
                    <div id='right-header'>

                        <div id="right-entete">
                            <div id='right-titre'>
                                <Typography sx={{ fontSize: 0, fontWeight: '500', color: 'rgb(100 100 100)', marginLeft: '10%' }}>Accueil</Typography>
                            </div>

                            <div id='right-search'>
                                <div style={{ background: 'rgb(245 245 245)', height: '60%', borderRadius: '999px', padding: '2px 0px', display: 'flex', alignItems: 'center', width: "100%" }}>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Rechercher des produits"
                                        inputProps={{ 'aria-label': 'recherche' }}
                                        id='search-produit'
                                    />
                                    <IconButton onClick={handleRecherche} type="button" sx={{ p: '10px', background: 'linear-gradient( #ed2645 ,#ff394b , #ff7f00 , #ffd400 )' }} aria-label="recherche">
                                        <Search sx={{ color: "white" }} />
                                    </IconButton>
                                </div>
                            </div>

                            <div id='right-btn'>
                                <IconButton aria-label="cart" sx={{ height: '60%' }} onClick={() => setBoxPanier(true)}>
                                    <StyledBadge badgeContent={panierData.length ?? 0} color="#ed1111">
                                        <ShoppingCartCheckout sx={{ width: '40px', height: '100%', color: 'rgb(168 162 158)' }} />
                                    </StyledBadge>
                                </IconButton>

                                <Link to={{
                                        pathname: '/profil',
                                        // state: {id: idCli} décommenter
                                    }}>
                                    <IconButton sx={{ p: 0, marginLeft: '20px' }}>
                                        <Avatar src={pdp} />
                                    </IconButton>
                                </Link>


                                {/* <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
                                    <Tooltip>
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 1, color: 'rgb(168 162 158)' }}>
                                            <MoreVert />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box> */}
                            </div>

                        </div>
                    </div>

                    <div id='right-container'>
                        <div id='container-entete'>

                            <div id='btn-add-cart'>
                                {/* <button><Typography>Ajouter au panier</Typography></button> */}
                                {/* <div style={{ borderRadius: '10px', background: 'white', width: 'fit-content', height: 'fit-content' }}>
                                    < AddCartButton startIcon={<AddCircleOutlineIcon sx={{ color: '#ed2645', backgroundClip: 'text', backgroundImage: 'linear-gradient( #ed2645, #ff394b, #ff7f00, #ffd400)', }} />}>
                                        Ajouter au panier
                                    </AddCartButton>
                                </div> */}
                                <Typography sx={{ color: 'rgb(115 115 115)', fontWeight: '500', marginLeft: '5%' }}>Résultat.s touvé.s : {produits.length}</Typography>
                            </div>

                            <div id='date-sortie'>
                            </div>

                            <div id='sort-by'>
                                <Typography sx={{ fontSize: '1rem', fontWeight: '500', color: 'rgb(115 115 115)', marginLeft: 'auto' }}>Trier par :</Typography>
                                <FormControl size="small" sx={{ m: 1, width: '50%', height: '40px', float: 'right' }}>
                                    <StyledSelect
                                        sx={{}}
                                        value={tri}
                                        onChange={handleChangeSelect}
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'sort' }}
                                    >
                                        <MenuItem value="A-Z" onClick={handleTriAZ}>A-Z</MenuItem>
                                        <MenuItem value={'Z-A'} onClick={handleTriZA}>Z-A</MenuItem>
                                        <MenuItem value={'Plus aimés'} onClick={handleTriAime}>Plus aimés</MenuItem>
                                        <MenuItem value={'Plus visités'} onClick={handleTriVisite}>Plus visités</MenuItem>
                                        <MenuItem value={'Plus achetés'} onClick={handleTriAchat}>Plus achetés</MenuItem>
                                        <MenuItem value={'Plus récents'} onClick={handleTriRecent}>Plus récents</MenuItem>
                                    </StyledSelect>
                                </FormControl>
                            </div>
                        </div>

                        <div id='container-body'>
                            <div id='display-produit'>

                                {/* ----- Données produits ------ */}
                                <div id='group-card'>
                                    {dataPage.map((val) => (
                                        <CardProduit
                                            // change={() => handleToggle(val.idPro)} 
                                            show={() => showBoxProduit(val)}
                                            key={val.idPro}
                                            data={val}
                                            addData={() => addPanierData(val.idPro, 1)}
                                        />
                                    ))}
                                    <div style={{ width: '100%', height: '1px' }}></div>
                                    {(totalPage !== 1) && <div id='page-card'>
                                        <Stack spacing={4}>
                                            <Pagination count={totalPage} page={page} onChange={handlePageChange} variant="outlined" shape="rounded" sx={{ color: "white" }} />
                                        </Stack>
                                    </div>}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

                {success &&
                    <Snackbars
                        icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                        para={"Votre achat a été enregistré avec succès"}
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

            </div>

            {boxPro &&
                <BoxProduit
                    close={closeBoxPro}
                    data={boxData}
                    allProduit={produitsDatas}
                    addPanierData={addPanierData}
                    idCli={idCli}
                />
            }

            {boxPanier &&
                <Panier
                    close={() => setBoxPanier(false)}
                    data={panierData}
                    removePanierData={removePanierData}
                    updatePanierData={updatePanierData}
                    action={postAchat}
                    cancel={annulerAchat}
                />
            }

            {alertDoubleData &&
                <Snackbars
                    icon={<Warning fontSize="inherit"
                    sx={{ color: '#f89a0c' }} />}
                    para={'Vous avez déja selectionné ce produit'}
                    color={"#f89a0c"}
                />
            }
        </>
    )
}