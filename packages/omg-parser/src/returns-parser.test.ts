import { describe, it, expect } from 'vitest';
import { parseReturnsBlock } from './returns-parser.js';

describe('parseReturnsBlock', () => {
  it('should parse a simple returns block with multiple status codes', () => {
    const input = `{
      200: Invoice
      404: NotFoundError
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(2);
    expect(result.responses[0].statusCode).toBe(200);
    expect(result.responses[0].schema?.kind).toBe('reference');
    expect((result.responses[0].schema as any).name).toBe('Invoice');
    expect(result.responses[1].statusCode).toBe(404);
    expect(result.responses[1].schema?.kind).toBe('reference');
    expect((result.responses[1].schema as any).name).toBe('NotFoundError');
  });

  it('should parse void responses', () => {
    const input = `{
      204: void
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].statusCode).toBe(204);
    expect(result.responses[0].schema).toBeNull();
  });

  it('should parse responses with when conditions', () => {
    const input = `{
      204: void
        when exists(invoiceId) && status in [Draft, Void]

      404: NotFoundError
        when !exists(invoiceId)
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(2);
    expect(result.responses[0].statusCode).toBe(204);
    expect(result.responses[0].condition).toBe('exists(invoiceId) && status in [Draft, Void]');
    expect(result.responses[1].statusCode).toBe(404);
    expect(result.responses[1].condition).toBe('!exists(invoiceId)');
  });

  it('should parse responses with descriptions', () => {
    const input = `{
      204: void
        "Invoice successfully deleted"

      404: NotFoundError
        "Invoice does not exist"
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(2);
    expect(result.responses[0].description).toBe('Invoice successfully deleted');
    expect(result.responses[1].description).toBe('Invoice does not exist');
  });

  it('should parse responses with both conditions and descriptions', () => {
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

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(3);

    expect(result.responses[0].statusCode).toBe(204);
    expect(result.responses[0].schema).toBeNull();
    expect(result.responses[0].condition).toBe('exists(invoiceId) && status in [Draft, Void]');
    expect(result.responses[0].description).toBe('Invoice successfully deleted');

    expect(result.responses[1].statusCode).toBe(404);
    expect(result.responses[1].condition).toBe('!exists(invoiceId)');
    expect(result.responses[1].description).toBe('Invoice does not exist');

    expect(result.responses[2].statusCode).toBe(409);
    expect(result.responses[2].condition).toBe('exists(invoiceId) && status in [Sent, Paid]');
    expect(result.responses[2].description).toBe('Cannot delete invoice in current status');
  });

  it('should parse inline object types', () => {
    const input = `{
      200: { id: string, name: string }
        when valid(body)
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(1);
    expect(result.responses[0].statusCode).toBe(200);
    expect(result.responses[0].schema?.kind).toBe('object');
    expect(result.responses[0].condition).toBe('valid(body)');
  });

  it('should parse complex conditions with nested parentheses', () => {
    const input = `{
      200: TransferResult
        when balance >= amount && toAccount.exists && toAccount.active

      400: ValidationError
        when amount <= 0
        "Amount must be positive"

      409: InsufficientFundsError
        when balance < amount
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(3);
    expect(result.responses[0].condition).toBe('balance >= amount && toAccount.exists && toAccount.active');
    expect(result.responses[1].condition).toBe('amount <= 0');
    expect(result.responses[1].description).toBe('Amount must be positive');
    expect(result.responses[2].condition).toBe('balance < amount');
  });

  it('should handle conditions with function calls', () => {
    const input = `{
      201: Invoice
        when valid(body)
        "Invoice created"

      404: NotFoundError
        when !exists(Customer, customerId)
        "Customer not found"
    }`;

    const result = parseReturnsBlock(input);

    expect(result.responses).toHaveLength(2);
    expect(result.responses[0].condition).toBe('valid(body)');
    expect(result.responses[1].condition).toBe('!exists(Customer, customerId)');
  });
});
