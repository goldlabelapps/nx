import { T_Config, T_Frontmatter, T_Photo } from '../../types';

export async function serverUsePhoto(config: T_Config, frontmatter: T_Frontmatter): Promise<T_Photo> {
    // Priority: frontmatter.image > frontmatter.flickr (lookup) > config.image
    if (frontmatter?.image) {
        return {
            src: frontmatter.image,
            meta: {
                title: frontmatter.title || '',
                alt: frontmatter.title || '',
                message: 'Using image from frontmatter.image'
            }
        };
    }
    if (frontmatter?.flickr && config?.cartridges?.images?.flickr) {
        const flickrArr = config.cartridges.images.flickr;
        const flickrObj = flickrArr.find((item: any) => item.slug === frontmatter.flickr);
        if (flickrObj && flickrObj.src) {
            return {
                src: flickrObj.src,
                meta: {
                    title: flickrObj.title || '',
                    alt: flickrObj.title || '',
                    message: 'Using image from config Flickr array via frontmatter.flickr'
                }
            };
        }
    }
    if (config?.image) {
        return {
            src: config.image,
            meta: {
                title: config.title || '',
                alt: config.title || '',
                message: 'Using fallback image from config.image'
            }
        };
    }
    // fallback: return empty string if nothing found
    return {
        src: '',
        meta: {
            message: 'No image found in frontmatter or config.'
        }
    };
}
