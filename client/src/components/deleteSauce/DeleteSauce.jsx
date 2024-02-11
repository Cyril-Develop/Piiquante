import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./deleteSauce.scss";

export default function DeleteSauce({ id }) {
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const queryClient = useQueryClient();

    const handleDelete = async () => {
        try {
            await fetch(
                `${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${token}`,
                    },
                }
            );
            queryClient.invalidateQueries(["sauce"]);
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la suppression de la sauce:",
                error
            );
        }
    };

    return (
        <button className="delete" onClick={handleDelete}>
            <DeleteForeverIcon />
        </button>
    );
}