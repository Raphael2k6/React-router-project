import classes from './QuoteItem.module.css';
import { Link, useParams } from 'react-router-dom';

const QuoteItem = (props) => {
  const param = useParams()
  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <Link to={`/quotes/${props.id}`} className='btn'>
        View Fullscreen
      </Link>
    </li>
  );
};

export default QuoteItem;
