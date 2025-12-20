/**
 * Mock Data Generator
 *
 * Generates realistic mock data based on OmgSchema types
 */

import type { OmgSchema, OmgAnnotation, ParsedApi } from 'omg-parser';

export interface MockGeneratorOptions {
  /** Seed for deterministic generation */
  seed?: number;
  /** Types from the API for reference resolution */
  types?: Record<string, OmgSchema>;
  /** Maximum depth for nested objects (prevents infinite recursion) */
  maxDepth?: number;
  /** Minimum array length */
  minArrayLength?: number;
  /** Maximum array length */
  maxArrayLength?: number;
}

// Simple seeded random number generator for deterministic output
class SeededRandom {
  private seed: number;

  constructor(seed: number = Date.now()) {
    this.seed = seed;
  }

  // Linear congruential generator
  next(): number {
    this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
    return this.seed / 4294967296;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
}

// Sample data pools for realistic mock data
const SAMPLE_DATA = {
  names: ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'],
  lastNames: ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'],
  words: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'],
  domains: ['example.com', 'test.org', 'demo.io', 'sample.net'],
  titles: [
    'Important Task',
    'Review Document',
    'Complete Report',
    'Meeting Notes',
    'Project Update',
  ],
  descriptions: [
    'This is a sample description.',
    'Some additional context here.',
    'More details to follow.',
    'Placeholder text for testing.',
  ],
};

export class MockGenerator {
  private rng: SeededRandom;
  private types: Record<string, OmgSchema>;
  private maxDepth: number;
  private minArrayLength: number;
  private maxArrayLength: number;
  private currentDepth: number = 0;

  constructor(options: MockGeneratorOptions = {}) {
    this.rng = new SeededRandom(options.seed);
    this.types = options.types || {};
    this.maxDepth = options.maxDepth || 10;
    this.minArrayLength = options.minArrayLength || 1;
    this.maxArrayLength = options.maxArrayLength || 3;
  }

  /**
   * Generate mock data for a schema
   */
  generate(schema: OmgSchema | null): unknown {
    if (!schema) return null;

    // Check for nullable
    if (schema.nullable && this.rng.next() < 0.1) {
      return null;
    }

    // Check for optional (skip sometimes when optional)
    if (schema.optional && this.rng.next() < 0.2) {
      return undefined;
    }

    // Prevent infinite recursion
    if (this.currentDepth > this.maxDepth) {
      return this.generatePlaceholder(schema);
    }

    this.currentDepth++;

    try {
      switch (schema.kind) {
        case 'primitive':
          return this.generatePrimitive(schema.type, schema.annotations);

        case 'object':
          return this.generateObject(schema.properties);

        case 'array':
          return this.generateArray(schema.items, schema.annotations);

        case 'enum':
          return this.rng.pick(schema.values);

        case 'union':
          // Pick one of the union types randomly
          return this.generate(this.rng.pick(schema.types));

        case 'intersection':
          // Merge all intersection types (assuming they're objects)
          return this.generateIntersection(schema.types);

        case 'reference':
          return this.generateReference(schema.name);

        default:
          return null;
      }
    } finally {
      this.currentDepth--;
    }
  }

  /**
   * Generate a primitive value
   */
  private generatePrimitive(
    type: string,
    annotations: OmgAnnotation[]
  ): string | number | boolean | null {
    const constraints = this.parseAnnotations(annotations);

    switch (type) {
      case 'string':
        return this.generateString(constraints);

      case 'integer':
        return this.generateInteger(constraints);

      case 'number':
      case 'decimal':
        return this.generateNumber(constraints);

      case 'boolean':
        return this.rng.next() > 0.5;

      case 'date':
        return this.generateDate();

      case 'datetime':
        return this.generateDatetime();

      case 'uuid':
        return this.generateUuid();

      case 'any':
        // Return a random primitive
        return this.rng.pick(['sample value', 42, true, null]);

      default:
        return `unknown-${type}`;
    }
  }

  /**
   * Generate a string value based on constraints
   */
  private generateString(constraints: ParsedConstraints): string {
    // Check for format annotation
    if (constraints.format) {
      switch (constraints.format) {
        case 'email':
          const name = this.rng.pick(SAMPLE_DATA.names).toLowerCase();
          const domain = this.rng.pick(SAMPLE_DATA.domains);
          return `${name}@${domain}`;

        case 'uri':
        case 'url':
          return `https://${this.rng.pick(SAMPLE_DATA.domains)}/path/${this.rng.nextInt(1, 100)}`;

        case 'phone':
          return `+1-555-${this.rng.nextInt(100, 999)}-${this.rng.nextInt(1000, 9999)}`;

        default:
          // Fall through to default string generation
          break;
      }
    }

    // Generate string based on length constraints
    const minLen = constraints.minLength || 1;
    const maxLen = constraints.maxLength || 50;
    const targetLen = this.rng.nextInt(minLen, Math.min(maxLen, 100));

    // Try to generate meaningful text
    let result = '';
    while (result.length < targetLen) {
      result += this.rng.pick(SAMPLE_DATA.words) + ' ';
    }

    return result.trim().substring(0, targetLen);
  }

  /**
   * Generate an integer value based on constraints
   */
  private generateInteger(constraints: ParsedConstraints): number {
    const min = constraints.min ?? 0;
    const max = constraints.max ?? 1000;
    return this.rng.nextInt(min, max);
  }

  /**
   * Generate a number value based on constraints
   */
  private generateNumber(constraints: ParsedConstraints): number {
    const min = constraints.min ?? 0;
    const max = constraints.max ?? 1000;
    return Math.round(this.rng.nextFloat(min, max) * 100) / 100;
  }

  /**
   * Generate a date string (YYYY-MM-DD)
   */
  private generateDate(): string {
    const year = this.rng.nextInt(2020, 2025);
    const month = this.rng.nextInt(1, 12).toString().padStart(2, '0');
    const day = this.rng.nextInt(1, 28).toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Generate a datetime string (ISO 8601)
   */
  private generateDatetime(): string {
    const date = this.generateDate();
    const hour = this.rng.nextInt(0, 23).toString().padStart(2, '0');
    const minute = this.rng.nextInt(0, 59).toString().padStart(2, '0');
    const second = this.rng.nextInt(0, 59).toString().padStart(2, '0');
    return `${date}T${hour}:${minute}:${second}Z`;
  }

  /**
   * Generate a UUID v4
   */
  private generateUuid(): string {
    const hex = () => this.rng.nextInt(0, 15).toString(16);
    const segment = (len: number) => Array.from({ length: len }, () => hex()).join('');

    return `${segment(8)}-${segment(4)}-4${segment(3)}-${this.rng.pick(['8', '9', 'a', 'b'])}${segment(3)}-${segment(12)}`;
  }

  /**
   * Generate an object
   */
  private generateObject(properties: Record<string, OmgSchema>): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, schema] of Object.entries(properties)) {
      const value = this.generate(schema);
      // Only include if not undefined (optional fields that were skipped)
      if (value !== undefined) {
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * Generate an array
   */
  private generateArray(items: OmgSchema, annotations: OmgAnnotation[]): unknown[] {
    const constraints = this.parseAnnotations(annotations);
    const minLen = constraints.minItems ?? this.minArrayLength;
    const maxLen = constraints.maxItems ?? this.maxArrayLength;
    const length = this.rng.nextInt(minLen, maxLen);

    return Array.from({ length }, () => this.generate(items));
  }

  /**
   * Generate intersection type (merge objects)
   */
  private generateIntersection(types: OmgSchema[]): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const type of types) {
      const generated = this.generate(type);
      if (typeof generated === 'object' && generated !== null) {
        Object.assign(result, generated);
      }
    }

    return result;
  }

  /**
   * Generate referenced type
   */
  private generateReference(name: string): unknown {
    const schema = this.types[name];
    if (schema) {
      return this.generate(schema);
    }
    // Fallback for unknown references
    return { _ref: name };
  }

  /**
   * Generate placeholder for max depth exceeded
   */
  private generatePlaceholder(schema: OmgSchema): unknown {
    switch (schema.kind) {
      case 'object':
        return {};
      case 'array':
        return [];
      case 'primitive':
        return schema.type === 'string' ? '...' : schema.type === 'boolean' ? false : 0;
      default:
        return null;
    }
  }

  /**
   * Parse annotations into constraints
   */
  private parseAnnotations(annotations: OmgAnnotation[]): ParsedConstraints {
    const constraints: ParsedConstraints = {};

    for (const ann of annotations) {
      switch (ann.name) {
        case 'min':
          constraints.min = Number(ann.args[0]);
          break;
        case 'max':
          constraints.max = Number(ann.args[0]);
          break;
        case 'minLength':
          constraints.minLength = Number(ann.args[0]);
          break;
        case 'maxLength':
          constraints.maxLength = Number(ann.args[0]);
          break;
        case 'minItems':
          constraints.minItems = Number(ann.args[0]);
          break;
        case 'maxItems':
          constraints.maxItems = Number(ann.args[0]);
          break;
        case 'pattern':
          constraints.pattern = String(ann.args[0]);
          break;
        case 'format':
          constraints.format = String(ann.args[0]);
          break;
      }
    }

    return constraints;
  }
}

interface ParsedConstraints {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  pattern?: string;
  format?: string;
}

/**
 * Create a mock generator for an API
 */
export function createMockGenerator(api: ParsedApi, seed?: number): MockGenerator {
  return new MockGenerator({
    seed,
    types: api.types,
  });
}
