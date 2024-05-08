import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './client/login/login'
import Suscribe from './client/suscribe/suscribe'

import Accueil from './client/user/js/accueil'
import Avis from './client/user/js/avis'
import Panier from './client/user/js/panier'
import Profil from './client/user/js/profil'
import BoxProduit from './client/user/js/boxProduit'
import Historique from './client/user/js/historique'
import Activite from './client/user/js/activite'
import Facture from './client/user/js/facture'

import Modals from './modal/modal'
import CancelIcon from '@mui/icons-material/Cancel'
import HelpIcon from '@mui/icons-material/Help'
import Snackbars from './modal/snackbar'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import WarningIcon from '@mui/icons-material/Warning'
import InfoIcon from '@mui/icons-material/Info'

import AdminClient from './admin/adminClient'
import AdminFournisseur from './admin/adminFournisseur'
import AdminProduit from './admin/adminProduit'
import AdminDashboard from './admin/adminDashboard'
import AdminAchat from './admin/adminAchat'

function Nav() {
  const action = () => {
    console.log('ok')
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/suscribe" element={<Suscribe />} />  
        <Route path="/boxProduit" element={<BoxProduit />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/avis" element={<Avis />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/historique" element={<Historique />} />
        <Route path="/activite" element={<Activite />} />
        <Route path="/admin/client" element={<AdminClient />} />
        <Route path="/admin/fournisseur" element={<AdminFournisseur />} />
        <Route path="/admin/produit" element={<AdminProduit />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/achat" element={<AdminAchat />} />
        <Route path="/facture" element={<Facture/>} />

        {/* <Route path="/modal" element={<Modals icon={<CancelIcon sx={{ color: '#ed1111', width: 60, height: 60}} />} color={'#ed1111'} para1={'Voulez-vous vraiment supprimer cet article ?'} para2={'Cette action est irreversible. '} button={'Supprimer'} />} /> */}
        {/* <Route path="/modal" element={<Modals icon={<HelpIcon sx={{ color: '#0f7bd4', width: 60, height: 60}} />} color={'#0f7bd4'} para1={'Voulez-vous vraiment ajouter cet article ?'} para2={''} button={'Ajouter'} action={action} />} /> */}
        {/* <Route path="/modal" element={<Snackbars icon={<CheckCircleIcon fontSize="inherit" sx={{ color: '#24cf0e'}} />} para={'Les données ont été enregistrée avec succès'} color={"#24cf0e"} />} /> */}
        {/* <Route path="/modal" element={<Snackbars icon={<WarningIcon fontSize="inherit" sx={{ color: '#ebb216'}} />} para={'un problème est survenu. Veuillez réessayer'} color={"#ebb216"} />} /> */}
        {/* <Route path="/modal" element={<Snackbars icon={<CancelIcon fontSize="inherit" sx={{ color: '#ed1111'}} />} para={'un problème est survenu. Veuillez réessayer'} color={"#ed1111"} />} /> */}
        {/* <Route path="/modal" element={<Snackbars icon={<InfoIcon fontSize="inherit" sx={{ color: '#0f7bd4'}} />} para={'un problème est survenu. Veuillez réessayer'} color={"#0f7bd4"} />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default Nav;