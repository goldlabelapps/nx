import { T_Config } from '../../types';
import path from 'path';
import fs from 'fs';
import { normalizeTenant } from '../normalizeTenant';

export async function serverUseConfig(): Promise<T_Config> {
    const project = normalizeTenant();
    const configPath = path.join(process.cwd(), 'public', project, 'config.json');
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    const config: T_Config = JSON.parse(configRaw);
    return config;
}