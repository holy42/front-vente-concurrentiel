import { React, useState, useEffect } from 'react'
import '../css/boxProduit.css'
import V17 from '../../voiture/V17.png'
import Avis from './avis'
import Modals from '../../../modal/modal'
import Snackbars from '../../../modal/snackbar'

import { Stack, Rating, Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { Add, Remove, ChevronLeft, ChevronRight, Close, Help, CheckCircle, Cancel } from '@mui/icons-material'
import axios from 'axios'

const url = 'http://localhost:8080/'

const StyledButton = styled(Button)({
    padding: '10px 5px',
    border: '1px solid',
    backgroundColor: 'transparent',
    borderColor: 'rgb(38 38 38)',
    color: 'rgb(38 38 38)',
    '&:hover': {
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        borderColor: 'rgb(38 38 38)',
        boxShadow: 'none',
    },
})

const AcheterButton = styled(Button)({
    padding: '12px 10px',
    border: '1px solid',
    backgroundColor: 'transparent',
    borderColor: '#ff7f00',
    color: '#ff7f00',
    margin: 'auto',
    borderRadius: '999px',
    '&:hover': {
        backgroundColor: '#ff8f0035',
    },
})

const AddCartButton = styled(Button)({
    padding: '12px 10px',
    border: '1px solid',
    backgroundColor: '#ff7f00',
    borderColor: 'white',
    color: 'white',
    margin: 'auto',
    borderRadius: '999px',
    '&:hover': {
        backgroundColor: '#ff5f00',
    },
});

const MiniCard = ({ data, changeData }) => {
    return (
        <>
            <div id='mini-card' onClick={() => changeData(data)}>
                <img src={V17} alt="v" />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Stack spacing={1} >
                        <Rating name="half-rating-read" defaultValue={data.vote} precision={0.5} size="small" readOnly />
                    </Stack>
                    <Typography sx={{ fontSize: 13, fontWeight: '500', marginLeft: '2%', color: 'rgb(128 128 128)' }}>{data.vote}</Typography>
                </div>
                <Typography sx={{ fontSize: 13, fontWeight: '500', color: 'rgb(38 38 38)' }}>Ar {data.prix}</Typography>
            </div>
        </>
    )
}

export default function BoxProduit({ close, data, addPanierData, allProduit, idCli }) {
    const [modalAvis, setModalAvis] = useState(false)
    const [modal, setModal] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [stock, setStock] = useState('')
    const [nombre, setNombre] = useState(0)
    const [produitAvis, setProduitAvis] = useState({})
    const [page, setPage] = useState(1)
    const [produit, setProduit] = useState(data)
    const [rate, setRate] = useState(data.vote)

    const produitData = [
        { id: 1, idCli: 1, vote: 4.5, pseudo: 'Holy M.', dateAvis: '10/02/2024', commentaire: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit' },
        { id: 2, idCli: 2, vote: 4.5, pseudo: 'Holy M.', dateAvis: '10/02/2024', commentaire: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit' },
        { id: 3, idCli: 3, vote: 4.5, pseudo: 'Holy M.', dateAvis: '10/02/2024', commentaire: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit' },
        { id: 4, idCli: 4, vote: 4.5, pseudo: 'Holy M.', dateAvis: '10/02/2024', commentaire: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae velit sed eros feugiat elit' }
    ]

    const newData = allProduit.filter((item) => { return item.design.includes(produit.design) && item.idFr !== produit.idFr })

    // --------- Get Avis par produit à décommenter ---------
    // useEffect(() => {
    //     axios.get(url + '').then(function (response){
    //         setProduitAvis(response.data)
    //     }, function (error){
    //         console.log(error)
    //     })
    // }, [produit])
    //     const produitData = Object.entries(produitAvis).map(([key, value]) => ({ index: key, ...value, }))

    const changeData = (obj) => {
        setProduit(obj)
        setRate(obj.vote)
    }

    const addNombre = () => {
        if (nombre < data.qte) {
            setNombre((nombre) => nombre + 1)
            setStock('')
        } else {
            setStock('*Quantité maximale')
        }
    }

    const removeNombre = () => {
        if (nombre > 0) {
            setNombre((nombre) => nombre - 1)
            setStock('')
        } else {
            setStock('*Quantité minimale')
        }
    }

    // --------- Pagination -----------
    const elemPage = 4
    const totalPage = Math.ceil(newData.length / elemPage)
    const start = (page - 1) * elemPage
    const end = start + elemPage
    const dataPage = newData.slice(start, end)

    const nextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPage))
    }

    const prevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1))
    }

    // ------- Clic acheter bouton ---------
    const handleAchatClick = () => {
        if (nombre < 1) setStock('Veuillez au moins prendre 1 article')
        else setModal(true)
    }

    // ------- Enregistrement des achats ---------
    const postAchat = () => {
        const date = new Date()
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const today = `${y}-${m}-${d}`
        const obj = {
            idPro: produit.idPro,
            idCli: idCli,
            idFr: produit.idFr,
            qteAchat: nombre,
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
    }

    return (
        <>
            <div id='body-box'>
                <div id='box-container'>
                    <div id='box-produit'>

                        <div id='box-img'>
                            <div id='img-pro'>
                                <img src={V17} alt="v" />
                            </div>
                        </div>

                        <div id='box-detail'>
                            <div id='box-nom'>
                                <Typography sx={{ fontSize: 30, fontWeight: '600', color: 'rgb(38 38 38)' }}>{produit.design}</Typography>

                                <IconButton sx={{
                                    position: 'absolute',
                                    top: 7,
                                    right: 7,
                                    '&:hover': {
                                        color: '#ed111127'
                                    }
                                }}
                                    onClick={close}
                                >
                                    <Close sx={{
                                        color: 'gray',
                                        '&:hover': {
                                            color: 'red'
                                        }
                                    }}
                                    />
                                </IconButton>
                            </div>

                            <div id='box-descri'>
                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>{produit.descri}</Typography>
                            </div>

                            <div id='box-prix'>
                                <Typography sx={{ fontSize: 25, fontWeight: '500', color: 'rgb(38 38 38)' }}>Ar {produit.prix}</Typography>
                            </div>

                            <div id='box-review'>
                                <Stack spacing={1}>
                                    <Rating name="half-rating-read" value={rate} precision={0.5} readOnly />
                                </Stack>
                                <Typography onClick={() => setModalAvis(true)} sx={{ marginLeft: '2%', fontSize: 13,cursor: 'default', fontWeight: '400', color: 'rgb (128 128 128)', '&:hover': { textDecoration: 'underline' } }}>{produit.avis} avis</Typography>
                            </div>

                            <div id='box-qte'>
                                <StyledButton variant="outlined" onClick={() => addNombre()} >
                                    <Add />
                                </StyledButton>
                                <Typography sx={{ fontSize: 20, fontWeight: '500', color: 'rgb(38 38 38)', marginRight: '7%', marginLeft: '7%' }}>{nombre}</Typography>
                                <StyledButton variant="outlined" onClick={() => removeNombre()} >
                                    <Remove />
                                </StyledButton>
                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: '#ed1111', marginLeft: '5%' }}>{stock}</Typography>
                            </div>

                            <div id='box-btn'>
                                <AcheterButton onClick={handleAchatClick}>Acheter maintenant</AcheterButton>
                                <AddCartButton onClick={() => addPanierData(produit.idPro, nombre)}>Ajouter au panier</AddCartButton>
                            </div>

                        </div>
                    </div>

                    {newData.length >= 1 && <div id='box-related'>
                        <div id='titre-related'>
                            <Typography sx={{ fontSize: 18, marginLeft: '5%', fontWeight: '400', color: 'rgb(38 38 38)' }}>Autre.s produit.s : </Typography>
                        </div>
                        <div id='img-related'>
                            <div style={{ visibility: (totalPage > 1 && page === totalPage) ? 'visible' : 'hidden', display: 'grid', justifyContent: 'center' }}>
                                <IconButton onClick={prevPage} type="button" sx={{ p: '1', width: 'fit-content', backgroundColor: 'transparent' }} aria-label="prev">
                                    <ChevronLeft sx={{ color: "rgb(38 38 38)" }} />
                                </IconButton>
                            </div>

                            {/* ----- Données produits ----- */}

                            <div id='img-group'>
                                {dataPage.map((item) => {
                                    return <MiniCard key={item.idPro} data={item} changeData={changeData} />

                                })}
                            </div>

                            <div style={{ visibility: (totalPage > 1 && page === 1) ? 'visible' : 'hidden', display: 'grid', justifyContent: 'center' }}>
                                <IconButton onClick={nextPage} type="button" sx={{ p: '1', width: 'fit-content', backgroundColor: 'transparent' }} aria-label="next">
                                    <ChevronRight sx={{ color: "rgb(38 38 38)" }} />
                                </IconButton>
                            </div>
                        </div>
                    </div>}

                </div>

                {modalAvis && 
                    <Avis 
                        datacoms={produitData} 
                        close={() => setModalAvis(false)} 
                        idCli={idCli}
                        idPro={produit.idPro}
                    />
                }
                {modal && <Modals
                    icon={<Help sx={{ color: '#0f7bd4', width: 60, height: 60 }} />}
                    color={'#0f7bd4'}
                    para1={`Voulez-vous vraiment acheter ${nombre} ${produit.design}?`}
                    para2={'Vous ne pouvez plus annuler une fois valider'}
                    button={'Valider'}
                    close={() => setModal(false)}
                    action={postAchat}
                />}
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
        </>
    )
}