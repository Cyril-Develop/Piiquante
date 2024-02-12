import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import './like.scss';

export default function Like({ like, dislike, id }) {

    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;
    const userId = currentUser?.userId;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: (data) =>
            fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `bearer ${token}`,
                },
                body: JSON.stringify(data),
            })
        ,
        onSuccess: () => {
            queryClient.invalidateQueries("sauce");
        },
        onError: error => {
            console.log(error);
        }
    });

    const handleLike = likeValue => {
        const data = {
            userId,
            like: likeValue,
        };
        mutate(data);
    };

    return (
        <div className="like">
            <div>
                <button onClick={() => handleLike(1)}>
                    <ThumbUpAltIcon sx={{ color: "#7451eb" }} />
                </button>
                <p>{like}</p>
            </div>
            <div>
                <button onClick={() => handleLike(-1)}>
                    <ThumbDownAltIcon
                        sx={{ color: "#be171a" }}
                    />
                </button>
                <p>{dislike}</p>
            </div>
        </div>
    )
}