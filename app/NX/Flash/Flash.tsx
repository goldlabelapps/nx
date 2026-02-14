import React from 'react';

export interface I_Flash {
    children?: React.ReactNode;
    id?: string;
}

// The Stage component always fills the viewport
const stageStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    zIndex: 0,
    border: '2px solid red',
};

export const Flash: React.FC<I_Flash> = ({ children, id }) => {
    return (
        <div id={id} style={stageStyle}>
            {children}
        </div>
    );
};

export default Flash;
