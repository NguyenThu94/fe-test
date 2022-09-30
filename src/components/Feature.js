import { Link } from 'react-router-dom';
import arrowRightIcon from '../assets/icons/arrowRight.svg';

const Feature = ({ title, content, link, image, background }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="feature" />
      </div>
      <div className="card-body">
        <div className="card-info">
          <h5>{title}</h5>
          <p>{content}</p>
        </div>
        <Link className="btn-tertiary" to={link}>
          <span>
            Learn more
          </span>
          <img src={arrowRightIcon} alt="icon" />
        </Link>
      </div>
      <div className="card-background">
        <img src={background} alt="background" />
      </div>
    </div>
  )
}

export default Feature
