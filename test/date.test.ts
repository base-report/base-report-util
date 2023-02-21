import { describe, expect, test, beforeEach, afterEach, vi } from 'vitest'
import { getWeek, isDatePast } from '../src/date'

describe('getWeek', () => {
	test('returns the correct week for a given date', () => {
		expect(getWeek(new Date('2021-05-25'))).toBe(21)
		expect(getWeek(new Date('2021-12-31'))).toBe(52)
		expect(getWeek(new Date('2022-01-01'))).toBe(52)
		expect(getWeek(new Date('2022-01-02'))).toBe(52)
		expect(getWeek(new Date('2022-01-03'))).toBe(1)
		expect(getWeek(new Date('2022-01-09'))).toBe(1)
		expect(getWeek(new Date('2022-01-10'))).toBe(2)
	})

	test('handles leap years', () => {
		expect(getWeek(new Date('2020-02-29'))).toBe(9)
		expect(getWeek(new Date('2021-02-28'))).toBe(8)
	})

	test('handles invalid dates', () => {
		expect(getWeek(new Date('abc'))).toBeNaN()
	})
})

describe('isDatePast', () => {
	beforeEach(() => {
		vi.useFakeTimers()
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	test('identifies past dates', () => {
		const date = new Date('2022-01-02')
		vi.setSystemTime(date)

		expect(isDatePast('2021-05-25')).toBe(true)
		expect(isDatePast('2022-01-01')).toBe(true)
		expect(isDatePast('2022-05-25')).toBe(false)
	})

	test('handles timezones', () => {
		const date = new Date('2022-05-26T00:00:00-01:00')
		vi.setSystemTime(date)

		expect(isDatePast('2022-05-26T00:00:00-02:00')).toBe(false)
		expect(isDatePast('2022-05-26T00:00:00+02:00')).toBe(false)
		expect(isDatePast('2022-05-25T00:00:00-08:00')).toBe(true)
	})

	test('handles invalid dates', () => {
		expect(isDatePast('abc')).toBe(false)
	})
})
