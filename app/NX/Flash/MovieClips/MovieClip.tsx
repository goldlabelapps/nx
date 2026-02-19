"use client";
import React from 'react';

export interface I_MovieClip {
    children?: React.ReactNode;
    id?: string;
    style?: React.CSSProperties;
    className?: string;
    width?: number | string;
    height?: number | string;
    border?: boolean;
    /**
     * Optional minimum width for the MovieClip
     */
    minWidth?: number | string;
    /**
     * Optional maximum width for the MovieClip
     */
    maxWidth?: number | string;
    /**
     * Optional z-index for stacking order
     */
    zIndex?: number;
    pos?:
    | 'top-left'
    | 'top-middle'
    | 'top-right'
    | 'middle-left'
    | 'middle-right'
    | 'bottom-left'
    | 'bottom-middle'
    | 'bottom-right';
    align?: 'left' | 'right' | 'center';
    /**
     * Optional offset in the X direction (pixels)
     */
    offsetX?: number;
    /**
     * Optional offset in the Y direction (pixels)
     */
    offsetY?: number;
    /**
     * Optional ref for the MovieClip div
     */
    ref?: React.Ref<HTMLDivElement>;
}


const defaultSize = 150;
const movieClipBaseStyle: React.CSSProperties = {
    width: defaultSize,
    height: defaultSize,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
};

function getAlignStyle(align?: I_MovieClip['align']): React.CSSProperties {
    if (!align || align === 'center') return { justifyContent: 'center', alignItems: 'center' };
    if (align === 'left') {
        return { justifyContent: 'flex-start', alignItems: 'flex-start' };
    }
    if (align === 'right') {
        return { justifyContent: 'flex-end', alignItems: 'flex-start' };
    }
    return { justifyContent: 'center', alignItems: 'center' };
}

function getPositionStyle(pos?: I_MovieClip['pos']): React.CSSProperties {
    if (!pos) return {};
    switch (pos) {
        case 'top-left':
            return { top: 0, left: 0, transform: 'none' };
        case 'top-middle':
            return { top: 0, left: '50%', transform: 'translateX(-50%)' };
        case 'top-right':
            return { top: 0, right: 0, left: 'auto', transform: 'none' };
        case 'middle-left':
            return { top: '50%', left: 0, transform: 'translateY(-50%)' };
        case 'middle-right':
            return { top: '50%', right: 0, left: 'auto', transform: 'translateY(-50%)' };
        case 'bottom-left':
            return { bottom: 0, left: 0, top: 'auto', transform: 'none' };
        case 'bottom-middle':
            return { bottom: 0, left: '50%', top: 'auto', transform: 'translateX(-50%)' };
        case 'bottom-right':
            return { bottom: 0, right: 0, left: 'auto', top: 'auto', transform: 'none' };
        default:
            return {};
    }
}

export const MovieClip = React.forwardRef<HTMLDivElement, I_MovieClip>(({
    children,
    id,
    style,
    className,
    width,
    height,
    border,
    pos,
    align,
    offsetX = 0,
    offsetY = 0,
    minWidth,
    maxWidth,
    zIndex,
}, ref) => {
    // Compose transform: base + position + offset
    const positionStyle = getPositionStyle(pos);
    // Extract any transform from positionStyle or base
    const baseTransform = movieClipBaseStyle.transform || '';
    const positionTransform = positionStyle.transform || '';
    // Remove transform from positionStyle to avoid duplicate key
    const { transform: _removed, ...positionStyleNoTransform } = positionStyle;
    // Compose all transforms
    const transforms = [
        baseTransform,
        positionTransform,
        (offsetX !== 0 || offsetY !== 0) ? `translate(${offsetX}px, ${offsetY}px)` : ''
    ].filter(Boolean).join(' ');
    const mergedStyle: React.CSSProperties = {
        ...movieClipBaseStyle,
        ...(width ? { width } : {}),
        ...(height ? { height } : {}),
        ...(border ? { border: '2px solid #888' } : {}),
        ...(minWidth ? { minWidth } : {}),
        ...(maxWidth ? { maxWidth } : {}),
        ...(zIndex !== undefined ? { zIndex } : {}),
        ...positionStyleNoTransform,
        ...getAlignStyle(align),
        ...(transforms ? { transform: transforms } : {}),
        ...style,
    };
    return (
        <div id={id} style={mergedStyle} className={className} ref={ref}>
            {children}
        </div>
    );
});

export default MovieClip;
