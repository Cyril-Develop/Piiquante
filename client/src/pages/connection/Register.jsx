import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BG from "../../assets/bg-register.webp";
import BannerForm from "../../components/bannerForm/BannerForm";
import AuthService from "../../services/AuthService";
import { AUTH_FIELD_VALIDATION, ERROR_MESSAGES } from "../../utils/errorMessages";
import "./connection.scss";

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
            <div className="connection_wrapper">
                <BannerForm img={BG} />
                {userCreated && (
                    <div className="connection_wrapper_modal">
                        <p>Compte créé avec succés !</p>
                    </div>
                )}
                <form
                    className="connection_wrapper_form"
                    noValidate
                    onSubmit={handleRegister}
                >
                    <h2>Inscription</h2>
                    <div className="connection_wrapper_form_group">
                        <label htmlFor="lastname">Nom</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            maxLength={30}
                            value={formValues.lastname}
                            onChange={handleChange}
                        />
                        {formError.lastname && <span className="error_field">{formError.lastname}</span>}
                    </div>
                    <div className="connection_wrapper_form_group">
                        <label htmlFor="firstname">Prénom</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            maxLength={30}
                            value={formValues.firstname}
                            onChange={handleChange}
                        />
                        {formError.firstname && <span className="error_field">{formError.firstname}</span>}
                    </div>
                    <div className="connection_wrapper_form_group">
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
                        {formError.email && <span className="error_field">{formError.email}</span>}
                    </div>
                    <div className="connection_wrapper_form_group password">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type={passwordShown ? "text" : "password"}
                            id="password"
                            name="password"
                            maxLength={30}
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {formError.password && <span className="error_field">{formError.password}</span>}
                        <button
                            className="connection_wrapper_form_group_btn"
                            aria-label="Voir le mot de passe"
                            type="button"
                            onClick={() => setPasswordShown(!passwordShown)}
                        >
                            {passwordShown ?
                                <VisibilityOffIcon />
                                :
                                <VisibilityIcon />
                            }
                        </button>
                    </div>
                    <div className="connection_wrapper_form_submit">
                        <button type="submit">S'inscrire</button>
                        {!loading && formError.empty && <span className="error_field">{formError.empty}</span>}
                        {!loading && !formError.empty && badSubmit && <span className="error_field">{badSubmit}</span>}
                    </div>
                </form>
            </div>
            <p className="connection_link">Vous possédez déjà un compte ? <Link to={"/piiquante/login"}>Se connecter</Link></p>
        </main>
    );
}