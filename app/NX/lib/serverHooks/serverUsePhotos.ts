import { T_ImagesCartridge } from '../../types';
import path from 'path';
import fs from 'fs';

export async function serverUsePhotos(): Promise<T_ImagesCartridge | undefined> {
    const project = process.env.NEXT_PUBLIC_PROJECT || 'nx';
    const configPath = path.join(process.cwd(), 'public', project, 'config.json');
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configRaw);
    return config.cartridges?.images;
}