import type { MaybeNumber, MaybeString } from './types/Maybes'
import type { NumberOrNA } from './types/NumberOrNA'

const formatNumber = (n: MaybeNumber | NumberOrNA, decimals = 2): string => {
	if (n === 'N/A' || n === null || !isFinite(n)) return 'N/A'

	const num = Number(n)

	return Math.abs(num) >= 1.0e12
		? (num / 1.0e12).toFixed(decimals) + ' T'
		: Math.abs(num) >= 1.0e9
		? (num / 1.0e9).toFixed(decimals) + ' B'
		: Math.abs(num) >= 1.0e6
		? (num / 1.0e6).toFixed(decimals) + ' M'
		: Math.abs(num) >= 1.0e3
		? (num / 1.0e3).toFixed(decimals) + ' K'
		: num.toFixed(decimals)
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
