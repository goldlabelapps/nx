import React from 'react';


export interface I_Flash {
    children?: React.ReactNode;
    id?: string;
}


export const Flash: React.FC<I_Flash> = ({ children, id }) => {
    return (
        <div id={id}>
            {children}
        </div>
    );
};

export default Flash;
