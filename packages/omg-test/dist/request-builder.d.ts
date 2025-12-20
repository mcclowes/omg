/**
 * Request Builder
 *
 * Builds HTTP requests from OpenAPI endpoint specifications.
 * Handles path parameters, query parameters, headers, and request bodies.
 */
import type { EndpointSpec, TestOptions } from './types.js';
export interface BuiltRequest {
    url: string;
    method: string;
    headers: Record<string, string>;
    body?: string;
}
export interface RequestBuildResult {
    request?: BuiltRequest;
    error?: string;
    missingParams?: string[];
}
/**
 * Build an HTTP request from an endpoint spec
 */
export declare function buildRequest(endpoint: EndpointSpec, options: TestOptions): RequestBuildResult;
/**
 * Extract endpoint specifications from an OpenAPI document
 */
export declare function extractEndpoints(openapi: {
    paths: Record<string, Record<string, unknown>>;
    components?: {
        schemas?: Record<string, unknown>;
    };
}): EndpointSpec[];
//# sourceMappingURL=request-builder.d.ts.map