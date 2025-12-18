/**
 * OMG Linter
 *
 * A Spectral-inspired linter for OMG documents.
 * Loads rules from .spectral-omg.yaml and validates parsed OMG files.
 */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
/**
 * Load and parse the Spectral OMG config
 */
function loadConfig(configPath) {
    if (!fs.existsSync(configPath)) {
        return null;
    }
    const content = fs.readFileSync(configPath, 'utf-8');
    return yaml.load(content);
}
/**
 * Main linting function
 */
export function lintDocument(document, options = {}) {
    const results = [];
    // Find config file
    const configPath = options.configPath || findConfigFile();
    const config = configPath ? loadConfig(configPath) : null;
    // Use built-in rules if no config found
    const rules = config?.rules || getBuiltInRules();
    // Filter rules if specific ones requested
    const rulesToRun = options.rules
        ? Object.fromEntries(Object.entries(rules).filter(([name]) => options.rules.includes(name)))
        : rules;
    // Run each rule
    for (const [ruleName, ruleConfig] of Object.entries(rulesToRun)) {
        // Skip disabled rules
        if (ruleConfig === false || ruleConfig === 'off') {
            continue;
        }
        const rule = typeof ruleConfig === 'string'
            ? getBuiltInRules()[ruleName]
            : ruleConfig;
        if (!rule || typeof rule !== 'object') {
            continue;
        }
        // Skip rules below severity threshold
        if (options.severity && !meetsMinSeverity(rule.severity, options.severity)) {
            continue;
        }
        // Run the rule
        const ruleResults = runRule(ruleName, rule, document);
        results.push(...ruleResults);
    }
    return results;
}
/**
 * Run a single rule against the document
 */
function runRule(ruleName, rule, document) {
    const results = [];
    // Get the target from the document based on 'given' path
    const targets = resolveGivenPath(rule.given, document);
    // Handle array of 'then' conditions
    const conditions = Array.isArray(rule.then) ? rule.then : [rule.then];
    for (const target of targets) {
        for (const condition of conditions) {
            const passed = evaluateCondition(condition, target.value, document);
            if (!passed) {
                results.push({
                    rule: ruleName,
                    message: formatMessage(rule.message || rule.description || `Rule ${ruleName} failed`, target.value),
                    severity: rule.severity,
                    path: target.path,
                });
            }
        }
    }
    return results;
}
/**
 * Resolve a JSONPath-like 'given' expression to targets in the document
 */
function resolveGivenPath(given, document) {
    const results = [];
    // Handle aliases
    if (given.startsWith('#')) {
        given = expandAlias(given);
    }
    // Simple path resolution (not full JSONPath)
    if (given === '$') {
        results.push({ value: document, path: [] });
        return results;
    }
    // Handle $.document - extract from wrapper if present
    if (given === '$.document') {
        const wrapper = document;
        const doc = wrapper?.document ?? document;
        results.push({ value: doc, path: ['document'] });
        return results;
    }
    // Parse path segments
    const segments = given
        .replace(/^\$\.?/, '')
        .split('.')
        .filter((s) => s);
    let current = document;
    const currentPath = [];
    for (const segment of segments) {
        if (current === null || current === undefined) {
            return results;
        }
        // Handle array wildcard [*]
        if (segment.endsWith('[*]')) {
            const key = segment.slice(0, -3);
            if (key) {
                current = current[key];
                currentPath.push(key);
            }
            if (Array.isArray(current)) {
                for (let i = 0; i < current.length; i++) {
                    results.push({
                        value: current[i],
                        path: [...currentPath, String(i)],
                    });
                }
                return results;
            }
        }
        else {
            current = current[segment];
            currentPath.push(segment);
        }
    }
    if (current !== undefined) {
        results.push({ value: current, path: currentPath });
    }
    return results;
}
/**
 * Expand aliases like #FrontMatter to actual paths
 */
function expandAlias(alias) {
    const aliases = {
        '#OmgDocument': '$.document',
        '#OalDocument': '$.document', // Alias for config compatibility
        '#FrontMatter': '$.document.frontMatter',
        '#Blocks': '$.document.resolvedBlocks[*]',
        '#ResponseBlocks': '$.document.resolvedBlocks[*]',
        '#QueryBlocks': '$.document.resolvedBlocks[*]',
        '#BodyBlocks': '$.document.resolvedBlocks[*]',
    };
    return aliases[alias] || alias.replace('#', '$.');
}
/**
 * Evaluate a rule condition
 */
function evaluateCondition(condition, target, _document) {
    // Get the value to check
    let value = target;
    if (condition.field && target && typeof target === 'object') {
        value = target[condition.field];
    }
    // Run the function
    switch (condition.function) {
        case 'truthy':
            return !!value;
        case 'falsy':
            return !value;
        case 'defined':
            return value !== undefined;
        case 'undefined':
            return value === undefined;
        case 'enumeration': {
            const options = condition.functionOptions;
            return options?.values?.includes(value) ?? true;
        }
        case 'pattern': {
            const options = condition.functionOptions;
            if (typeof value !== 'string')
                return true;
            if (options?.match) {
                const regex = new RegExp(options.match);
                if (!regex.test(value))
                    return false;
            }
            if (options?.notMatch) {
                const regex = new RegExp(options.notMatch);
                if (regex.test(value))
                    return false;
            }
            return true;
        }
        case 'length': {
            const options = condition.functionOptions;
            if (typeof value === 'string' || Array.isArray(value)) {
                if (options?.min !== undefined && value.length < options.min)
                    return false;
                if (options?.max !== undefined && value.length > options.max)
                    return false;
            }
            return true;
        }
        case 'casing': {
            const options = condition.functionOptions;
            if (typeof value !== 'string')
                return true;
            switch (options?.type) {
                case 'camel':
                    return /^[a-z][a-zA-Z0-9]*$/.test(value);
                case 'pascal':
                    return /^[A-Z][a-zA-Z0-9]*$/.test(value);
                case 'kebab':
                    return /^[a-z][a-z0-9-]*$/.test(value);
                case 'snake':
                    return /^[a-z][a-z0-9_]*$/.test(value);
                case 'constant':
                    return /^[A-Z][A-Z0-9_]*$/.test(value);
                default:
                    return true;
            }
        }
        // Custom OMG functions
        case 'omg-response-required':
            return evaluateOmgResponseRequired(target, condition.functionOptions);
        case 'omg-annotation-valid':
            return evaluateOmgAnnotationValid(target, condition.functionOptions);
        case 'omg-path-parameter-defined':
            return evaluateOmgPathParameter(target, condition.functionOptions);
        case 'omg-property-casing':
        case 'oal-property-casing':
            return evaluateOalPropertyCasing(target, condition.functionOptions);
        case 'omg-enum-values':
            return evaluateOmgEnumValues(target, condition.functionOptions);
        case 'omg-type-valid':
            return evaluateOmgTypeValid(target, condition.functionOptions);
        default:
            // Unknown function, pass by default
            return true;
    }
}
// Custom OMG validation functions
function evaluateOmgResponseRequired(target, options) {
    const doc = target;
    const blocks = (doc?.resolvedBlocks || doc?.blocks || []);
    const responseBlocks = blocks.filter((b) => b.type && b.type.startsWith('omg.response'));
    if (responseBlocks.length === 0)
        return false;
    if (options?.requireSuccess) {
        const hasSuccess = responseBlocks.some((b) => {
            if (b.type === 'omg.response')
                return true;
            const match = b.type.match(/omg\.response\.(\d+)/);
            if (match) {
                const status = parseInt(match[1], 10);
                return status >= 200 && status < 300;
            }
            return false;
        });
        if (!hasSuccess)
            return false;
    }
    if (options?.checkExamples) {
        const hasExample = blocks.some((b) => b.type && b.type.startsWith('omg.example'));
        if (!hasExample)
            return false;
    }
    return true;
}
function evaluateOmgAnnotationValid(target, options) {
    const doc = target;
    const rule = options?.rule;
    if (!rule)
        return true;
    switch (rule) {
        case 'get-no-body': {
            const method = doc?.frontMatter?.method;
            const blocks = (doc?.resolvedBlocks || doc?.blocks || []);
            const hasBody = blocks.some((b) => b.type === 'omg.body');
            return !(method === 'GET' && hasBody);
        }
        case 'post-put-has-body': {
            const method = doc?.frontMatter?.method;
            const blocks = (doc?.resolvedBlocks || doc?.blocks || []);
            const hasBody = blocks.some((b) => b.type === 'omg.body');
            if (method === 'POST' || method === 'PUT') {
                return hasBody;
            }
            return true;
        }
        case 'list-needs-pagination': {
            const operationId = (doc?.frontMatter
                ?.operationId || '');
            if (!operationId.startsWith('list-'))
                return true;
            const blocks = (doc?.resolvedBlocks || doc?.blocks || []);
            const queryBlock = blocks.find((b) => b.type === 'omg.query');
            if (!queryBlock?.parsed)
                return false;
            const props = queryBlock.parsed.properties || {};
            return 'page' in props && 'pageSize' in props;
        }
        default:
            return true;
    }
}
function evaluateOmgPathParameter(target, options) {
    if (typeof target !== 'string')
        return true;
    const casing = options?.casing;
    const paramRegex = /\{([^}]+)\}/g;
    let match;
    while ((match = paramRegex.exec(target)) !== null) {
        const param = match[1];
        if (casing === 'camelCase') {
            if (!/^[a-z][a-zA-Z0-9]*$/.test(param))
                return false;
        }
    }
    return true;
}
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
export function evaluateOalPropertyCasing(target, options) {
    const doc = target;
    const blocks = (doc?.resolvedBlocks || doc?.blocks || []);
    const expectedCasing = options?.casing || 'camel';
    // Check all property names in all schema blocks
    for (const block of blocks) {
        if (!block.parsed)
            continue;
        const invalidProps = findInvalidCasingProperties(block.parsed, expectedCasing);
        if (invalidProps.length > 0) {
            return false;
        }
    }
    return true;
}
/**
 * Recursively find properties with invalid casing in a schema
 */
function findInvalidCasingProperties(schema, expectedCasing, path = []) {
    const invalidProps = [];
    if (!schema || typeof schema !== 'object') {
        return invalidProps;
    }
    const schemaObj = schema;
    // Check object properties
    if (schemaObj.kind === 'object' && schemaObj.properties) {
        const properties = schemaObj.properties;
        for (const propName of Object.keys(properties)) {
            if (!matchesCasing(propName, expectedCasing)) {
                invalidProps.push([...path, propName].join('.'));
            }
            // Recursively check nested schemas
            const nested = findInvalidCasingProperties(properties[propName], expectedCasing, [...path, propName]);
            invalidProps.push(...nested);
        }
    }
    // Check array items
    if (schemaObj.kind === 'array' && schemaObj.items) {
        const nested = findInvalidCasingProperties(schemaObj.items, expectedCasing, [...path, '[]']);
        invalidProps.push(...nested);
    }
    // Check union types
    if (schemaObj.kind === 'union' && Array.isArray(schemaObj.types)) {
        for (let i = 0; i < schemaObj.types.length; i++) {
            const nested = findInvalidCasingProperties(schemaObj.types[i], expectedCasing, [...path, `variant${i + 1}`]);
            invalidProps.push(...nested);
        }
    }
    // Check intersection types
    if (schemaObj.kind === 'intersection' && Array.isArray(schemaObj.types)) {
        for (let i = 0; i < schemaObj.types.length; i++) {
            const nested = findInvalidCasingProperties(schemaObj.types[i], expectedCasing, [...path, `part${i + 1}`]);
            invalidProps.push(...nested);
        }
    }
    return invalidProps;
}
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
export function checkCasing(name, casing) {
    switch (casing) {
        case 'camel':
            // camelCase: starts with lowercase, no underscores or hyphens
            return /^[a-z][a-zA-Z0-9]*$/.test(name);
        case 'pascal':
            // PascalCase: starts with uppercase, no underscores or hyphens
            return /^[A-Z][a-zA-Z0-9]*$/.test(name);
        case 'snake':
            // snake_case: lowercase with underscores
            return /^[a-z][a-z0-9_]*$/.test(name);
        case 'kebab':
            // kebab-case: lowercase with hyphens
            return /^[a-z][a-z0-9-]*$/.test(name);
        case 'constant':
            // CONSTANT_CASE: uppercase with underscores
            return /^[A-Z][A-Z0-9_]*$/.test(name);
        default:
            return true;
    }
}
// Internal alias for backward compatibility
const matchesCasing = checkCasing;
function evaluateOmgEnumValues(_target, _options) {
    // Enum validation - simplified for now
    return true;
}
function evaluateOmgTypeValid(_target, _options) {
    // Type validation - simplified for now
    return true;
}
/**
 * Format a message with variable interpolation
 */
function formatMessage(template, value) {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        if (key === 'value') {
            return typeof value === 'string' ? value : JSON.stringify(value);
        }
        if (typeof value === 'object' && value !== null) {
            return String(value[key] ?? '');
        }
        return '';
    });
}
/**
 * Check if severity meets minimum threshold
 */
function meetsMinSeverity(severity, minSeverity) {
    const levels = {
        error: 3,
        warn: 2,
        hint: 1,
        off: 0,
    };
    return levels[severity] >= levels[minSeverity];
}
/**
 * Find the config file by searching up the directory tree
 */
function findConfigFile() {
    let dir = process.cwd();
    const root = path.parse(dir).root;
    // Config file names to search for (in priority order)
    const configNames = ['.spectral-oal.yaml', '.spectral-omg.yaml'];
    while (dir !== root) {
        for (const configName of configNames) {
            const configPath = path.join(dir, configName);
            if (fs.existsSync(configPath)) {
                return configPath;
            }
        }
        dir = path.dirname(dir);
    }
    return null;
}
/**
 * Get built-in rules (used when no config file found)
 */
export function getBuiltInRules() {
    return {
        'omg-frontmatter-method-required': {
            description: 'Front matter must include HTTP method',
            message: "Missing 'method' in front matter",
            severity: 'error',
            given: '#FrontMatter',
            then: { field: 'method', function: 'truthy' },
        },
        'omg-frontmatter-path-required': {
            description: 'Front matter must include API path',
            message: "Missing 'path' in front matter",
            severity: 'error',
            given: '#FrontMatter',
            then: { field: 'path', function: 'truthy' },
        },
        'omg-frontmatter-operationid-required': {
            description: 'Front matter must include operationId',
            message: "Missing 'operationId' in front matter",
            severity: 'error',
            given: '#FrontMatter',
            then: { field: 'operationId', function: 'truthy' },
        },
        'omg-frontmatter-tags-required': {
            description: 'Front matter should include tags',
            message: "Missing 'tags' in front matter",
            severity: 'warn',
            given: '#FrontMatter',
            then: { field: 'tags', function: 'truthy' },
        },
        'omg-frontmatter-method-valid': {
            description: 'HTTP method must be valid',
            message: 'Invalid HTTP method',
            severity: 'error',
            given: '#FrontMatter.method',
            then: {
                function: 'enumeration',
                functionOptions: { values: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
            },
        },
        'omg-operationid-kebab-case': {
            description: 'operationId should be kebab-case',
            message: "operationId '{{value}}' should be kebab-case",
            severity: 'warn',
            given: '#FrontMatter.operationId',
            then: {
                function: 'pattern',
                functionOptions: { match: '^[a-z][a-z0-9]*(-[a-z0-9]+)*$' },
            },
        },
        'omg-path-leading-slash': {
            description: 'Path must start with a forward slash',
            message: "Path must start with '/'",
            severity: 'error',
            given: '#FrontMatter.path',
            then: { function: 'pattern', functionOptions: { match: '^/' } },
        },
        'omg-path-no-trailing-slash': {
            description: 'Path should not end with a forward slash',
            message: "Path should not end with '/'",
            severity: 'warn',
            given: '#FrontMatter.path',
            then: { function: 'pattern', functionOptions: { notMatch: '/$' } },
        },
        'omg-response-required': {
            description: 'Endpoint must define at least one response',
            message: 'No response block defined',
            severity: 'error',
            given: '#OmgDocument',
            then: { function: 'omg-response-required' },
        },
        'omg-title-required': {
            description: 'Endpoint must have a title',
            message: 'Missing title (H1 heading)',
            severity: 'error',
            given: '#OmgDocument',
            then: { field: 'title', function: 'truthy' },
        },
        'omg-description-required': {
            description: 'Endpoint should have a description',
            message: 'Missing description',
            severity: 'warn',
            given: '#OmgDocument',
            then: { field: 'description', function: 'truthy' },
        },
        'omg-get-no-body': {
            description: 'GET requests should not have a request body',
            message: 'GET requests should not have a request body',
            severity: 'error',
            given: '#OmgDocument',
            then: {
                function: 'omg-annotation-valid',
                functionOptions: { rule: 'get-no-body' },
            },
        },
        'omg-tags-no-spaces': {
            description: 'Tags should not contain spaces',
            message: 'Tag should not contain spaces',
            severity: 'error',
            given: '#FrontMatter.tags[*]',
            then: { function: 'pattern', functionOptions: { notMatch: '\\s' } },
        },
        'omg-property-casing': {
            description: 'Property names should follow consistent casing convention',
            message: 'Property names should be camelCase',
            severity: 'warn',
            given: '#OmgDocument',
            then: {
                function: 'omg-property-casing',
                functionOptions: { casing: 'camel' },
            },
        },
        'oal-property-casing': {
            description: 'Property names should follow consistent casing convention',
            message: 'Property names should be camelCase',
            severity: 'warn',
            given: '#OalDocument',
            then: {
                function: 'oal-property-casing',
                functionOptions: { casing: 'camel' },
            },
        },
    };
}
/**
 * Create a summary of lint results
 */
export function summarizeLintResults(file, results) {
    return {
        file,
        results,
        errors: results.filter((r) => r.severity === 'error').length,
        warnings: results.filter((r) => r.severity === 'warn').length,
        hints: results.filter((r) => r.severity === 'hint').length,
    };
}
//# sourceMappingURL=linter.js.map