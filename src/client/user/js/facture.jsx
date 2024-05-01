import React from 'react'
import '../css/facture.css'
import logo from './logo.png'
import titre from './titre.png'
import { Typography } from '@mui/material'

export default function Facture() {
    return (
        <>
            <div id='facture-body'>
                <div id='facture-header'>
                    <div id='facture-logo' style={{ marginRight: 'auto', marginLeft: '30px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <img src={logo} alt="logo" width={'35px'} height={'40px'} />
                        <img src={titre} alt="titre" width={'80px'} height={'40px'} style={{ marginLeft: '5px' }} />
                    </div>
                    <Typography sx={{ fontSize: 35, fontWeight: '700', color: 'rgb(38 38 38)' }}>FACTURE</Typography>
                </div>

                <div id='facture-detail'>
                    <div>
                        <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Numéro : </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                    </div>
                    <div>
                        <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Date : </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                    </div>
                    <div>
                        <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Client : </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                    </div>
                    <div>
                        <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Adresse : </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                    </div>

                </div>

                <div id='facture-tableau'>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Désignation</Typography>
                                </th>
                                <th>
                                    <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Fournisseur</Typography>
                                </th>
                                <th>
                                    <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Prix unitaire</Typography>
                                </th>
                                <th>
                                    <Typography sx={{ fontSize: 18, fontWeight: '600', color: 'rgb(38 38 38)' }}>Quantité</Typography>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                                </td>
                                <td>
                                    <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                                </td>
                                <td>
                                    <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                                </td>
                                <td>
                                    <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)' }}>11 </Typography>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div id='facture-footer'>
                        <Typography sx={{ fontSize: 18, fontWeight: '500', color: 'rgb(38 38 38)', marginRight: '7px' }}>Total : </Typography>
                        <Typography sx={{ fontSize: 22, fontWeight: '600', color: 'rgb(38 38 38)' }}> Ar 11 </Typography>
                    </div>


                </div>
            </div>
        </>
    )
}