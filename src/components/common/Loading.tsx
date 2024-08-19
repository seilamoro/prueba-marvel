import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container" data-testid="loading-container">
            <div className="spinner" data-testid="spinner"></div>
        </div>
    );
}

export default Loading;