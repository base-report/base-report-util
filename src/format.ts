import type { MaybeNumber, MaybeString } from './types/Maybes'
import type { NumberOrNA } from './types/NumberOrNA'

const customToFixed = (n: number, precision: number): string => {
	let s = n.toFixed(precision)
	if (precision > 0 && s.indexOf('.') !== -1) {
		s = s.replace(/0+$/, '') // Remove trailing zeros
		s = s.replace(/\.$/, '') // Remove trailing dot if no decimals left
	}
	return s
}

const formatNumber = (n: MaybeNumber | NumberOrNA, decimals = 2): string => {
	if (n === 'N/A' || n === null || !isFinite(n)) return 'N/A'

	const num = Number(n)

	return Math.abs(num) >= 1.0e12
		? customToFixed(num / 1.0e12, decimals) + ' T'
		: Math.abs(num) >= 1.0e9
		? customToFixed(num / 1.0e9, decimals) + ' B'
		: Math.abs(num) >= 1.0e6
		? customToFixed(num / 1.0e6, decimals) + ' M'
		: Math.abs(num) >= 1.0e3
		? customToFixed(num / 1.0e3, decimals) + ' K'
		: customToFixed(num, decimals)
}

const formatLetterToNumber = (letter: string): number => {
	switch (letter.toUpperCase()) {
		case 'T':
			return 1e12
		case 'B':
			return 1e9
		case 'M':
			return 1e6
		case 'K':
			return 1e3
		default:
			return 1
	}
}

const formatPct = (num: MaybeNumber, withSign = true): string => {
	if (typeof num !== 'number') return 'N/A'

	return `${num > 0 && withSign ? '+' : ''}${formatNumber(num)}%`
}

const formatDate = (
	dateString: MaybeString | Date,
	shortYear = true
): string => {
	if (typeof dateString !== 'string') return 'N/A'

	const d = new Date(dateString).toLocaleString('en-us', {
		month: 'short',
		year: shortYear ? '2-digit' : 'numeric',
		day: 'numeric'
	})

	if (d === 'Invalid Date') return 'N/A'
	return d
}

export { formatNumber, formatLetterToNumber, formatPct, formatDate }
