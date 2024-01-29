import { useLocation, Link } from "react-router-dom";
import "./header.scss";
import Logo from "../../images/logo.png";

export default function Header() {

    const location = useLocation();

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
                    <h1>Les meilleures critiques de sauce piquante sur le Web !</h1>
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
                            <a href="/logout">Se déconnecter</a>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}