import { describe, expect, test } from 'vitest'
import {
	formatNumber,
	formatLetterToNumber,
	formatPct,
	formatDate
} from '../src/format'

describe('formatNumber', () => {
	test('returns "N/A" when value is "N/A"', () => {
		expect(formatNumber('N/A')).toBe('N/A')
	})

	test('returns "N/A" when value is null', () => {
		expect(formatNumber(null)).toBe('N/A')
	})

	test('returns "N/A" when input is not a finite number', () => {
		expect(formatNumber(NaN)).toBe('N/A')
		expect(formatNumber(Infinity)).toBe('N/A')
		expect(formatNumber(-Infinity)).toBe('N/A')
	})

	test('formats a positive number correctly', () => {
		expect(formatNumber(1234567.89)).toBe('1.23 M')
		expect(formatNumber(1234567890)).toBe('1.23 B')
		expect(formatNumber(1234567890123)).toBe('1.23 T')
		expect(formatNumber(1234.5678)).toBe('1.23 K')
		expect(formatNumber(1234.5678, 0)).toBe('1 K')
		expect(formatNumber(12.345678, 4)).toBe('12.3457')
	})

	test('formats a negative number correctly', () => {
		expect(formatNumber(-1234567.89)).toBe('-1.23 M')
		expect(formatNumber(-1234567890)).toBe('-1.23 B')
		expect(formatNumber(-1234567890123)).toBe('-1.23 T')
		expect(formatNumber(-1234.5678)).toBe('-1.23 K')
		expect(formatNumber(-1234.5678, 0)).toBe('-1 K')
		expect(formatNumber(-12.345678, 4)).toBe('-12.3457')
	})
})

describe('formatLetterToNumber', () => {
	test('returns 1e12 for letter "T"', () => {
		expect(formatLetterToNumber('T')).toBe(1e12)
		expect(formatLetterToNumber('t')).toBe(1e12)
	})

	test('returns 1e9 for letter "B"', () => {
		expect(formatLetterToNumber('B')).toBe(1e9)
		expect(formatLetterToNumber('b')).toBe(1e9)
	})

	test('returns 1e6 for letter "M"', () => {
		expect(formatLetterToNumber('M')).toBe(1e6)
		expect(formatLetterToNumber('m')).toBe(1e6)
	})

	test('returns 1e3 for letter "K"', () => {
		expect(formatLetterToNumber('K')).toBe(1e3)
		expect(formatLetterToNumber('k')).toBe(1e3)
	})

	test('returns 1 for any other letter', () => {
		expect(formatLetterToNumber('A')).toBe(1)
		expect(formatLetterToNumber('z')).toBe(1)
		expect(formatLetterToNumber('')).toBe(1)
	})
})

describe('formatPct', () => {
	test('returns "N/A" when input is not a number', () => {
		expect(formatPct(null)).toBe('N/A')
	})

	test('formats a positive number with sign correctly', () => {
		expect(formatPct(12.34)).toBe('+12.34%')
		expect(formatPct(100)).toBe('+100.00%')
		expect(formatPct(0.5)).toBe('+0.50%')
		expect(formatPct(0.5, false)).toBe('0.50%')
	})

	test('formats a negative number with sign correctly', () => {
		expect(formatPct(-12.34)).toBe('-12.34%')
		expect(formatPct(-100)).toBe('-100.00%')
		expect(formatPct(-0.5)).toBe('-0.50%')
		expect(formatPct(-0.5, false)).toBe('-0.50%')
	})

	test('formats a zero correctly', () => {
		expect(formatPct(0)).toBe('0.00%')
		expect(formatPct(0, false)).toBe('0.00%')
	})
})

describe('formatDate', () => {
	test('returns "N/A" when input is not a number', () => {
		expect(formatDate(null)).toBe('N/A')
	})

	test('formats the date correctly with short year', () => {
		expect(formatDate('2021-05-25')).toBe('May 25, 21')
		expect(formatDate('1999-12-31')).toBe('Dec 31, 99')
	})

	test('formats the date correctly with full year', () => {
		expect(formatDate('2021-05-25', false)).toBe('May 25, 2021')
		expect(formatDate('1999-12-31', false)).toBe('Dec 31, 1999')
	})

	test('handles invalid dates', () => {
		expect(formatDate('1999-00-01')).toBe('N/A')
		expect(formatDate('1999-13-01')).toBe('N/A')
		expect(formatDate('1999-12-32')).toBe('N/A')
		expect(formatDate('abc')).toBe('N/A')
	})
})
