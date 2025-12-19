"use strict";
/**
 * OMG Mock Server
 *
 * Generate mock API servers from OMG specifications
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMockServer = exports.createMockServer = exports.createMockGenerator = exports.MockGenerator = void 0;
var mock_generator_js_1 = require("./mock-generator.js");
Object.defineProperty(exports, "MockGenerator", { enumerable: true, get: function () { return mock_generator_js_1.MockGenerator; } });
Object.defineProperty(exports, "createMockGenerator", { enumerable: true, get: function () { return mock_generator_js_1.createMockGenerator; } });
var server_js_1 = require("./server.js");
Object.defineProperty(exports, "createMockServer", { enumerable: true, get: function () { return server_js_1.createMockServer; } });
Object.defineProperty(exports, "startMockServer", { enumerable: true, get: function () { return server_js_1.startMockServer; } });
//# sourceMappingURL=index.js.map