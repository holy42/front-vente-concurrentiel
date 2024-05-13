import { React, useState, useEffect } from 'react'
import '../css/avis.css'
import pdp from '../image/pdp.jpg'
import Modals from '../../../modal/modal'
import Snackbars from '../../../modal/snackbar'
import axios from 'axios'

import { Stack, Rating, Avatar, Typography, Button, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';

import { ChevronLeft, Help, CheckCircle, Cancel, Edit, Delete } from '@mui/icons-material'

const url = 'http://localhost:8080/'

const BoxCommentaire = ({ idCli, data, edit, remove }) => {
    return (
        <>
            <div id='box-coms'>
                <Avatar src={pdp} />
                <div id='coms-right'>
                    <div id='coms-entete'>
                        <Stack spacing={1} sx={{ marginLeft: '0%', width: 'fit-content' }}>
                            <Rating name="half-rating-read" defaultValue={data.vote} precision={0.5} readOnly />
                        </Stack>
                        <Typography sx={{ fontSize: 16, fontWeight: '500', color: 'rgb(116 116 116)', marginLeft: '2%', }}>{data.pseudo}</Typography>
                        <Typography sx={{ fontSize: 14, fontWeight: '500', color: 'gray', marginLeft: '2%', }}>{data.dateAvis}</Typography>
                        {(idCli === data.idCli) && <Edit sx={{ fontSize: 20, color: 'gray', ml: 2, '&:hover': {color: '#ff7f00'} }} onClick={edit} />}
                        {(idCli === data.idCli) && <Delete sx={{ fontSize: 20, color: 'gray', ml: 2, '&:hover': {color: '#ed1111'} }} onClick={remove} />}
                    </div>
                    <div id='coms-para'>
                        <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(38 38 38)' }}>{data.commentaire}</Typography>
                    </div>
                </div>
            </div>
        </>
    )
};

const AddAvisButton = styled(Button)({
    padding: '12px 30px',
    border: '1px solid ',
    background: 'linear-gradient(80deg,#ed2645, #ff394b, #ff7f00, #ffd400)',
    borderColor: 'white',
    color: 'white',
    marginLeft: 'auto',
    borderRadius: '999px',
    '&:hover': {
        background: 'linear-gradient(225deg, #ed2645, #ff394b, #ff7f00, #ffd400)',
    },
});

export default function Avis({ datacoms, close, idCli, idPro }) {
    const [rate, setRate] = useState(0)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState(false)

    const verification = () => {
        var com = document.getElementById('text-com').innerHTML
        var w = document.getElementById('warn')
        if(com || rate !== 0) {
            setModal(true)
            w.style.display = 'none'
        }
        else {
            w.style.display = 'inline'
        }
    }
    
    // ------- Nouvel avis --------
    const newAvis = () => {
        var com = document.getElementById('text-com').innerHTML
        const date = new Date()
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const today = `${y}-${m}-${d}`

        const obj = {
            idCli: idCli,
            idPro: idPro,
            commentaire: com,
            vote: rate,
            dateAvis: today,
        }

        // ----------- à décommenter -----------
        axios.post('http://localhost:8080/avis/' + 'avisPost', obj).then(function (response) {
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
        document.getElementById('text-com').innerHTML = ''
        setRate(0)    

    }

    const handleRateChange = (event, newValue) => {
        setRate(newValue)
    }

    // -------- Modifier data avis ------------
    const handleEdit = (para, value) => {
        document.getElementById('text-com').innerHTML = para
        setRate(value)
        setEdit(true)
    }

    // ------- Modifier avis bdd --------
    const editAvis = () => {
        var com = document.getElementById('text-com').innerHTML
        const date = new Date()
        const y = date.getFullYear()
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const today = `${y}-${m}-${d}`
        const obj = {
            idCli: idCli,
            idPro: idPro,
            commentaire: com,
            vote: rate,
            dateAvis: today,
        }

        // ----------- à décommenter -----------
        axios.put('http://localhost:8080/avis/' + 'avisPut', obj).then(function (response) {
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
        document.getElementById('text-com').innerHTML = ''
        setRate(0)
    }

    // ------- Supprimer avis ---------
    const deleteAvis = () => {
        axios.delete('http://localhost:8080/avis/' + `avisDelete/${idCli}/${idPro}`).then(function (response) {
            console.log(response.data)
        }, function(error) {
            console.log(error)
        })
    }

    const submit = () => {
        if (edit) editAvis()
        else newAvis()
    }

    return (
        <>
            {/* <div id='avis-body'>
                <div id='avis-container'>
                    <div id='avis-ajout'>
                        <div id='close-coms'>
                            <CloseIcon sx={{
                                color: 'gray',
                                float: 'right',
                                '&:hover': {
                                    color: 'red'
                                }
                            }}
                            />
                        </div>
                        <div id='avis-coms'>
                            <p contentEditable="true" ></p>
                        </div>

                        <div id='avis-submit'>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(116 116 116)' }}>Notez le produit :</Typography>
                                <Stack spacing={1} sx={{ marginLeft: '5%' }}>
                                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} />
                                </Stack>
                            </div>
                            <AddAvisButton>Envoyer</AddAvisButton>
                        </div>

                    </div>

                    <div id='avis-display'>
                        <div id='barre-coms'></div>
                        <div id='coms'>
                            {data.map((item) => {
                                return (
                                    <BoxCommentaire key={item.id} nom={item.nom} value={item.vote} date={item.date} para={item.para} />
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div> */}

            <div id='avis-container'>
                <div id='avis-ajout'>
                    <div id='close-coms'>
                        <IconButton onClick={close} sx={{ position: 'absolute', top: 5, left: -25 }}>
                            <ChevronLeft sx={{
                                color: 'gray',
                                // '&:hover': {
                                //     color: 'red'
                                // }
                            }}
                            />
                        </IconButton>

                    </div>
                    <div id='avis-coms'>
                        <p contentEditable="true" id='text-com' ></p>
                    </div>

                    <div id='avis-submit'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                            <Typography sx={{ fontSize: 15, fontWeight: '500', color: 'rgb(116 116 116)' }}>Notez le produit :</Typography>
                            <Stack spacing={1} sx={{ marginLeft: '5%' }}>
                                <Rating name="half-rating-read" value={rate} onChange={handleRateChange} precision={0.5} />
                            </Stack>
                        </div>
                        <AddAvisButton onClick={verification}>Envoyer</AddAvisButton>
                    </div>
                    <span id='warn' style={{ display: 'none', fontWeight: '500', color: '#ed1111',margin: 'auto' }}>*Veuillez remplir au moins un champ</span>
                </div>

                <div id='avis-display'>
                    <div id='barre-coms'></div>
                    <div id='coms'>
                        {datacoms.map((item, index) => {
                            return (
                                <BoxCommentaire 
                                    key={index} 
                                    data={item} 
                                    idCli={idCli} 
                                    edit={() => handleEdit(item.commentaire, item.vote)} 
                                    remove={deleteAvis}
                                />
                            )
                        })}

                    </div>
                </div>

            </div>
            {modal && <Modals
                icon={<Help sx={{ color: '#0f7bd4', width: 60, height: 60 }} />}
                color={'#0f7bd4'}
                para1={'Voulez-vous vraiment envoyer cet avis sur cet article?'}
                para2={'Vous pouvez toujours le modifier plus tard'}
                button={'Valider'}
                close={() => setModal(false)}
                action={submit}
            />}
            {success &&
                <Snackbars
                    icon={<CheckCircle fontSize="inherit" sx={{ color: '#24cf0e' }} />}
                    para={'Votre avis a été enregistré avec succès'}
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