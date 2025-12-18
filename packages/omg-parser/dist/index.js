"use strict";
/**
 * @omg/parser
 *
 * Parser for OMG (OpenAPI Markdown Grammar) files.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadApi = exports.buildEndpoint = exports.resolveDocument = exports.parseReturnsBlock = exports.inferSchemaFromJson = exports.parseSchema = exports.parseHttpBlock = exports.parseDocument = void 0;
// Document parsing
var document_parser_js_1 = require("./document-parser.js");
Object.defineProperty(exports, "parseDocument", { enumerable: true, get: function () { return document_parser_js_1.parseDocument; } });
Object.defineProperty(exports, "parseHttpBlock", { enumerable: true, get: function () { return document_parser_js_1.parseHttpBlock; } });
// Schema parsing
var schema_parser_js_1 = require("./schema-parser.js");
Object.defineProperty(exports, "parseSchema", { enumerable: true, get: function () { return schema_parser_js_1.parseSchema; } });
Object.defineProperty(exports, "inferSchemaFromJson", { enumerable: true, get: function () { return schema_parser_js_1.inferSchemaFromJson; } });
// Returns block parsing
var returns_parser_js_1 = require("./returns-parser.js");
Object.defineProperty(exports, "parseReturnsBlock", { enumerable: true, get: function () { return returns_parser_js_1.parseReturnsBlock; } });
// Resolution
var resolver_js_1 = require("./resolver.js");
Object.defineProperty(exports, "resolveDocument", { enumerable: true, get: function () { return resolver_js_1.resolveDocument; } });
Object.defineProperty(exports, "buildEndpoint", { enumerable: true, get: function () { return resolver_js_1.buildEndpoint; } });
Object.defineProperty(exports, "loadApi", { enumerable: true, get: function () { return resolver_js_1.loadApi; } });
//# sourceMappingURL=index.js.map