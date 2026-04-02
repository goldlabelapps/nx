import { useDispatch } from '../../Uberedux';
import { useDesignSystem } from './useDesignSystem';
import { fetchMarkdown } from '../actions/fetchMarkdown';
import { useCallback } from 'react';

// Returns [content, loadContent]
export function useMarkdown(slug: string) {
    const designSystem = useDesignSystem() || {};
    const markdownArr = Array.isArray(designSystem.markdown) ? designSystem.markdown : [];
    // Return the first non-null item for the slug, or null
    return markdownArr.find((item: any) => item && item.slug === slug) || null;
}