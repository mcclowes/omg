"use strict";
/**
 * omg-compiler
 *
 * Compiles OMG to OpenAPI 3.1
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectFormat = exports.serialize = exports.compileToOpenApi = void 0;
var openapi_js_1 = require("./openapi.js");
Object.defineProperty(exports, "compileToOpenApi", { enumerable: true, get: function () { return openapi_js_1.compileToOpenApi; } });
var output_js_1 = require("./output.js");
Object.defineProperty(exports, "serialize", { enumerable: true, get: function () { return output_js_1.serialize; } });
Object.defineProperty(exports, "detectFormat", { enumerable: true, get: function () { return output_js_1.detectFormat; } });
//# sourceMappingURL=index.js.map