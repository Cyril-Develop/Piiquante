import "./sauce.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import Like from "../../components/like/Like";
import UpdateSauce from "../../components/updateSauce/UpdateSauce";
import Author from "../../components/author/Author";

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
                                return index === data.mainIngredients.length - 1 ?
                                    ingredient :
                                    ingredient + ", ";
                            })}.
                        </p>
                        <p>{data.description}</p>
                        <Like like={data.likes} dislike={data.dislikes} />
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