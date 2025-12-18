"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const returns_parser_js_1 = require("./returns-parser.js");
(0, vitest_1.describe)('parseReturnsBlock', () => {
    (0, vitest_1.it)('should parse a simple returns block with multiple status codes', () => {
        const input = `{
      200: Invoice
      404: NotFoundError
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(2);
        (0, vitest_1.expect)(result.block.responses[0].statusCode).toBe(200);
        (0, vitest_1.expect)(result.block.responses[0].schema?.kind).toBe('reference');
        (0, vitest_1.expect)(result.block.responses[0].schema.name).toBe('Invoice');
        (0, vitest_1.expect)(result.block.responses[1].statusCode).toBe(404);
        (0, vitest_1.expect)(result.block.responses[1].schema?.kind).toBe('reference');
        (0, vitest_1.expect)(result.block.responses[1].schema.name).toBe('NotFoundError');
    });
    (0, vitest_1.it)('should parse void responses', () => {
        const input = `{
      204: void
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(1);
        (0, vitest_1.expect)(result.block.responses[0].statusCode).toBe(204);
        (0, vitest_1.expect)(result.block.responses[0].schema).toBeNull();
    });
    (0, vitest_1.it)('should parse responses with when conditions', () => {
        const input = `{
      204: void
        when exists(invoiceId) && status in [Draft, Void]

      404: NotFoundError
        when !exists(invoiceId)
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(2);
        (0, vitest_1.expect)(result.block.responses[0].statusCode).toBe(204);
        (0, vitest_1.expect)(result.block.responses[0].condition).toBe('exists(invoiceId) && status in [Draft, Void]');
        (0, vitest_1.expect)(result.block.responses[1].statusCode).toBe(404);
        (0, vitest_1.expect)(result.block.responses[1].condition).toBe('!exists(invoiceId)');
    });
    (0, vitest_1.it)('should parse responses with descriptions', () => {
        const input = `{
      204: void
        "Invoice successfully deleted"

      404: NotFoundError
        "Invoice does not exist"
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(2);
        (0, vitest_1.expect)(result.block.responses[0].description).toBe('Invoice successfully deleted');
        (0, vitest_1.expect)(result.block.responses[1].description).toBe('Invoice does not exist');
    });
    (0, vitest_1.it)('should parse responses with both conditions and descriptions', () => {
        const input = `{
      204: void
        when exists(invoiceId) && status in [Draft, Void]
        "Invoice successfully deleted"

      404: NotFoundError
        when !exists(invoiceId)
        "Invoice does not exist"

      409: ConflictError
        when exists(invoiceId) && status in [Sent, Paid]
        "Cannot delete invoice in current status"
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(3);
        (0, vitest_1.expect)(result.block.responses[0].statusCode).toBe(204);
        (0, vitest_1.expect)(result.block.responses[0].schema).toBeNull();
        (0, vitest_1.expect)(result.block.responses[0].condition).toBe('exists(invoiceId) && status in [Draft, Void]');
        (0, vitest_1.expect)(result.block.responses[0].description).toBe('Invoice successfully deleted');
        (0, vitest_1.expect)(result.block.responses[1].statusCode).toBe(404);
        (0, vitest_1.expect)(result.block.responses[1].condition).toBe('!exists(invoiceId)');
        (0, vitest_1.expect)(result.block.responses[1].description).toBe('Invoice does not exist');
        (0, vitest_1.expect)(result.block.responses[2].statusCode).toBe(409);
        (0, vitest_1.expect)(result.block.responses[2].condition).toBe('exists(invoiceId) && status in [Sent, Paid]');
        (0, vitest_1.expect)(result.block.responses[2].description).toBe('Cannot delete invoice in current status');
    });
    (0, vitest_1.it)('should parse inline object types', () => {
        const input = `{
      200: { id: string, name: string }
        when valid(body)
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(1);
        (0, vitest_1.expect)(result.block.responses[0].statusCode).toBe(200);
        (0, vitest_1.expect)(result.block.responses[0].schema?.kind).toBe('object');
        (0, vitest_1.expect)(result.block.responses[0].condition).toBe('valid(body)');
    });
    (0, vitest_1.it)('should parse complex conditions with nested parentheses', () => {
        const input = `{
      200: TransferResult
        when balance >= amount && toAccount.exists && toAccount.active

      400: ValidationError
        when amount <= 0
        "Amount must be positive"

      409: InsufficientFundsError
        when balance < amount
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(3);
        (0, vitest_1.expect)(result.block.responses[0].condition).toBe('balance >= amount && toAccount.exists && toAccount.active');
        (0, vitest_1.expect)(result.block.responses[1].condition).toBe('amount <= 0');
        (0, vitest_1.expect)(result.block.responses[1].description).toBe('Amount must be positive');
        (0, vitest_1.expect)(result.block.responses[2].condition).toBe('balance < amount');
    });
    (0, vitest_1.it)('should handle conditions with function calls', () => {
        const input = `{
      201: Invoice
        when valid(body)
        "Invoice created"

      404: NotFoundError
        when !exists(Customer, customerId)
        "Customer not found"
    }`;
        const result = (0, returns_parser_js_1.parseReturnsBlock)(input);
        (0, vitest_1.expect)(result.block.responses).toHaveLength(2);
        (0, vitest_1.expect)(result.block.responses[0].condition).toBe('valid(body)');
        (0, vitest_1.expect)(result.block.responses[1].condition).toBe('!exists(Customer, customerId)');
    });
});
//# sourceMappingURL=returns-parser.test.js.map