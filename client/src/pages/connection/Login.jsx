import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { AuthContext } from "../../context/AuthContext";
import "./connection.scss";
import AuthService from "../../services/AuthService";
import { ERROR_MESSAGES } from "../../utils/errorMessages";

export default function Login() {
    const { setCurrentUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const loginAsUser = async e => {
        e.preventDefault();
    
        const form = e.target;
        const email = form.elements.email.value;
        const password = form.elements.password.value;
    
        if (!email || !password) {
            setError(ERROR_MESSAGES.emptyFields);
            return;
        }
    
        try {
            await handleLogin(email, password);
        } catch (err) {
            setError(ERROR_MESSAGES.tryAgainLater);
        }
    };
    
    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            const data = await AuthService.login(email, password);
            setCurrentUser(data);
            navigate("/piiquante/");
        } catch (err) {
            console.log(err);
            if (err?.message === "Informations erronées !") {
                setError(ERROR_MESSAGES.incorrectCredentials);
            } else {
                setError(ERROR_MESSAGES.tryAgainLater);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGuestConnection = async e => {
        e.preventDefault();
        await handleLogin(
            import.meta.env.VITE_REACT_APP_GUEST_EMAIL,
            import.meta.env.VITE_REACT_APP_GUEST_MDP
        );
    };

    return (
        <main className="connection">
            <button
                className="connection_btn-guest"
                onClick={handleGuestConnection}
            >
                Se connecter en tant qu'invité
            </button>
            <form className="connection_form" noValidate onSubmit={loginAsUser}>
                <h2>Connexion</h2>
                <div className="connection_form_group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" maxLength={40} />
                </div>
                <div className="connection_form_group password">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        name="password"
                        maxLength={30}
                    />
                    <button
                        className="connection_form_group_btn"
                        aria-label="Voir le mot de passe"
                        type="button"
                        onClick={() => setPasswordShown(!passwordShown)}
                    >
                        {passwordShown ? (
                            <VisibilityOffIcon style={{ fontSize: "clamp(1.6rem, 2vw, 2rem)" }} />
                        ) : (
                            <VisibilityIcon style={{ fontSize: "clamp(1.6rem, 2vw, 2rem)" }} />
                        )}
                    </button>
                </div>
                <button className="connection_form_btn_submit" type="submit">
                    Se connecter
                </button>
                {loading && <Loader />}
                {!loading && error && <span>{error}</span>}

            </form>
            <p>Pas encore de compte ? <Link to={"/piiquante/register"}>S'inscrire</Link></p>
        </main>
    );
}