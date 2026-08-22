// Main component
import Taxonomy from './Taxonomy';

// Hooks
import { useTerms } from './hooks/useTerms';

// Actions
import { saveTerm } from './actions/saveTerm';
import { deleteTerm } from './actions/deleteTerm';

// Types
export type { T_Category, T_Tag, T_TaxonomyCollection } from './types';

export {
    // Main component
    Taxonomy,
    // Hooks
    useTerms,
    // Actions
    saveTerm,
    deleteTerm,
};
