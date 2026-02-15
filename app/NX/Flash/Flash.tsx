import React from 'react';
import styles from './lib/Flash.module.css';

export interface I_Flash {
    children?: React.ReactNode;
    id?: string;
}

export const Flash: React.FC<I_Flash> = ({ children, id }) => {
    return (
        <div id={id} className={styles.FlashStage}>
            {children}
        </div>
    );
};

export default Flash;
