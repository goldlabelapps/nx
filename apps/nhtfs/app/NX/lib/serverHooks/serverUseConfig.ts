import { T_Config } from '../../types';
import fs from 'fs';
import { resolveNhtfsAppPath } from '../markdownRoots';

export async function serverUseConfig(): Promise<T_Config> {
    const configPath = resolveNhtfsAppPath('public', 'nx', 'config.json');
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    const config: T_Config = JSON.parse(configRaw);
    return config;
}