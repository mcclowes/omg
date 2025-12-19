/**
 * Mock Server
 *
 * Creates an Express HTTP server with mock endpoints based on ParsedApi
 */
import { type Express, type Request, type Response } from 'express';
import type { ParsedApi } from 'omg-parser';
export interface MockServerOptions {
    /** Port to listen on */
    port?: number;
    /** Base URL prefix (e.g., "/api/v1") */
    basePath?: string;
    /** Enable CORS */
    cors?: boolean;
    /** Seed for deterministic mock data */
    seed?: number;
    /** Delay in milliseconds before responding */
    delay?: number;
    /** Enable request logging */
    logging?: boolean;
    /** Use Vague for realistic mock data generation (default: true) */
    useVague?: boolean;
    /** Custom response handlers */
    handlers?: Record<string, (req: Request, res: Response) => void>;
}
export interface MockServer {
    /** The Express app instance */
    app: Express;
    /** Start the server */
    start(): Promise<void>;
    /** Stop the server */
    stop(): Promise<void>;
    /** Get the server URL */
    url: string;
    /** Get registered routes */
    routes: RouteInfo[];
}
export interface RouteInfo {
    method: string;
    path: string;
    operationId: string;
    description: string;
}
/**
 * Create a mock server from a ParsedApi
 */
export declare function createMockServer(api: ParsedApi, options?: MockServerOptions): MockServer;
/**
 * Create and start a mock server
 */
export declare function startMockServer(api: ParsedApi, options?: MockServerOptions): Promise<MockServer>;
//# sourceMappingURL=server.d.ts.map