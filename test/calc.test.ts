import { describe, expect, test } from 'vitest'
import { round, sma, calculateAdrPct, calcChangePercent } from '../src/calc'
import { sampleData } from './data/timeseries'

describe('round', () => {
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
})

describe('sma', () => {
	test('returns the correct value for SMA10', () => {
		const first10 = sampleData.slice(0, 10)
		expect(sma(first10)).toBe(121.79)
	})

	test('returns the correct value for SMA20', () => {
		const first20 = sampleData.slice(0, 20)
		expect(sma(first20)).toBe(142.814)
	})

	test('returns the correct value for SMA50', () => {
		const first50 = sampleData.slice(0, 50)
		expect(sma(first50)).toBe(173.154)
	})
})

describe('calculateAdrPct', () => {
	test('returns the correct value for ADR', () => {
		expect(calculateAdrPct(sampleData)).toBe(8.29)
	})

	test('returns 0 for empty list', () => {
		expect(calculateAdrPct([])).toBe(0)
	})
})

describe('calcChangePercent', () => {
	test('returns the correct value for change percent', () => {
		expect(calcChangePercent(90, 100)).toBe(-10)
	})

	test('returns the correct value for change percent', () => {
		expect(calcChangePercent(110, 100)).toBe(10)
	})

	test('returns 0 for equal values', () => {
		expect(calcChangePercent(100, 100)).toBe(0)
	})

	test('returns "N/A" when current value is "N/A"', () => {
		expect(calcChangePercent('N/A', 100)).toBe('N/A')
	})

	test('returns "N/A" when previous value is "N/A"', () => {
		expect(calcChangePercent(100, 'N/A')).toBe('N/A')
	})
})
