import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Author from "../../components/author/Author";
import Like from "../../components/like/Like";
import Loader from "../../components/loader/Loader";
import UpdateSauce from "../../components/updateSauce/UpdateSauce";
import { AuthContext } from "../../context/AuthContext";
import SauceService from "../../services/SauceService";
import "./sauce.scss";

export default function Sauce() {
    const { id } = useParams();
    const { currentUser, isAdmin } = useContext(AuthContext);
    const token = currentUser?.token;

    const { isLoading, error, data } = useQuery({
        queryKey: ["sauce"], queryFn: async () => {
            return await SauceService.getSauce(id, token);
        }
    });

    return (
        <main className="sauce">
            {isLoading && <Loader />}
            {error && <p className="sauce_error"> Impossible de charger le contenu...</p>}
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
                            {data.ingredients.length > 1
                                ? "|Ingrédients : "
                                : "|Ingrédient : "}
                            {data.ingredients.join(" ")}.
                        </p>
                        <p className="sauce_wrapper_content_description">{data.description}</p>
                        <Like like={data.likes} dislike={data.dislikes} id={id} />
                        {isAdmin ?
                            <>
                                <UpdateSauce />
                                <Author userLastname={data.userLastname} userFirstname={data.userFirstname} />
                            </>
                            :
                            currentUser.userId === data.userId ?
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