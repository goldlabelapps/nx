import React from 'react';

export interface I_MovieClip {
    children?: React.ReactNode;
}

export const MovieClip: React.FC<I_MovieClip> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default MovieClip;
