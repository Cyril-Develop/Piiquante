import "./navbar.scss";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CreateSauce from "../createSauce/CreateSauce";
import HomeIcon from "@mui/icons-material/Home";
import AuthService from "../../services/AuthService";

export default function Nav() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <nav className="navbar">
            {openModal && <CreateSauce setOpenModal={setOpenModal} />}
            <ul>
                <li>
                    <button
                        aria-label="Ajouter une sauce"
                        onClick={() => setOpenModal(true)}
                    >
                        Ajouter une sauce
                        <AddIcon />
                    </button>
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/piiquante/" aria-label="Accueil">
                        <span>Accueil </span>
                        <HomeIcon />
                    </Link>
                </li>
                <li>
                    <Link
                        to="/piiquante/login"
                        className="logout"
                        aria-label="Se déconnecter"
                        onClick={AuthService.logout}
                    >
                        <span>Se déconnecter</span>
                        <LogoutIcon />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
