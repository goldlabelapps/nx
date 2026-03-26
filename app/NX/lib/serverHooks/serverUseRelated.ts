// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";


/**
 * Takes an array of tags and returns array of page objects.
 * @param tags Array of tags to find related pages for
 * @returns Array of page objects with a title property
 */
export function serverUseRelated(
    tags?: string[],
): { 
    title: string,
    slug: string,
 }[] {

    console.log('serverUseRelated', tags);

    const related = [
        {
            title: 'Related Page 1',
            slug: 'related-page-1',
        },
        {
            title: 'Related Page 2',
            slug: 'related-page-2',
        }
    ];
    return related;
}
