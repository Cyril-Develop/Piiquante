import { useLocation } from "react-router-dom";
import "./header.scss";
import Logo from "../../images/logo.png";
import Navbar from "../navbar/Navbar";

export default function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <h1>
                <figure>
                    <img src={Logo} alt="Piiquante - logo" />
                    <figcaption>
                        Les meilleures critiques de sauce piquante du web !
                    </figcaption>
                </figure>
            </h1>
            {(location.pathname === "/piiquante/" ||
                location.pathname.startsWith("/piiquante/sauce/")) && (
                <Navbar />
            )}
        </header>
    );
}
