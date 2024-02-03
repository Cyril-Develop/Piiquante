import "./connection.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import axios from "axios";

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
        password: "",
    };

    const [formValues, setFormValues] = useState(initialValues);

    const togglePassword = (e) => {
        e.preventDefault();
        setPasswordShown(!passwordShown);
    };

    const checkFields = (values) => {
        const error = {};

        if (
            !values.lastname ||
            !values.firstname ||
            !values.email ||
            !values.password
        ) {
            error.empty = "Veuillez remplir tous les champs";
        }

        if (
            values.lastname &&
            !/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(
                values.lastname
            )
        ) {
            error.lastname =
                "3 à 15 caractères, chiffres et caractères spéciaux différents de - non autorisés";
        }

        if (
            values.firstname &&
            !/^([A-Za-z|\s]{3,15})?([-]{0,1})?([A-Za-z|\s]{3,15})$/.test(
                values.firstname
            )
        ) {
            error.firstname =
                "3 à 15 caractères, chiffres et caractères spéciaux différents de - non autorisés";
        }

        if (
            values.email &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
                values.email
            )
        ) {
            error.email = "Format email incorrect";
        }

        if (
            values.password &&
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
                values.password
            )
        ) {
            error.password =
                "8 à 30 caractères, 1 majuscule, 1 minuscule, 1 chiffre";
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsSubmit(true);
        setFormError(checkFields(formValues));
    };

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            submitForm();
        }
    }, [formError, isSubmit]);

    const submitForm = async () => {
        console.log("envoi des données");
        try {
            setLoading(true);
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/auth/signup`,
                formValues
            );
            setFormValues(initialValues);
            setUserCreated(true);
        } catch (err) {
            console.log(err);
            if (err.response.status === 400) {
                setBadSubmit("Email déjà utilisé");
            } else {
                setBadSubmit("Merci de réessayer plus tard");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userCreated) {
            const timer = setTimeout(() => {
                setUserCreated(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [userCreated]);

    console.log(badSubmit);

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
                        onClick={(e) => togglePassword(e)}
                    >
                        {passwordShown ? (
                            <VisibilityOffIcon style={{ fontSize: "2rem" }} />
                        ) : (
                            <VisibilityIcon style={{ fontSize: "2rem" }} />
                        )}
                    </button>
                </div>
                <button className="connection_form_btn_submit" type="submit">
                    S'inscrire
                </button>
                {loading && <div className="connection_form_loader"></div>}
                {!loading && formError.empty && <span>{formError.empty}</span>}
                {!loading && badSubmit && <span>{badSubmit}</span>}
            </form>
        </main>
    );
}
