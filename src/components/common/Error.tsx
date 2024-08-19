import React from 'react';
import './Error.css';
import Header from './Header';

const Error = ({children}: {children: JSX.Element}) => {
    return (
        <div>
            <Header />
            <div className="divError" data-testid="divError">{children}</div>
        </div>
    );
}

export default Error;