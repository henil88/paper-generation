import { randomBytes } from "node:crypto";

export function uuidv7(): string {
    const now = Date.now();
    const random = randomBytes(10);
    const buffer = Buffer.alloc(16);

    // 1. Write the 48-bit timestamp (bytes 0-5)
    buffer.writeUInt16BE(Math.floor(now / 4294967296), 0);
    buffer.writeUInt32BE(now % 4294967296, 2);

    // 2. Copy all 10 random bytes into the rest of the buffer (bytes 6-15)
    random.copy(buffer, 6, 0, 10);

    // 3. Enforce Version 7 on byte 6 (Clear top 4 bits, set to 0x70)
    buffer[6] = ((buffer[6] ?? 0) & 0x0f) | 0x70;

    // 4. Enforce Variant 1 on byte 8 (Clear top 2 bits, set to 0x80)
    buffer[8] = ((buffer[8] ?? 0) & 0x3f) | 0x80;

    const hex = buffer.toString('hex');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}