/**
 * Converts OpenAPI JSON Schema to OMG type syntax
 */
import type { OpenAPISchema, OpenAPIComponents } from './types.js';
export interface ConversionContext {
    components?: OpenAPIComponents;
    indent?: number;
    inlineRefs?: boolean;
}
/**
 * Convert an OpenAPI schema to OMG type syntax string
 */
export declare function schemaToOmg(schema: OpenAPISchema, ctx?: ConversionContext): string;
/**
 * Convert parameters to OMG block content
 */
export declare function parametersToOmg(parameters: Array<{
    name: string;
    schema?: OpenAPISchema;
    description?: string;
    required?: boolean;
}>, ctx?: ConversionContext): string;
//# sourceMappingURL=schema-converter.d.ts.map