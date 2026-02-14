import React from 'react';


export interface I_MovieClip {
    children?: React.ReactNode;
    id?: string;
}


export const MovieClip: React.FC<I_MovieClip> = ({ children, id }) => {
    return (
        <div id={id}>
            {children}
        </div>
    );
};

export default MovieClip;
