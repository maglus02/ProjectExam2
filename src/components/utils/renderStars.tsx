import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const renderStars = (rating: number): JSX.Element => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (rating >= i + 1) {
            stars.push(<FaStar key={i} />);
        } else if (rating >= i + 0.5) {
            stars.push(<FaStarHalfAlt key={i} />);
        } else {
            stars.push(<FaRegStar key={i} />);
        }
    }

    return <div className="rating-stars">{stars}</div>;
};

export default renderStars;