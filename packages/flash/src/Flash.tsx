import React from 'react';
import styles from './lib/Flash.module.css';
import type { I_Flash } from './types';

export const Flash: React.FC<I_Flash> = ({ children, id }) => {
    return (
        <div id={id} className={styles.FlashStage}>
            {children}
        </div>
    );
};

export default Flash;
