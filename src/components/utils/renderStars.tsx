import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

/**
 * Renders a set of star icons based on a given rating.
 * Full stars, half stars, and empty stars are displayed depending on the rating value.
 * 
 * @param {number} rating - The rating value (0-5) to render stars for. Supports fractional values for half stars.
 * @returns {JSX.Element} A JSX element containing the star icons.
 * 
 * @example
 * // Full stars for a rating of 4
 * renderStars(4);
 * 
 * @example
 * // Full stars and a half star for a rating of 4.5
 * renderStars(4.5);
 * 
 * @example
 * // Empty stars for a rating of 0
 * renderStars(0);
 */
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