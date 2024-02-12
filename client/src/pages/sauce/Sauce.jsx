import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Author from "../../components/author/Author";
import Like from "../../components/like/Like";
import Loader from "../../components/loader/Loader";
import UpdateSauce from "../../components/updateSauce/UpdateSauce";
import { AuthContext } from "../../context/AuthContext";
import "./sauce.scss";

export default function Sauce() {
    const { id } = useParams();
    const { currentUser } = useContext(AuthContext);
    const token = currentUser?.token;

    const fetchSauce = async () => {
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/sauces/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            },
        });
        return response.json();
    }

    const { isLoading, error, data } = useQuery({ queryKey: ["sauce"], queryFn: fetchSauce });

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
                                return index === data.mainIngredients.length - 1 ?
                                    ingredient :
                                    ingredient + ", ";
                            })}.
                        </p>
                        <p>{data.description}</p>
                        <Like like={data.likes} dislike={data.dislikes} id={id} />
                        {currentUser.userId === data.userId ?
                            <UpdateSauce />
                            :
                            <Author userLastname={data.userLastname} userFirstname={data.userFirstname} />
                        }
                    </div>
                </article>
            )}
        </main>
    );
}