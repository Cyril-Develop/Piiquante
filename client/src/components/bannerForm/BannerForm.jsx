import { Link } from "react-router-dom";

export default function BannerForm({ img, content }) {
    return (
        <div className="connection_wrapper_banner">
            <img src={img} alt="Bannière" />
            {content}
        </div>
    )
}