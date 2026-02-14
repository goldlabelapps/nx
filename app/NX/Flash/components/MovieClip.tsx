import React from 'react';


export interface I_MovieClip {
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
    width?: number | string;
    height?: number | string;
}


const defaultSize = 150;
const movieClipBaseStyle: React.CSSProperties = {
    width: defaultSize,
    height: defaultSize,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const MovieClip: React.FC<I_MovieClip> = ({ children, id, style, width, height }) => {
    const mergedStyle: React.CSSProperties = {
        ...movieClipBaseStyle,
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
        ...style,
    };
    return (
        <div id={id} style={mergedStyle}>
            {children}
        </div>
    );
};

export default MovieClip;
