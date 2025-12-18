"use strict";
/**
 * omg-importer - OpenAPI to OMG converter
 *
 * Import existing OpenAPI 3.x specifications into OMG format
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parametersToOmg = exports.schemaToOmg = exports.importOpenApi = void 0;
var importer_js_1 = require("./importer.js");
Object.defineProperty(exports, "importOpenApi", { enumerable: true, get: function () { return importer_js_1.importOpenApi; } });
var schema_converter_js_1 = require("./schema-converter.js");
Object.defineProperty(exports, "schemaToOmg", { enumerable: true, get: function () { return schema_converter_js_1.schemaToOmg; } });
Object.defineProperty(exports, "parametersToOmg", { enumerable: true, get: function () { return schema_converter_js_1.parametersToOmg; } });
//# sourceMappingURL=index.js.map