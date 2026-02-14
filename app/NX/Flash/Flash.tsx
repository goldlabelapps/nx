import React from 'react';
import MovieClip from './components/MovieClip';

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
    // Prevent scrolling
    overscrollBehavior: 'none',
};

export const Flash: React.FC<I_Flash> = ({ children, id }) => {
    // Wrap each child in an absolutely positioned div so they stack over each other
    const layeredChildren = React.Children.map(children, (child, i) => (
        <MovieClip
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none', // Remove blue border for these layers
                background: 'none',
            }}
        >
            {child}
        </MovieClip>
    ));
    return (
        <MovieClip id={id} style={stageStyle}>
            {layeredChildren}
        </MovieClip>
    );
};

export default Flash;
