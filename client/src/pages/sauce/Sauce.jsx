import "./sauce.scss";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";

export default function Sauce() {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ["sauce"],
        queryFn: () =>
            fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}`, {
                headers: {
                    authorization: `bearer ${token}`,
                },
            }).then((res) => res.json()),
    });

    return (
        <main className="sauce">
            {isLoading && <Loader />}
            {error && <p>Impossible de charger le contenu...</p>}
            {data && (
                <article className="sauce_wrapper">
                    <div className="sauce_wrapper_img">
                        <img src={data.imageUrl} alt={data.name} />
                        <p>Piquant : {data.heat} / 10</p>
                    </div>
                    <div className="sauce_wrapper_content">
                        <div className="sauce_wrapper_content_title">
                            <h2>- {data.name} -</h2>
                            <p>{data.manufacturer}</p>
                        </div>
                        <p className="sauce_wrapper_content_ingredients">
                            {data.mainIngredients.length > 1
                                ? "|Ingrédients : "
                                : "|Ingrédient : "}
                            {data.mainIngredients.map((ingredient, index) => {
                                if (index === data.mainIngredients.length - 1) {
                                    return ingredient;
                                } else {
                                    return ingredient + ", ";
                                }
                            })}
                            .
                        </p>

                        <p>{data.description}</p>
                        <div className="sauce_wrapper_content_likes">
                            <div>
                                <button>
                                    <ThumbUpAltIcon sx={{ color: "#7451eb" }} />
                                </button>
                                <p>{data.likes}</p>
                            </div>
                            <div>
                                <button>
                                    <ThumbDownAltIcon
                                        sx={{ color: "#be171a" }}
                                    />
                                </button>
                                <p>{data.dislikes}</p>
                            </div>
                        </div>
                        {currentUser.userId === data.userId ? (
                            <div className="sauce_wrapper_content_update">
                                <button>Modifier</button> 
                            </div>
                        ) : (
                            <div className="sauce_wrapper_content_user">
                                <p>
                                    Publié par :
                                    <span>
                                        {data.userFirstname} {data.userLastname}
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                </article>
            )}
        </main>
    );
}
