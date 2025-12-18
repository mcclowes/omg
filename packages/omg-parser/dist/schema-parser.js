"use strict";
/**
 * Schema Parser
 *
 * Parses OMG schema syntax (JSON-like + type annotations) into OmgSchema.
 *
 * Supports:
 * - JSON literals: { id: "123", name: "Test" }
 * - Type annotations: { id: string, name: string @maxLength(200) }
 * - Enums: "draft" | "sent" | "paid"
 * - Optional: string?
 * - Nullable: string | null
 * - Arrays: [{ id: string }]
 * - Nested objects
 * - Comments: // inline comments
 *
 * Field names can be unquoted identifiers (preferred) or quoted strings.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseSchema = parseSchema;
exports.inferSchemaFromJson = inferSchemaFromJson;
class Lexer {
    input;
    pos = 0;
    line = 1;
    column = 1;
    constructor(input) {
        this.input = input;
    }
    peek() {
        return this.input[this.pos] || '';
    }
    advance() {
        const char = this.input[this.pos++];
        if (char === '\n') {
            this.line++;
            this.column = 1;
        }
        else {
            this.column++;
        }
        return char;
    }
    skipWhitespace() {
        while (/\s/.test(this.peek())) {
            this.advance();
        }
    }
    skipComment() {
        if (this.peek() === '/' && this.input[this.pos + 1] === '/') {
            while (this.peek() && this.peek() !== '\n') {
                this.advance();
            }
            return true;
        }
        return false;
    }
    readString() {
        const quote = this.advance(); // consume opening quote
        const startLine = this.line;
        const startColumn = this.column;
        let value = '';
        while (this.peek() && this.peek() !== quote) {
            if (this.peek() === '\\') {
                this.advance();
                const escaped = this.advance();
                switch (escaped) {
                    case 'n':
                        value += '\n';
                        break;
                    case 't':
                        value += '\t';
                        break;
                    case 'r':
                        value += '\r';
                        break;
                    case '\\':
                        value += '\\';
                        break;
                    case '"':
                        value += '"';
                        break;
                    case "'":
                        value += "'";
                        break;
                    default:
                        value += escaped;
                }
            }
            else {
                value += this.advance();
            }
        }
        this.advance(); // consume closing quote
        return { type: 'STRING', value, line: startLine, column: startColumn };
    }
    readNumber() {
        const startLine = this.line;
        const startColumn = this.column;
        let value = '';
        if (this.peek() === '-') {
            value += this.advance();
        }
        while (/[0-9]/.test(this.peek())) {
            value += this.advance();
        }
        if (this.peek() === '.') {
            value += this.advance();
            while (/[0-9]/.test(this.peek())) {
                value += this.advance();
            }
        }
        if (this.peek() === 'e' || this.peek() === 'E') {
            value += this.advance();
            if (this.peek() === '+' || this.peek() === '-') {
                value += this.advance();
            }
            while (/[0-9]/.test(this.peek())) {
                value += this.advance();
            }
        }
        return { type: 'NUMBER', value, line: startLine, column: startColumn };
    }
    readIdentifier() {
        const startLine = this.line;
        const startColumn = this.column;
        let value = '';
        while (/[a-zA-Z0-9_]/.test(this.peek())) {
            value += this.advance();
        }
        // Check for keywords
        if (value === 'true') {
            return { type: 'TRUE', value, line: startLine, column: startColumn };
        }
        if (value === 'false') {
            return { type: 'FALSE', value, line: startLine, column: startColumn };
        }
        if (value === 'null') {
            return { type: 'NULL', value, line: startLine, column: startColumn };
        }
        return { type: 'IDENTIFIER', value, line: startLine, column: startColumn };
    }
    nextToken() {
        while (true) {
            this.skipWhitespace();
            if (this.skipComment()) {
                continue;
            }
            if (this.pos >= this.input.length) {
                return { type: 'EOF', value: '', line: this.line, column: this.column };
            }
            const char = this.peek();
            const startLine = this.line;
            const startColumn = this.column;
            switch (char) {
                case '{':
                    this.advance();
                    return { type: 'LBRACE', value: char, line: startLine, column: startColumn };
                case '}':
                    this.advance();
                    return { type: 'RBRACE', value: char, line: startLine, column: startColumn };
                case '[':
                    this.advance();
                    return { type: 'LBRACKET', value: char, line: startLine, column: startColumn };
                case ']':
                    this.advance();
                    return { type: 'RBRACKET', value: char, line: startLine, column: startColumn };
                case '(':
                    this.advance();
                    return { type: 'LPAREN', value: char, line: startLine, column: startColumn };
                case ')':
                    this.advance();
                    return { type: 'RPAREN', value: char, line: startLine, column: startColumn };
                case ':':
                    this.advance();
                    return { type: 'COLON', value: char, line: startLine, column: startColumn };
                case ',':
                    this.advance();
                    return { type: 'COMMA', value: char, line: startLine, column: startColumn };
                case '|':
                    this.advance();
                    return { type: 'PIPE', value: char, line: startLine, column: startColumn };
                case '&':
                    this.advance();
                    return { type: 'AMPERSAND', value: char, line: startLine, column: startColumn };
                case '?':
                    this.advance();
                    return { type: 'QUESTION', value: char, line: startLine, column: startColumn };
                case '@':
                    this.advance();
                    return { type: 'AT', value: char, line: startLine, column: startColumn };
                case '"':
                case "'":
                    return this.readString();
                default:
                    if (/[0-9]/.test(char) || (char === '-' && /[0-9]/.test(this.input[this.pos + 1]))) {
                        return this.readNumber();
                    }
                    if (/[a-zA-Z_]/.test(char)) {
                        return this.readIdentifier();
                    }
                    throw new Error(`Unexpected character '${char}' at line ${startLine}, column ${startColumn}`);
            }
        }
    }
}
class Parser {
    currentToken;
    lexer;
    constructor(input) {
        this.lexer = new Lexer(input);
        this.currentToken = this.lexer.nextToken();
    }
    advance() {
        const token = this.currentToken;
        this.currentToken = this.lexer.nextToken();
        return token;
    }
    check(type) {
        return this.currentToken.type === type;
    }
    checkValue(value) {
        return this.currentToken.value === value;
    }
    expect(type) {
        if (!this.check(type)) {
            throw new Error(`Expected ${type} but got ${this.currentToken.type} at line ${this.currentToken.line}, column ${this.currentToken.column}`);
        }
        return this.advance();
    }
    parseAnnotations() {
        const annotations = [];
        while (this.check('AT')) {
            this.advance(); // consume @
            const name = this.expect('IDENTIFIER').value;
            const args = [];
            if (this.check('LPAREN')) {
                this.advance(); // consume (
                while (!this.check('RPAREN')) {
                    if (this.check('STRING')) {
                        args.push(this.advance().value);
                    }
                    else if (this.check('NUMBER')) {
                        args.push(parseFloat(this.advance().value));
                    }
                    else if (this.check('TRUE')) {
                        this.advance();
                        args.push(true);
                    }
                    else if (this.check('FALSE')) {
                        this.advance();
                        args.push(false);
                    }
                    else if (this.check('IDENTIFIER')) {
                        // Treat unquoted identifier as string in annotation args
                        args.push(this.advance().value);
                    }
                    else {
                        throw new Error(`Unexpected token in annotation args: ${this.currentToken.type} at line ${this.currentToken.line}, column ${this.currentToken.column}. Expected string, number, boolean, or identifier.`);
                    }
                    if (this.check('COMMA')) {
                        this.advance();
                    }
                }
                this.expect('RPAREN');
            }
            annotations.push({ name, args });
        }
        return annotations;
    }
    parsePrimaryType() {
        const token = this.currentToken;
        // String literal - enum value or actual string
        if (this.check('STRING')) {
            const stringValue = this.advance().value;
            // Check if this is part of an enum (followed by |)
            if (this.check('PIPE')) {
                const values = [stringValue];
                while (this.check('PIPE')) {
                    this.advance();
                    if (this.check('STRING')) {
                        values.push(this.advance().value);
                    }
                    else if (this.check('IDENTIFIER') || this.check('NULL')) {
                        // Could be 'null' or another identifier
                        if (this.checkValue('null') || this.check('NULL')) {
                            this.advance();
                            return {
                                kind: 'enum',
                                values,
                                nullable: true,
                                annotations: this.parseAnnotations(),
                            };
                        }
                        values.push(this.advance().value);
                    }
                }
                return {
                    kind: 'enum',
                    values,
                    annotations: this.parseAnnotations(),
                };
            }
            // Just a string literal (in example mode)
            return {
                kind: 'primitive',
                type: 'string',
                annotations: [],
            };
        }
        // Number literal
        if (this.check('NUMBER')) {
            const numValue = this.advance().value;
            return {
                kind: 'primitive',
                type: numValue.includes('.') ? 'number' : 'integer',
                annotations: [],
            };
        }
        // Boolean literal
        if (this.check('TRUE') || this.check('FALSE')) {
            this.advance();
            return {
                kind: 'primitive',
                type: 'boolean',
                annotations: [],
            };
        }
        // Null
        if (this.check('NULL')) {
            this.advance();
            return {
                kind: 'primitive',
                type: 'any',
                nullable: true,
                annotations: [],
            };
        }
        // Identifier (type name or primitive type)
        if (this.check('IDENTIFIER')) {
            const typeName = this.advance().value;
            // Check for optional marker
            const optional = this.check('QUESTION');
            if (optional) {
                this.advance();
            }
            // Parse annotations
            const annotations = this.parseAnnotations();
            // Note: nullable "| null" is handled at parseType level to support
            // proper precedence with intersection and union types
            // Primitive types
            const primitives = [
                'string',
                'number',
                'integer',
                'boolean',
                'decimal',
                'date',
                'datetime',
                'uuid',
                'any',
                'int',
                'bool',
            ];
            if (primitives.includes(typeName.toLowerCase())) {
                let type = typeName.toLowerCase();
                if (type === 'int')
                    type = 'integer';
                if (type === 'bool')
                    type = 'boolean';
                return {
                    kind: 'primitive',
                    type: type,
                    optional,
                    annotations,
                };
            }
            // Reference to another type
            return {
                kind: 'reference',
                name: typeName,
                optional,
                annotations,
            };
        }
        // Array
        if (this.check('LBRACKET')) {
            this.advance();
            const items = this.parseType();
            this.expect('RBRACKET');
            const optional = this.check('QUESTION');
            if (optional) {
                this.advance();
            }
            const annotations = this.parseAnnotations();
            return {
                kind: 'array',
                items,
                optional,
                annotations,
            };
        }
        // Object
        if (this.check('LBRACE')) {
            return this.parseObject();
        }
        throw new Error(`Unexpected token: ${token.type} at line ${token.line}, column ${token.column}`);
    }
    /**
     * Parse intersection types (& has higher precedence than |)
     * Grammar: IntersectionType = PrimaryType ('&' PrimaryType)*
     */
    parseIntersectionType() {
        let type = this.parsePrimaryType();
        // Check for intersection types (&)
        if (this.check('AMPERSAND')) {
            const types = [type];
            while (this.check('AMPERSAND')) {
                this.advance();
                types.push(this.parsePrimaryType());
            }
            if (types.length > 1) {
                return {
                    kind: 'intersection',
                    types,
                    annotations: [],
                };
            }
        }
        return type;
    }
    /**
     * Parse union types (| has lower precedence than &)
     * Grammar: UnionType = IntersectionType ('|' IntersectionType)*
     */
    parseType() {
        let type = this.parseIntersectionType();
        // Check for union types (|)
        // Skip if this is an enum (string literal unions are handled in parsePrimaryType)
        if (this.check('PIPE') && type.kind !== 'enum') {
            const types = [type];
            let nullable = false;
            while (this.check('PIPE')) {
                this.advance();
                if (this.check('NULL') || this.checkValue('null')) {
                    this.advance();
                    // Mark as nullable
                    nullable = true;
                }
                else {
                    types.push(this.parseIntersectionType());
                }
            }
            if (types.length > 1) {
                return {
                    kind: 'union',
                    types,
                    nullable,
                    annotations: [],
                };
            }
            // Single type but made nullable via | null
            if (nullable) {
                return { ...type, nullable: true };
            }
        }
        return type;
    }
    parseObject() {
        this.expect('LBRACE');
        const properties = {};
        while (!this.check('RBRACE')) {
            // Property key (string or identifier)
            let key;
            if (this.check('STRING')) {
                key = this.advance().value;
            }
            else if (this.check('IDENTIFIER')) {
                key = this.advance().value;
            }
            else {
                throw new Error(`Expected property key (string or identifier) at line ${this.currentToken.line}, column ${this.currentToken.column}, but found '${this.currentToken.type}'`);
            }
            // Check for optional marker before colon
            let optional = false;
            if (this.check('QUESTION')) {
                this.advance();
                optional = true;
            }
            this.expect('COLON');
            // Property value
            const valueType = this.parseType();
            if (optional) {
                valueType.optional = true;
            }
            properties[key] = valueType;
            // Comma is optional
            if (this.check('COMMA')) {
                this.advance();
            }
        }
        this.expect('RBRACE');
        const optional = this.check('QUESTION');
        if (optional) {
            this.advance();
        }
        const annotations = this.parseAnnotations();
        return {
            kind: 'object',
            properties,
            optional,
            annotations,
        };
    }
    parse() {
        const result = this.parseType();
        if (!this.check('EOF')) {
            throw new Error(`Unexpected token after schema: ${this.currentToken.type}`);
        }
        return result;
    }
}
/**
 * Parse OMG schema syntax into an OmgSchema
 */
function parseSchema(input) {
    const parser = new Parser(input);
    return parser.parse();
}
/**
 * Infer schema from a pure JSON example
 */
function inferSchemaFromJson(json) {
    if (json === null) {
        return { kind: 'primitive', type: 'any', nullable: true, annotations: [] };
    }
    if (typeof json === 'string') {
        return { kind: 'primitive', type: 'string', annotations: [] };
    }
    if (typeof json === 'number') {
        return {
            kind: 'primitive',
            type: Number.isInteger(json) ? 'integer' : 'number',
            annotations: [],
        };
    }
    if (typeof json === 'boolean') {
        return { kind: 'primitive', type: 'boolean', annotations: [] };
    }
    if (Array.isArray(json)) {
        if (json.length === 0) {
            return {
                kind: 'array',
                items: { kind: 'primitive', type: 'any', annotations: [] },
                annotations: [],
            };
        }
        return {
            kind: 'array',
            items: inferSchemaFromJson(json[0]),
            annotations: [],
        };
    }
    if (typeof json === 'object') {
        const properties = {};
        for (const [key, value] of Object.entries(json)) {
            properties[key] = inferSchemaFromJson(value);
        }
        return {
            kind: 'object',
            properties,
            annotations: [],
        };
    }
    return { kind: 'primitive', type: 'any', annotations: [] };
}
//# sourceMappingURL=schema-parser.js.map