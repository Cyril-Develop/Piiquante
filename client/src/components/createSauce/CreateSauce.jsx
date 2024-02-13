import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ERROR_MESSAGES, SAUCE_FIELD_VALIDATION } from "../../utils/errorMessages";
import Form from "../form/Form";
import "../form/form.scss";

export default function CreateSauce({ setOpenModal }) {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const queryClient = useQueryClient();

    const initialValues = {
        name: "",
        manufacturer: "",
        description: "",
        ingredient: "",
        heat: 1,
        image: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => {
        const { name, value, files } = e.target;
        if (name === 'image' && files.length > 0) {
            formData.set(name, files[0]);
            setFormValues({ ...formValues, [name]: files[0] });
            setFormError({ ...formError, image: '' });
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const checkFields = (values) => {
        const error = {};

        if (!values.name || !values.manufacturer || !values.description || !values.ingredient) {
            error.message = ERROR_MESSAGES.emptyFields;
        }

        if (values.name && !/^[A-Za-z\d\s]{5,30}$/.test(values.name)) {
            error.name = SAUCE_FIELD_VALIDATION.name;
        }

        if (values.manufacturer && !/^[A-Za-z\d\s]{5,30}$/.test(values.manufacturer)) {
            error.manufacturer = SAUCE_FIELD_VALIDATION.manufacturer;
        }

        if (values.description && values.description.length < 50 || values.description.length > 400) {
            error.description = SAUCE_FIELD_VALIDATION.description;
        }

        if (values.ingredient && !/^[A-Za-z\d\s,]{5,100}$/.test(values.ingredient)) {
            error.ingredient = SAUCE_FIELD_VALIDATION.ingredient;
        }

        if (!values.image) {
            error.image = SAUCE_FIELD_VALIDATION.image;
        }

        return error;
    }

    useEffect(() => {
        if (Object.keys(formError).length === 0 && submitted) {
            mutate();
        }
    }, [formError, submitted]);

    const handleSubmit = e => {
        e.preventDefault();
        setFormError(checkFields(formValues));
        setSubmitted(true);
    };

    const formData = new FormData();
    const sauce = {
        userId: currentUser.userId,
        userLastname: currentUser.lastname,
        userFirstname: currentUser.firstname,
        name: formValues.name,
        manufacturer: formValues.manufacturer,
        ingredients: formValues.ingredient.split(" "),
        description: formValues.description,
        heat: formValues.heat
    }
    formData.append("sauce", JSON.stringify(sauce));
    formData.append("image", formValues.image);

    const { mutate } = useMutation({
        mutationFn: async () => {
            return fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: formData
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries("sauces");
            setOpenModal(false);
            setFormValues(initialValues);
        },
        onError: error => {
            console.log("Erreur lors de l'ajout de la sauce", error);
        }
    });

    return (
        <div className="modal">
            <div className="modal_content">
                <button
                    className="modal_content_btn"
                    onClick={() => setOpenModal(false)}>
                    <CloseIcon />
                </button>
                <Form formValues={formValues} formError={formError} handleChange={handleChange} handleSubmit={handleSubmit} title="Ajouter une sauce" btn="Sélectionner une image" />
            </div>
        </div>
    )
}