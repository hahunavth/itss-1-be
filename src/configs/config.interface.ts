import type { config as base } from './envs2/default';
import type { config as production } from './envs2/production';

export type Objectype = Record<string, unknown>;
export type Default = typeof base;
export type Production = typeof production;
export type Config = Default & Production;
