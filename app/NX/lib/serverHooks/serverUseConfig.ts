import { T_Config } from '../../types';
import path from 'path';
import fs from 'fs';

export async function serverUseConfig(): Promise<T_Config> {
    const project = process.env.NEXT_PUBLIC_TENANT || 'nx';
    const configPath = path.join(process.cwd(), 'public', project, 'config.json');
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    const config: T_Config = JSON.parse(configRaw);
    return config;
}