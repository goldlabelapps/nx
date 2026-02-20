import React from 'react';

// Interface defining parameters and options for Chatbot
export interface I_Chatbot {
    // Define required parameters here
    // Example: userId: string;
    id?: string;
    title?: string;
    logo?: React.ReactNode;


    // Optional options
    // Example: theme?: string;
    [key: string]: any; // Placeholder for extensibility
}


// Optional options
export interface I_Resonse {
    text: string;
    from: 'user' | 'bot';
    avatar?: React.ReactNode;
    [key: string]: any; // Placeholder for extensibility
}
