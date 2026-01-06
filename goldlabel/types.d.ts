/**
 * Goldlabel Type Definitions
 * Definitive exported types for the goldlabel module
 */


/**
 * Markdown Type Definition
 * Defines the shape of a properly formatted markdown 
 * document in the Firestore `markdown` collection
 */
export type TMarkdown = {
    id: string;
    published: boolean;
    createdAt: string;
    updatedAt: string;
    frontmatter?: {
        title?: string;
        description?: string;
        slug?: string;
        tags?: string;
        icon?: string;
        order?: number;
        image?: string;
        price?: {
            amount: number;
            currency: string;
        };
    };
    body: string;
};


/**
 * Feedback response structure
 * Standard format for API responses with status and messaging
 */
export type TFeedback = {
    status: 'success' | 'warning' | 'info' | 'error';
    title: string;
    description: string;
};

/**
 * Standard API response structure
 * Consistent format for all API endpoints
 */
export type TApiResponse<T = any> = {
    time: number; // Unix epoch timestamp
    app: string; // Application name from package.json
    feedback: TFeedback;
    request: {
        method: string;
        action: string;
        params?: Record<string, any>;
    };
    response: T & {
        id?: string;
        ids?: string[];
        count?: number;
        pagination?: {
            page: number;
            limit: number;
            total: number;
        };
    };
};


