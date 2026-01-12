import React, { ReactNode } from 'react';
import { T_NX } from './types';


const NX: React.FC<T_NX> = ({ children }) => {
    return (
        <div style={{ border: '2px solid #333', padding: '1rem', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1rem' }}>This is the NX Wrapper</h3>
            {children}
        </div>
    );
};

export default NX;
