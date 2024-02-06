import './card.scss';
import { Link } from 'react-router-dom'

export default function Card({ content }) {

    return (
        <article className='card'>
            <Link to={`/piiquante/${content._id}`}>
                <h2>{content.name}</h2>
                <img src={content.imageUrl} alt={content.name} />
                <p>Piquant : {content.heat} / 10</p>
            </Link>
        </article>
    )
}