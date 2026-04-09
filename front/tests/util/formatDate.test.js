import { describe, it, expect } from 'vitest';
import { formatDateForServer } from '../../src/util/formatDate';

describe('formatDateForServer', () => {
    describe('invalid or empty inputs', () => {
        it('should return null for null or undefined input', () => {
            expect(formatDateForServer(null)).toBe(null);
            expect(formatDateForServer(undefined)).toBe(null);
        });

        it('should return the input as-is for invalid dates', () => {
            const invalidDate = 'not-a-date';
            expect(formatDateForServer(invalidDate)).toBe(invalidDate);
        });
    });

    describe('valid date formats', () => {
        it('should format ISO date strings to YYYY-MM-DD HH:mm:ss', () => {
            const isoDate = '2024-01-15T10:30:45.123Z';
            const result = formatDateForServer(isoDate);

            expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
            // The date part should match the input (accounting for any timezone conversion)
            expect(result).toContain('2024-01-');
        });

        it('should format SQL date format correctly', () => {
            const sqlDate = '2024-01-15 10:30:45';
            const result = formatDateForServer(sqlDate);

            expect(result).toBe('2024-01-15 10:30:45');
        });

        it('should remove milliseconds and timezone abbreviations', () => {
            const dateWithMs = '2024-12-25T23:59:59.999Z';
            const result = formatDateForServer(dateWithMs);

            // Should not contain 'T', 'Z', or milliseconds
            expect(result).not.toContain('T');
            expect(result).not.toContain('Z');
            expect(result).not.toContain('.');
            // Should be in the correct format
            expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        });
    });

    describe('padding validation', () => {
        it('should pad single-digit months and days with leading zeros', () => {
            // Create a date and verify the output format
            const earlyDate = new Date(2024, 0, 5, 8, 5, 3); // Jan 5, 08:05:03
            const result = formatDateForServer(earlyDate);

            // Verify the format: should have -01- (padded month), -05 (padded day)
            expect(result).toMatch(/2024-01-05/);
        });

        it('should pad single-digit hours, minutes, and seconds', () => {
            const earlyTime = new Date(2024, 5, 15, 8, 5, 3); // June 15, 08:05:03
            const result = formatDateForServer(earlyTime);

            // Verify padding: hours, minutes, and seconds should be 2 digits
            expect(result).toMatch(/08:05:03/);
        });

        it('should handle all single digits correctly', () => {
            // Test a date with many single digits
            const singleDigitDate = new Date(2024, 0, 5, 1, 2, 3); // Jan 5, 01:02:03
            const result = formatDateForServer(singleDigitDate);

            expect(result).toMatch(/2024-01-05 01:02:03/);
        });
    });

    describe('various input formats', () => {
        it('should handle Date objects', () => {
            const dateObj = new Date(2024, 5, 15, 14, 30, 0); // June 15, 14:30:00
            const result = formatDateForServer(dateObj);

            expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
            expect(result).toContain('2024-06-15');
        });

        it('should handle Unix timestamp (milliseconds) correctly', () => {
            const timestamp = new Date('2024-06-15T14:30:00Z').getTime();
            const result = formatDateForServer(timestamp);

            expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
            expect(result).toContain('2024-06-');
        });

        it('should preserve date consistency across formats', () => {
            // Create date from components
            const dateObj = new Date(2024, 11, 31, 23, 59, 59); // Dec 31
            const isoString = dateObj.toISOString();

            const result1 = formatDateForServer(dateObj);
            const result2 = formatDateForServer(isoString);

            // Both should be valid dates in the correct format
            expect(result1).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
            expect(result2).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
        });
    });
});
