import { describe, expect, test } from 'vitest'
import { getCombos } from '../src/moveFinder'
import { MNDY } from './data/timeseries'

describe('getCombos', () => {
	test('should return correct combos for SMA10 crossover strategy', () => {
		const combos = getCombos({
			candles: MNDY,
			entryStrategy: 10,
			exitStrategy: 10,
			minGain: 0.2
		})

		expect(combos.length).toBe(2)
		expect(combos[0].length).toBe(26)
		expect(combos[1].length).toBe(15)
		expect(combos[0][0]).toEqual([215.61, 225, 215, 225, 58603, 1628193600000])
		expect(combos[0][25]).toEqual([
			381.26, 386, 364.69, 371.97, 440668, 1631304000000
		])
		expect(combos[1][0]).toEqual([
			97.81, 100.68, 95.775, 100.18, 349932, 1658952000000
		])
		expect(combos[1][14]).toEqual([
			133.91, 133.91, 124.412, 130.77, 722764, 1660680000000
		])
	})

	test('should return correct combos for SMA20 crossover strategy', () => {
		const combos = getCombos({
			candles: MNDY,
			entryStrategy: 20,
			exitStrategy: 20,
			minGain: 0.2
		})

		expect(combos.length).toBe(1)
		expect(combos[0].length).toBe(31)
		expect(combos[0][0]).toEqual([215.61, 225, 215, 225, 58603, 1628193600000])
		expect(combos[0][30]).toEqual([
			385, 385, 369, 374.15, 192196, 1631908800000
		])
	})

	test('should return correct combos for mixed SMA crossover strategy', () => {
		const combos = getCombos({
			candles: MNDY,
			entryStrategy: 50,
			exitStrategy: 10,
			minGain: 0.2
		})

		expect(combos.length).toBe(2)
		expect(combos[0].length).toBe(27)
		expect(combos[1].length).toBe(21)
		expect(combos[0][0]).toEqual([
			206.9, 215.95, 203.27, 211.91, 25680, 1628107200000
		])
		expect(combos[0][26]).toEqual([
			381.26, 386, 364.69, 371.97, 440668, 1631304000000
		])
		expect(combos[1][0]).toEqual([
			105, 109.32, 103.8725, 108.56, 252964, 1673470800000
		])
		expect(combos[1][20]).toEqual([
			135.75, 139.63, 128.89, 131.18, 863950, 1676062800000
		])
	})

	test('should return correct combos for EP strategy', () => {
		const combos = getCombos({
			candles: MNDY,
			entryStrategy: 'EP',
			exitStrategy: 10,
			minGain: 0.2
		})

		expect(combos.length).toBe(1)
		expect(combos[0].length).toBe(18)
		expect(combos[0][0]).toEqual([
			277.97, 317.6886, 270, 305, 557557, 1629230400000
		])
		expect(combos[0][17]).toEqual([
			381.26, 386, 364.69, 371.97, 440668, 1631304000000
		])
	})
})
