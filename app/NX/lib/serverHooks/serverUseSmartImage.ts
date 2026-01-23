import { T_Config, T_Frontmatter, T_SmartImage } from '../../types';

export async function serverUseSmartImage(config: T_Config, frontmatter: T_Frontmatter): Promise<T_SmartImage> {

    if (frontmatter?.image) {
        return {
            src: frontmatter.image,
            meta: {
                alt: frontmatter.title || '',
                mode: 'image',
            }
        };
    }
    if (frontmatter?.smartImage && config?.cartridges?.designSystem?.smartImages) {
        const smartImagesArr = config.cartridges.designSystem.smartImages;
        const smartImageObj = smartImagesArr.find((item: any) => item.slug === frontmatter.smartImage);
        if (smartImageObj && smartImageObj.src) {
            return {
                src: smartImageObj.src,
                meta: {
                    alt: (smartImageObj.meta?.alt || ''),
                    mode: 'smartImage'
                }
            };
        }
    }
    if (config?.image) {
        return {
            src: config.image,
            meta: {
                alt: config.title || '',
                mode: 'config'
            }
        };
    }
    // fallback: return empty string if nothing found
    return {
        src: '',
        meta: {
            mode: 'none'
        }
    };
}
