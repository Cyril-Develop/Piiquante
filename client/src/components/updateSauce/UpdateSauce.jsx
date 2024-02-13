import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import FetchService from "../../services/FetchService";
import { ERROR_MESSAGES, SAUCE_FIELD_VALIDATION } from "../../utils/errorMessages";
import SauceForm from "../sauceForm/SauceForm";
import "../sauceForm/sauceForm.scss";

export default function UpdateSauce() {

    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ["sauce"], queryFn: async () => {
            return await FetchService.getSauce(id, token);
        }
    });

    const buildInitialValues = data => ({
        name: data.name,
        manufacturer: data.manufacturer,
        description: data.description,
        ingredient: data.ingredients.join(" ") || "",
        heat: data.heat,
        image: data.imageUrl
    });

    useEffect(() => {
        if (!isLoading && !error) {
            setFormValues(buildInitialValues(data));
        }
    }, [isLoading, error, data]);

    const [formValues, setFormValues] = useState(() => buildInitialValues(data));
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

        if (values.name && values.name.length < 5 || values.name.length > 30) {
            error.name = SAUCE_FIELD_VALIDATION.name;
        }

        if (values.manufacturer && values.manufacturer.length < 5 || values.manufacturer.length > 30) {
            error.manufacturer = SAUCE_FIELD_VALIDATION.manufacturer;
        }

        if (values.description && values.description.length < 50 || values.description.length > 400) {
            error.description = SAUCE_FIELD_VALIDATION.description;
        }

        if (values.ingredient && values.ingredient.length < 5 || values.ingredient.length > 100) {
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
    };
    formData.append("sauce", JSON.stringify(sauce));
    formData.append("image", formValues.image);

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: async () => {
            return fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}`, {
                method: "PUT",
                headers: {
                    authorization: `Bearer ${token}`
                },
                body: formData
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries("sauce");
            setOpenModal(false);
            setFormValues(buildInitialValues(data));
        },
        onError: error => {
            console.log("Erreur lors de la modification de la sauce", error);
        }
    });

    return (
        <>
            <button className="sauce_wrapper_content_btn" onClick={() => setOpenModal(true)}>Modifier <EditIcon /></button>
            {openModal &&
                <div className="modal">
                    <div className="modal_content">
                        <button
                            className="modal_content_btn"
                            onClick={() => setOpenModal(false)}>
                            <CloseIcon />
                        </button>
                        <SauceForm formValues={formValues} formError={formError} handleChange={handleChange} handleSubmit={handleSubmit} title="Modifier la sauce" btn="Remplacer l'image" />
                    </div>
                </div>
            }
        </>
    )
}