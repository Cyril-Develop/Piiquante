import './navbar.scss'
import { Link } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Nav() {

    const { logout } = useContext(AuthContext);
    const location = useLocation();

    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <button aria-label='Ajouter une sauce'>
                        <span>Ajouter une sauce</span> 
                        <AddIcon style={{fontSize: 'clamp(1.6rem, 1.6vw, 1.8rem)'}}/>
                    </button>
                </li>
                <li>
                    <Link to="/piiquante/login" className="logout" aria-label='Se déconnecter' onClick={logout}>
                        <span>Se déconnecter</span>
                        <LogoutIcon style={{fontSize: 'clamp(1.6rem, 1.6vw, 1.8rem)'}}/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}