"use strict";
/**
 * Output Formatters
 *
 * Serialize OpenAPI spec to YAML or JSON.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serialize = serialize;
exports.detectFormat = detectFormat;
const yaml_1 = __importDefault(require("yaml"));
/**
 * Serialize OpenAPI spec to string
 */
function serialize(spec, format) {
    switch (format) {
        case 'yaml':
            return yaml_1.default.stringify(spec, {
                indent: 2,
                lineWidth: 0, // Don't wrap lines
                defaultStringType: 'QUOTE_DOUBLE',
                defaultKeyType: 'PLAIN',
            });
        case 'json':
            return JSON.stringify(spec, null, 2);
        default:
            throw new Error(`Unknown format: ${format}`);
    }
}
/**
 * Detect format from file extension
 */
function detectFormat(filename) {
    if (filename.endsWith('.json')) {
        return 'json';
    }
    return 'yaml';
}
//# sourceMappingURL=output.js.map