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
    /**
     * If true, children are wrapped in a scrollable container
     */
    scrollable?: boolean;
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
    scrollable = false,
}, ref) => {
    // Compose transform: base + position + offset, but avoid double centering
    const positionStyle = getPositionStyle(pos);
    const baseTransform = movieClipBaseStyle.transform || '';
    const positionTransform = positionStyle.transform || '';
    const { transform: _removed, ...positionStyleNoTransform } = positionStyle;
    let transforms = '';
    if (pos) {
        // Use only the position's transform plus offset
        transforms = [
            positionTransform,
            (offsetX !== 0 || offsetY !== 0) ? `translate(${offsetX}px, ${offsetY}px)` : ''
        ].filter(Boolean).join(' ');
    } else {
        // Use base transform plus offset
        transforms = [
            baseTransform,
            (offsetX !== 0 || offsetY !== 0) ? `translate(${offsetX}px, ${offsetY}px)` : ''
        ].filter(Boolean).join(' ');
    }
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
    // Ref for scrollable container
    const scrollRef = React.useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = React.useState(false);

    // Check if content is scrollable
    React.useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            setIsScrollable(el.scrollHeight > el.clientHeight);
        }
    }, [children, height, width]);

    // Scroll handler
    const scrollBy = (amount: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ top: amount, behavior: 'smooth' });
        }
    };

    return (
        <div id={id} style={mergedStyle} className={className} ref={ref}>
            {scrollable ? (
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <div
                        ref={scrollRef}
                        style={{
                            width: '100%',
                            height: '100%',
                            overflowY: 'auto',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {children}
                    </div>
                    {isScrollable && (
                        <>
                            {/* Scroll Up Button */}
                            <button
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    zIndex: 2,
                                    background: 'rgba(255,255,255,0.8)',
                                    border: '1px solid #888',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => scrollBy(-100)}
                                aria-label="Scroll Up"
                            >
                                ▲
                            </button>
                            {/* Scroll Down Button */}
                            <button
                                style={{
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8,
                                    zIndex: 2,
                                    background: 'rgba(255,255,255,0.8)',
                                    border: '1px solid #888',
                                    borderRadius: '50%',
                                    width: 32,
                                    height: 32,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => scrollBy(100)}
                                aria-label="Scroll Down"
                            >
                                ▼
                            </button>
                        </>
                    )}
                </div>
            ) : (
                children
            )}
        </div>
    );
});

export default MovieClip;
