/**
 * Vague Mock Generator
 *
 * Generates realistic mock data using Vague DSL
 */
import type { OmgSchema, ParsedApi } from 'omg-parser';
export interface VagueGeneratorOptions {
    /** Seed for deterministic generation */
    seed?: number;
    /** Types from the API for reference resolution */
    types?: Record<string, OmgSchema>;
}
/**
 * Generate mock data for a schema using Vague
 */
export declare function generateWithVague(schema: OmgSchema | null, options?: VagueGeneratorOptions): Promise<unknown>;
/**
 * Generate mock array data using Vague
 */
export declare function generateArrayWithVague(itemSchema: OmgSchema, count: number, options?: VagueGeneratorOptions): Promise<unknown[]>;
/**
 * Create a Vague generator for an API
 */
export declare function createVagueGenerator(api: ParsedApi, seed?: number): {
    generate: (schema: OmgSchema | null) => Promise<unknown>;
    generateArray: (schema: OmgSchema, count: number) => Promise<unknown[]>;
};
//# sourceMappingURL=vague-generator.d.ts.map