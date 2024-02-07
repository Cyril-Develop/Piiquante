import './card.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

export default function Card({ content }) {

    console.log(content);

    return (
        <article className='card'>
            <div className='card_img'>
                <img src={content.imageUrl} alt={content.name} />
                <p className='card_img_info'>Piquant : {content.heat} / 10</p>
            </div>
            <div className='card_content'>
                <div className='card_content_infos'>
                    <h2>
                        <span>{content.name}</span>
                        <span>by {content.manufacturer}</span>
                    </h2>
                    <p>{content.description}</p>
                    <p>Nombre de likes : {content.likes}</p>
                    <div className='card_content_infos_like'>
                        <button>
                            <ThumbUpOffAltIcon />
                        </button>
                        <button>
                            <ThumbDownOffAltIcon />
                        </button>
                    </div>
                </div>
                <div className='card_content_actions'>
                    <button>Update</button>
                    <button>Delete</button>
                </div>
            </div>
        </article>
    )
}