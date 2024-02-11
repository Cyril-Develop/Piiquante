import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './like.scss';

export default function Like({ like, dislike }) {

  return (

    <div className="like">
      <div>
        <button>
          <ThumbUpAltIcon sx={{ color: "#7451eb" }} />
        </button>
        <p>{like}</p>
      </div>
      <div>
        <button>
          <ThumbDownAltIcon
            sx={{ color: "#be171a" }}
          />
        </button>
        <p>{dislike}</p>
      </div>
    </div>
  )
}