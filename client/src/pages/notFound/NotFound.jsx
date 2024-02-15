import { Link } from "react-router-dom";
import "./notFound.scss";

export default function NotFound() {
    return (
        <div className="notFound">
            <h1>404</h1>
            <p>La page que vous cherchez n'existe pas...</p>
            <Link to="/piiquante/">Retour à l'accueil</Link>
        </div>
    )
}
