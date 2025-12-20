/**
 * Mock Data Generator
 *
 * Generates realistic mock data based on OmgSchema types
 */
import type { OmgSchema, ParsedApi } from 'omg-parser';
export interface MockGeneratorOptions {
    /** Seed for deterministic generation */
    seed?: number;
    /** Types from the API for reference resolution */
    types?: Record<string, OmgSchema>;
    /** Maximum depth for nested objects (prevents infinite recursion) */
    maxDepth?: number;
    /** Minimum array length */
    minArrayLength?: number;
    /** Maximum array length */
    maxArrayLength?: number;
}
export declare class MockGenerator {
    private rng;
    private types;
    private maxDepth;
    private minArrayLength;
    private maxArrayLength;
    private currentDepth;
    constructor(options?: MockGeneratorOptions);
    /**
     * Generate mock data for a schema
     */
    generate(schema: OmgSchema | null): unknown;
    /**
     * Generate a primitive value
     */
    private generatePrimitive;
    /**
     * Generate a string value based on constraints
     */
    private generateString;
    /**
     * Generate an integer value based on constraints
     */
    private generateInteger;
    /**
     * Generate a number value based on constraints
     */
    private generateNumber;
    /**
     * Generate a date string (YYYY-MM-DD)
     */
    private generateDate;
    /**
     * Generate a datetime string (ISO 8601)
     */
    private generateDatetime;
    /**
     * Generate a UUID v4
     */
    private generateUuid;
    /**
     * Generate an object
     */
    private generateObject;
    /**
     * Generate an array
     */
    private generateArray;
    /**
     * Generate intersection type (merge objects)
     */
    private generateIntersection;
    /**
     * Generate referenced type
     */
    private generateReference;
    /**
     * Generate placeholder for max depth exceeded
     */
    private generatePlaceholder;
    /**
     * Parse annotations into constraints
     */
    private parseAnnotations;
}
/**
 * Create a mock generator for an API
 */
export declare function createMockGenerator(api: ParsedApi, seed?: number): MockGenerator;
//# sourceMappingURL=mock-generator.d.ts.map