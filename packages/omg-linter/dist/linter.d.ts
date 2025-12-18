/**
 * OMG Linter
 *
 * A Spectral-inspired linter for OMG documents.
 * Loads rules from .spectral-omg.yaml and validates parsed OMG files.
 */
export type Severity = 'error' | 'warn' | 'hint' | 'off';
export interface LintResult {
    rule: string;
    message: string;
    severity: Severity;
    path?: string[];
    line?: number;
}
export interface LintSummary {
    file: string;
    results: LintResult[];
    errors: number;
    warnings: number;
    hints: number;
}
interface RuleDefinition {
    description?: string;
    message?: string;
    severity: Severity;
    given: string;
    then: RuleThen | RuleThen[];
}
interface RuleThen {
    field?: string;
    function: string;
    functionOptions?: Record<string, unknown>;
}
/**
 * Main linting function
 */
export declare function lintDocument(document: unknown, options?: {
    configPath?: string;
    rules?: string[];
    severity?: Severity;
}): LintResult[];
/**
 * Validate that all schema property names in a document follow a casing convention.
 * Exported for use in custom linting rules.
 *
 * @param target - The document or schema to validate
 * @param options - Options including `casing` (default: 'camel')
 * @returns true if all property names match the expected casing
 *
 * @example
 * evaluateOalPropertyCasing(document, { casing: 'camel' })
 * evaluateOalPropertyCasing(document, { casing: 'snake' })
 */
export declare function evaluateOalPropertyCasing(target: unknown, options?: Record<string, unknown>): boolean;
/**
 * Supported casing conventions
 */
export type CasingType = 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant';
/**
 * Check if a string matches the expected casing convention.
 * Exported for use in custom linting functions.
 *
 * @param name - The string to check
 * @param casing - The expected casing type: 'camel', 'pascal', 'snake', 'kebab', or 'constant'
 * @returns true if the string matches the expected casing
 *
 * @example
 * checkCasing('myVariable', 'camel')    // true
 * checkCasing('MyClass', 'pascal')      // true
 * checkCasing('my_variable', 'snake')   // true
 * checkCasing('my-variable', 'kebab')   // true
 * checkCasing('MY_CONSTANT', 'constant') // true
 */
export declare function checkCasing(name: string, casing: CasingType | string): boolean;
/**
 * Get built-in rules (used when no config file found)
 */
export declare function getBuiltInRules(): Record<string, RuleDefinition>;
/**
 * Create a summary of lint results
 */
export declare function summarizeLintResults(file: string, results: LintResult[]): LintSummary;
export {};
//# sourceMappingURL=linter.d.ts.map