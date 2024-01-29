import "./header.scss";
import Logo from "..//images/logo.png";

export default function Header() {
    return (
        <header className="header">
            <img src={Logo} alt="Piiquante - logo" />
            <h1>Les meilleures critiques de sauce piquante sur le Web !</h1>
            <nav></nav>
        </header>
    )
}
