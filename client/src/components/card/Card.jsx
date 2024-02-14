import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import DeleteSauce from "../deleteSauce/DeleteSauce";
import "./card.scss";

export default function Card({ content }) {
    const { currentUser, isAdmin } = useContext(AuthContext);
    
    return (
        <article className="card">
            {(currentUser.userId === content.userId || isAdmin) && (
                <DeleteSauce id={content._id} />
            )}
            <Link to={`/piiquante/sauce/${content._id}`} className="card_link">
                <div className="card_link_img">
                    <img src={content.imageUrl} alt={content.name} />
                </div>
                <div className="card_link_infos">
                    <h2>{content.name}</h2>
                    <p className="card_img_info">
                        Piquant : {content.heat} / 10
                    </p>
                </div>
            </Link>
        </article>
    );
}
