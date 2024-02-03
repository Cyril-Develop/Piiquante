import { useLocation, Link } from "react-router-dom";
import "./header.scss";
import Logo from "../../images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
    const location = useLocation();
    const { logout } = useContext(AuthContext);

    return (
        <header className="header">
            <h1>
                <figure>
                    <img src={Logo} alt="Piiquante - logo" />
                    <figcaption>Les meilleures critiques de sauce piquante du web !</figcaption>
                </figure>
            </h1>
            {
                location.pathname === "/piiquante/" && (
                    <nav>
                        <Link to="/piiquante/login" className="logout" onClick={logout}>
                            <span>Se déconnecter</span>
                            <LogoutIcon />
                        </Link>
                    </nav>
                )
            }
        </header>
    );
}
