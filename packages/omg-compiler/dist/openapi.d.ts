/**
 * OpenAPI 3.1 Compiler
 *
 * Transforms parsed OMG into OpenAPI 3.1 specification.
 *
 * Features:
 * - Extracts deeply nested objects to components/schemas for legibility
 * - Supports recursive/self-referencing types
 * - Generates meaningful schema names from context
 */
import type { ParsedApi } from '@omg/parser';
export interface OpenApiSpec {
    openapi: '3.1.0';
    info: {
        title: string;
        version: string;
        description?: string;
        contact?: {
            name?: string;
            email?: string;
            url?: string;
        };
    };
    servers?: Array<{
        url: string;
        description?: string;
    }>;
    paths: Record<string, PathItem>;
    components?: {
        schemas?: Record<string, SchemaObject>;
        parameters?: Record<string, ParameterObject>;
        responses?: Record<string, ResponseObject>;
    };
}
interface PathItem {
    get?: OperationObject;
    post?: OperationObject;
    put?: OperationObject;
    patch?: OperationObject;
    delete?: OperationObject;
    head?: OperationObject;
    options?: OperationObject;
}
interface OperationObject {
    operationId: string;
    summary?: string;
    description?: string;
    tags?: string[];
    deprecated?: boolean;
    parameters?: ParameterObject[];
    requestBody?: RequestBodyObject;
    responses: Record<string, ResponseObject>;
    /** List of operationIds that should be called before this endpoint */
    'x-follows'?: string[];
    /** Webhooks that may be fired in response to this endpoint */
    'x-webhooks-resulting'?: string[];
    /** Webhooks to listen to for updates from this endpoint's operation */
    'x-webhooks-listen'?: string[];
}
interface ParameterObject {
    name: string;
    in: 'path' | 'query' | 'header';
    required?: boolean;
    description?: string;
    schema: SchemaObject;
}
interface RequestBodyObject {
    required?: boolean;
    content: Record<string, MediaTypeObject>;
}
interface ResponseObject {
    description: string;
    content?: Record<string, MediaTypeObject>;
}
interface MediaTypeObject {
    schema: SchemaObject;
}
interface SchemaObject {
    type?: string;
    format?: string;
    description?: string;
    properties?: Record<string, SchemaObject>;
    items?: SchemaObject;
    required?: string[];
    enum?: (string | number | boolean)[];
    oneOf?: SchemaObject[];
    allOf?: SchemaObject[];
    nullable?: boolean;
    minimum?: number;
    maximum?: number;
    minLength?: number;
    maxLength?: number;
    minItems?: number;
    maxItems?: number;
    pattern?: string;
    default?: unknown;
    $ref?: string;
}
/**
 * Configuration for schema extraction behavior
 */
interface CompilerConfig {
    /** Maximum nesting depth before extracting to $ref (default: 2) */
    maxInlineDepth: number;
    /** Minimum properties for extraction at depth threshold (default: 2) */
    minPropertiesForExtraction: number;
}
/**
 * Compile a ParsedApi to OpenAPI 3.1
 */
export declare function compileToOpenApi(api: ParsedApi, config?: Partial<CompilerConfig>): OpenApiSpec;
export {};
//# sourceMappingURL=openapi.d.ts.map