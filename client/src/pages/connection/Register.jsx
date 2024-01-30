import { useState } from 'react';
import './connection.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function Register() {

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = e => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    };

    return (
        <main className="connection">
            <form className="connection_form">
                <div className="connection_form_group">
                    <label htmlFor="lastname">Nom</label>
                    <input type="text" id="lastname" name="lastname" />
                </div>
                <div className="connection_form_group">
                    <label htmlFor="firstname">Prénom</label>
                    <input type="text" id="firstname" name="firstname" />
                </div>
                <div className="connection_form_group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="user@guest.com" />
                </div>
                <div className="connection_form_group password">
                    <label htmlFor="password">Mot de passe</label>
                    <input type={passwordShown ? "text" : "password"} id="password" name="password" maxLength={30} />
                    <button className="connection_form_group_btn" aria-label='Voir le mot de passe' onClick={e => togglePassword(e)}>
                        {passwordShown ? <VisibilityOffIcon style={{ fontSize: "2rem" }} /> : <VisibilityIcon style={{ fontSize: "2rem" }} />}
                    </button>
                </div>
                <button className="connection_form_btn_submit">S'inscrire</button>
            </form>
        </main>
    )
}