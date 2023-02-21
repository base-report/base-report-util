import type { NumberOrNA } from './types/NumberOrNA'
import type { Timeseries } from './types/ChartData'

const round = (value: NumberOrNA, decimals: number): NumberOrNA =>
	value === 'N/A' ? 'N/A' : Number(value.toFixed(decimals))

const sma = (candles: Timeseries) =>
	round(candles.map((c) => c[3]).reduce((a, b) => a + b) / candles.length, 4)

const calculateAdrPct = (candles: Timeseries): number => {
	const last20 = candles.slice(candles.length - 20, candles.length)
	const adr =
		last20.reduce((total, d) => total + d[1] / d[2], 0) / last20.length - 1
	if (isNaN(adr)) return 0
	return parseFloat((100 * adr).toFixed(2))
}

const calcChangePercent = (
	current: NumberOrNA,
	previous: NumberOrNA
): NumberOrNA => {
	if (current === 'N/A' || previous === 'N/A') {
		return 'N/A'
	}

	return ((current - previous) / Math.abs(previous)) * 100
}

export { round, sma, calculateAdrPct, calcChangePercent }
