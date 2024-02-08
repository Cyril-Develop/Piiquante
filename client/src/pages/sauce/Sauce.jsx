import './sauce.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Sauce() {


    const { currentUser } = useContext(AuthContext);
    return (
        <main>Sauce</main>
    )

}