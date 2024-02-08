import './card.scss';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Card({ content }) {

    const { currentUser } = useContext(AuthContext);

    console.log(content.mainPepper);

    return (
        <article className='card'>
            <div className='card_img'>
                <img src={content.imageUrl} alt={content.name} />
                <p className='card_img_info'>Piquant : {content.heat} / 10</p>
            </div>
            <div className='card_content'>
                <div className='card_content_infos'>
                    <div className='card_content_infos_title'>
                        <h2>
                            <span>-{content.name}-</span>
                            <span>by {content.manufacturer}</span>
                        </h2>
                        {content.mainPepper.length > 1 ?
                            <p>{content.mainPepper.map((pepper, index) => <span key={index}>{pepper} </span>)}</p>
                            :
                            <p>{content.mainPepper[0]}</p>
                        }
                    </div>
                    <p className='card_content_infos_description'>{content.description}</p>
                    <div className='card_content_infos_like'>
                        <button>
                            <ThumbUpOffAltIcon />
                            <span>{content.usersLiked.length}</span>
                        </button>
                        <button>
                            <ThumbDownOffAltIcon />
                            <span>{content.usersDisliked.length}</span>
                        </button>
                    </div>
                </div>
                {content.userId === currentUser.userId && 
                    <div className='card_content_actions'>
                        <button>Modifier</button>
                        <button>Supprimer</button>
                    </div>
                }
            </div>
        </article>
    )
}