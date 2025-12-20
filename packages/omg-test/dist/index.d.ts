/**
 * OMG Contract Testing
 *
 * Validate live APIs against OMG specifications.
 *
 * @example
 * ```typescript
 * import { runContractTests, formatResults } from 'omg-test';
 *
 * const summary = await runContractTests('api.omg.md', {
 *   baseUrl: 'https://api.example.com',
 *   auth: { type: 'bearer', value: 'your-token' },
 * });
 *
 * console.log(formatResults(summary, 'console'));
 * ```
 */
export { runContractTests } from './runner.js';
export { formatResults } from './reporter.js';
export { buildRequest, extractEndpoints } from './request-builder.js';
export { validateResponse, validateStatusCode, validateRequiredFields } from './validator.js';
export type { TestOptions, TestResult, TestSummary, CheckResult, AuthConfig, EndpointSpec, ParameterSpec, RequestBodySpec, ResponseSpec, SchemaSpec, ReportFormat, } from './types.js';
//# sourceMappingURL=index.d.ts.map