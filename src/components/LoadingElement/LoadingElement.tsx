import React from 'react';
import '../../scss/LoadingElement.scss';

/**
 * A reusable loading spinner component.
 * Displays a simple animated spinner for indicating loading states.
 * 
 * @returns {JSX.Element} The rendered loading spinner component.
 * 
 * @example
 * // Usage in a component
 * if (isLoading) {
 *   return <LoadingElement />;
 * }
 */
const LoadingElement: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="pulse"></div>
    </div>
  );
};

export default LoadingElement;