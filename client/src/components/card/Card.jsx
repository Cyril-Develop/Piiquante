import './card.scss';
import { Link } from 'react-router-dom';

export default function Card({ content }) {

    return (
        <article className='card'>
            <Link to={`/piiquante/${content._id}`} className='card_link'>
                <div className='card_link_img'>
                    <img src={content.imageUrl} alt={content.name} />
                </div>
                <div className='card_link_infos'>
                    <h2>{content.name}</h2>
                    <p className='card_img_info'>Piquant : {content.heat} / 10</p>
                </div>
            </Link>
        </article>
    )
}