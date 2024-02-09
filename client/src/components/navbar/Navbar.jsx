import "./navbar.scss";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from "@mui/icons-material/Add";
import CreateSauce from "../createSauce/CreateSauce";

export default function Nav() {
    const { logout } = useContext(AuthContext);
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
                        <AddIcon
                            style={{ fontSize: "clamp(1.6rem, 1.6vw, 1.8rem)" }}
                        />
                    </button>
                </li>
                <li>
                    <Link
                        to="/piiquante/login"
                        className="logout"
                        aria-label="Se déconnecter"
                        onClick={logout}
                    >
                        <span>Se déconnecter</span>
                        <LogoutIcon
                            style={{ fontSize: "clamp(1.6rem, 1.6vw, 1.8rem)" }}
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
