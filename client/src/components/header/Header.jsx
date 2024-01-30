import { useLocation, Link } from "react-router-dom";
import "./header.scss";
import Logo from "../../images/logo.png";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {

    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <header className="header">
            <nav>
                <ul>
                    {
                        location.pathname === "/" &&
                        <>
                            <li>
                                <a href="/" className="showCurrentPath">Accueil</a>
                            </li>
                            <li>
                                <a href="/" className="showCurrentPath">Accueil</a>
                            </li>
                        </>
                    }
                </ul>
                <div>
                    <img src={Logo} alt="Piiquante - logo" />
                    <h1>Les meilleures critiques de sauce piquante du Web !</h1>
                </div>
                <ul>
                    {
                        location.pathname !== "/" &&
                        <>
                            <li>
                                <Link to="/login" className={location.pathname === "/login" ? "showCurrentPath" : ""}>Connexion</Link>
                            </li>
                            <li>
                                <Link to="/register" className={location.pathname === "/register" ? "showCurrentPath" : ""}>Inscription</Link>
                            </li>
                        </>
                    }
                    {
                        location.pathname === "/" &&
                        <li>
                            <button onClick={handleLogout}> 
                                Se déconnecter
                                <LogoutIcon style={{ fontSize: "2rem" }} />
                            </button>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}