/**
 * OMG Mock Server
 *
 * Generate mock API servers from OMG specifications
 */

export { MockGenerator, createMockGenerator, type MockGeneratorOptions } from './mock-generator.js';

export {
  createVagueGenerator,
  generateWithVague,
  generateArrayWithVague,
  type VagueGeneratorOptions,
} from './vague-generator.js';

export {
  createMockServer,
  startMockServer,
  type MockServer,
  type MockServerOptions,
  type RouteInfo,
} from './server.js';
