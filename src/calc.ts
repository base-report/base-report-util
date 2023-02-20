import type { NumberOrNA } from './types/NumberOrNA'

const round = (value: NumberOrNA, decimals: number): NumberOrNA =>
	value === 'N/A' ? 'N/A' : Number(value.toFixed(decimals))

export { round }
