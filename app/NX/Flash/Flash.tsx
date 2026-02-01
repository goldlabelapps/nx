import React from 'react';
import type { T_Config } from '../types';

export interface FlashProps {
    config: T_Config;
}

export const Flash: React.FC<FlashProps> = ({ config }) => {
    // Placeholder for Flash project main component
    return (
        <div>
            <h2>{config.title || 'Flash Project'}</h2>
            <p>{config.description || 'Welcome to the Flash project!'}</p>
        </div>
    );
};

export default Flash;
