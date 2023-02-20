import { expect, test } from 'vitest'
import { round } from '../src/calc'

test('returns "N/A" when value is "N/A"', () => {
	expect(round('N/A', 2)).toBe('N/A')
})

test('rounds a positive number correctly', () => {
	expect(round(5.6789, 2)).toBe(5.68)
})

test('rounds a negative number correctly', () => {
	expect(round(-5.6789, 2)).toBe(-5.68)
})

test('rounds zero correctly', () => {
	expect(round(0, 2)).toBe(0)
})

test('throws error when value is not a number', () => {
	expect(() => round('foo', 2)).toThrow()
})

test('rounds a number with more decimal places than the specified number of decimals', () => {
	expect(round(4.5678, 1)).toBe(4.6)
})
