import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./connection.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";

export default function Login() {
    const { setCurrentUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passwordShown, setPasswordShown] = useState(false);
    const navigate = useNavigate();

    const togglePassword = e => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    };

    const loginAsUser = async e => {
        e.preventDefault();

        const form = e.target;
        const elements = form.elements;
        const email = elements.email.value;
        const password = elements.password.value;

        try {
            if (email && password) {
                await handleLogin(email, password);
            } else {
                setError("Veuillez remplir tous les champs");
            }
        } catch (err) {
            console.log(err);
            setError("Merci de réessayer plus tard");
        }
    };

    const handleLogin = async (email, password) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/login`,
                { email, password }
            );
            setCurrentUser(res.data);
            navigate("/piiquante/");
        } catch (err) {
            console.log(err);
            switch(err.code) {
                case "ERR_NETWORK":
                    setError("Oups, une erreur est survenue");
                    break;
                case "ERR_BAD_REQUEST":
                    setError("Email ou mot de passe incorrect");
                    break;
                default:
                    setError("Merci de réessayer plus tard");
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
                        onClick={(e) => togglePassword(e)}
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
                {loading && <Loader/>}
                {!loading && error && <span>{error}</span>}

            </form>
            <p>Pas encore de compte ? <Link to={"/piiquante/register"}>S'inscrire</Link></p>
        </main>
    );
}