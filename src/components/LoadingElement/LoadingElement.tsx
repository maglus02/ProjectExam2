import React from 'react';
import '../../scss/LoadingElement.scss';

const LoadingElement: React.FC = () => {
  return (
    <div className="loading-spinner">
      <div className="pulse"></div>
    </div>
  );
};

export default LoadingElement;