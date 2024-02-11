import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./connection.scss";
import AuthService from "../../services/AuthService";
import { ERROR_MESSAGES, AUTH_FIELD_VALIDATION } from "../../utils/errorMessages";

export default function Register() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState({});
    const [badSubmit, setBadSubmit] = useState("");
    const [userCreated, setUserCreated] = useState(false);

    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    };

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const checkFields = (values) => {
        const error = {};

        if (
            !values.lastname ||
            !values.firstname ||
            !values.email ||
            !values.password
        ) {
            error.empty = ERROR_MESSAGES.emptyFields;
        }

        if (
            values.lastname &&
            !/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(
                values.lastname
            )
        ) {
            error.lastname =
            AUTH_FIELD_VALIDATION.lastname;
        }

        if (
            values.firstname &&
            !/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(
                values.firstname
            )
        ) {
            error.firstname =
            AUTH_FIELD_VALIDATION.firstname;
        }

        if (
            values.email &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                values.email
            )
        ) {
            error.email = AUTH_FIELD_VALIDATION.email;
        }

        if (
            values.password &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
                values.password
            )
        ) {
            error.password =
            AUTH_FIELD_VALIDATION.password;
        }

        return error;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setBadSubmit("");
        setFormError(checkFields(formValues));
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            submitForm();
        }
    }, [formError, isSubmit]);

    const submitForm = async () => {
        try {
            setLoading(true);
            await AuthService.register(formValues);
            setFormValues(initialValues);
            setUserCreated(true);
        } catch (err) {
            console.log(err);
            if (err?.error) {
                setBadSubmit(ERROR_MESSAGES.emailAlreadyUsed);
            } else {
                setBadSubmit(ERROR_MESSAGES.tryAgainLater);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userCreated) {
            const timer = setTimeout(() => {
                setUserCreated(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [userCreated]);

    return (
        <main className="connection">
            {userCreated && (
                <div className="connection_modal">
                    <p>Compte créé avec succés !</p>
                </div>
            )}
            <form
                className="connection_form"
                noValidate
                onSubmit={handleRegister}
            >
                <h2>Inscription</h2>
                <div className="connection_form_group">
                    <label htmlFor="lastname">Nom</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        maxLength={30}
                        value={formValues.lastname}
                        onChange={handleChange}
                    />
                    {formError.lastname && <span>{formError.lastname}</span>}
                </div>
                <div className="connection_form_group">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        maxLength={30}
                        value={formValues.firstname}
                        onChange={handleChange}
                    />
                    {formError.firstname && <span>{formError.firstname}</span>}
                </div>
                <div className="connection_form_group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="user@guest.com"
                        maxLength={40}
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    {formError.email && <span>{formError.email}</span>}
                </div>
                <div className="connection_form_group password">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type={passwordShown ? "text" : "password"}
                        id="password"
                        name="password"
                        maxLength={30}
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    {formError.password && <span>{formError.password}</span>}
                    <button
                        className="connection_form_group_btn"
                        aria-label="Voir le mot de passe"
                        type="button"
                        onClick={() => setPasswordShown(!passwordShown)}
                    >
                        {passwordShown ? (
                            <VisibilityOffIcon style={{ fontSize: "clamp(1.6rem, 2vw, 2rem)" }} />
                        ) : (
                            <VisibilityIcon style={{ fontSize: "clamp(1.6rem, 2vw, 2rem)" }} />
                        )}
                    </button>
                </div>
                <button className="connection_form_btn_submit" type="submit">
                    S'inscrire
                </button>
                {loading && <div className="connection_form_loader"></div>}
                {!loading && formError.empty && <span>{formError.empty}</span>}
                {!loading && !formError.empty && badSubmit && <span>{badSubmit}</span>}
            </form>
            <p>Vous possédez déjà un compte ? <Link to={"/piiquante/login"}>Se connecter</Link></p>
        </main>
    );
}