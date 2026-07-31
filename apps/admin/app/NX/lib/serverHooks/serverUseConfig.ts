import { T_Config } from '../../types';
import path from 'path';
import fs from 'fs';

export async function serverUseConfig(): Promise<T_Config> {
    const configPath = path.join(process.cwd(), 'public', 'nxadmin', 'config.json');
    const configRaw = fs.readFileSync(configPath, 'utf-8');
    const config: T_Config = JSON.parse(configRaw);
    return config;
}