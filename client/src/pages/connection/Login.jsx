import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './connection.scss'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const { loginAsUser, loginAsGuest, error, successfullLogin }  = useContext(AuthContext);
    const navigate = useNavigate();

    const [guest, setGuest] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: ""
    });
 
    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleLogin = async e => {
        e.preventDefault();

        if(!guest) {
            const email = formValues.email;
            const password = formValues.password;
        
            setFormErrors(prevErrors => ({
                ...prevErrors,
                email: email === "" ? "Veuillez renseigner votre email" : "",
                password: password === "" ? "Veuillez renseigner votre mot de passe" : ""
            }));
        }

        try{
            await loginAsUser(formValues.email, formValues.password);
        } catch (err) {
            console.log(err);
        };
    };

    useEffect(() => {
        if(successfullLogin) {
            navigate("/");
        }
    }, [successfullLogin]);

    const togglePassword = e => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    };

    const HandleGuestConnection = async e => {
        e.preventDefault();
        setGuest(true);
        try{
            await loginAsGuest();
        } catch (err) {
            console.log(res);
        };
    };

    return (
        <main className="connection">
            <button className="connection_btn-guest" onClick={HandleGuestConnection}>Se connecter en tant qu'invité</button>
            <form className="connection_form" noValidate>
                <div className="connection_form_group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="user@guest.com" onChange={handleChange}/>
                    {formErrors.email && <span>{formErrors.email}</span>}
                </div>
                <div className="connection_form_group password">
                    <label htmlFor="password">Mot de passe</label>
                    <input type={passwordShown ? "text" : "password"} id="password" name="password" maxLength={30} onChange={handleChange}/>
                    {formErrors.password && <span>{formErrors.password}</span>}
                    <button className="connection_form_group_btn" aria-label='Voir le mot de passe' onClick={e => togglePassword(e)}>
                        {passwordShown ? <VisibilityOffIcon style={{ fontSize: "2rem" }} /> : <VisibilityIcon style={{ fontSize: "2rem" }} />}
                    </button>
                </div>
                <button className="connection_form_btn_submit" onClick={handleLogin}>Se connecter</button>
                {error && <span>{"Identifiants invalides"}</span>}
            </form>
        </main>
    )
}