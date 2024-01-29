import './connection.scss'

export default function Login() {
    return (
        <form className="form">
            <div className="form_group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="user@guest.com" />
            </div>
            <div className="form_group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" id="password" name="password" />
            </div>
        </form>
    )
}