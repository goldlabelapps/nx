import React from 'react';

export interface FlashProps {
    children?: React.ReactNode;
}

export const Flash: React.FC<FlashProps> = ({ children }) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Flash;
