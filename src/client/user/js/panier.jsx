import { React, useEffect, useState } from 'react'
import '../css/panier.css'
import V17 from '../../voiture/V17.png'
import pdp from '../image/pdp.jpg'
import Modals from '../../../modal/modal'

import { Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';

import { Add, Remove, Check, ShoppingCartCheckout, Close, Help } from '@mui/icons-material'

const ValiderButton = styled(Button)({
    padding: '10px 15px',
    width: 'fit-content',
    backgroundColor: '#ff7f00',
    border: '1px solid #ff7f00',
    color: 'white',
    borderRadius: '999px',
    marginBottom: '2%',
    marginRight: '5%',
    '&:hover': {
        backgroundColor: '#ff5f00',
    },
})

const AnnulerButton = styled(Button)({
    padding: '10px 15px',
    width: 'fit-content',
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    border: '2px solid white',
    color: 'rgb(38 38 38)',
    borderRadius: '999px',
    marginBottom: '2%',
    marginLeft: 'auto',
    marginRight: '5%',
    '&:hover': {
        backgroundColor: '#ed1111',
        color: 'white',
        boxShadow: 'none',
    },
})
const CardPanier = ({ data, remove, sommePrix, updatePanier }) => {
    const [nombre, setNombre] = useState(data.count)

    useEffect(() => {
        sommePrix(data.prix, nombre)
        updatePanier(data.idPro, nombre)
    }, [nombre])

    const addNombre = () => {
        if (nombre < data.qte) {
            setNombre((nombre) => nombre + 1)
            // setStock('')
        }
    }

    const removeNombre = () => {
        if (nombre > 1) {
            setNombre((nombre) => nombre - 1)
            // setStock('')
        }
    }


    return (
        <>
            <div id='panier-card'>
                <div id="panier-left">
                    <div id="panier-img">
                        <img src={V17} alt="voiture" />
                    </div>

                    <div id='panier-qte'>
                        <button onClick={addNombre}>
                            <Add />
                        </button>
                        <Typography sx={{ fontSize: 17, fontWeight: '500', color: '#ffd400', marginRight: '10%', marginLeft: '10%' }}>{nombre}</Typography>
                        <button onClick={removeNombre}>
                            <Remove />
                        </button>
                    </div>
                </div>

                <div id='panier-right'>
                    <div id='panier-remove'>
                        <IconButton sx={{
                            float: 'right',
                            '&:hover': {
                                color: '#ed111127'
                            }
                        }}
                            onClick={remove}
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
                    <div id='panier-nom'>
                        <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)', marginLeft: '10px', marginTop: '1%' }}>{data.design}</Typography>
                    </div>

                    {/* <div id='panier-btn'>
                        {/* <button>
                            Retirer
                        </button> 
                    </div> */}

                    <div id='panier-prix'>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)', marginLeft: '10px', marginTop: '1%' }}>Ar {data.prix * nombre}</Typography>
                    </div>
                </div>

            </div>
        </>
    )
}

export default function Panier({ close, data, removePanierData, updatePanierData, action, cancel }) {
    const [total, setTotal] = useState(0)
    const [somme, setSomme] = useState({})
    const [modal, setModal] = useState(false)

    const sommePrix = (unitaire, nombre) => {
        setSomme((prevSomme) => {
            const newSomme = { ...prevSomme }
            newSomme[unitaire] = unitaire * nombre
            return newSomme
        })
    }

    useEffect(() => {
        let totalPrix = 0
        for (const unitaire in somme) {
            totalPrix += somme[unitaire]
        }
        setTotal(totalPrix)
    }, [somme])

    const count = data.length ?? 0

    const validation = () => {
        action()
        setModal(false)
    }

    return (
        <>
            <div id='panier-body'>
                <div id='panier-container'>
                    <div id='panier-titre'>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ShoppingCartCheckout sx={{ fontSize: 35, color: 'rgb(38 38 38)', margin: '1% 0% 0% 3%' }} />
                            <Typography sx={{ fontSize: 30, fontWeight: '500', color: 'rgb(38 38 38)', marginLeft: '10px', marginTop: '1%' }}>Panier</Typography>
                            <span style={{ marginLeft: '20px', padding: '5px 9px', borderRadius: '100%', marginTop: '1%', background: '#ed1111', color: 'white' }}>{count}</span>
                        </div>
                        <Close onClick={close} sx={{
                            color: 'gray',
                            float: 'right',
                            '&:hover': {
                                color: 'red'
                            }
                        }}
                        />
                    </div>

                    {/* ----- Données paniers produits ----- */}
                    <div id='panier-display'>
                        {data.map((item) => {
                            return (
                                <CardPanier
                                    key={item.idPro}
                                    data={item}
                                    sommePrix={sommePrix}
                                    remove={() => removePanierData(item.idPro)}
                                    updatePanier={updatePanierData}
                                />
                            )
                        })}
                    </div>

                    <div id='panier-footer'>
                        <div id='panier-total'>
                            <Typography sx={{ marginTop: 'auto', fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)', marginLeft: '5%', }}>Total :</Typography>
                            <Typography sx={{ fontSize: 24, fontWeight: '600', color: 'rgb(38 38 38)', marginLeft: '5%', }}>Ar {total}</Typography>
                        </div>
                        {(count !== 0) && <div id='panier-submit'>
                            <AnnulerButton startIcon={<Close />} onClick={cancel}>Annuler</AnnulerButton>
                            <ValiderButton startIcon={<Check />} onClick={() => setModal(true)}>Valider</ValiderButton>
                        </div>}
                    </div>
                </div>
            </div>

            {modal && <Modals
                icon={<Help sx={{ color: '#0f7bd4', width: 60, height: 60 }} />}
                color={'#0f7bd4'}
                para1={'Voulez-vous vraiment valider et acheter cet.ces article.s ?'}
                para2={'Vous ne pouvez plus annuler une fois valider'}
                button={'Valider'}
                close={() => setModal(false)}
                action={validation}
            />}
        </>
    )
}