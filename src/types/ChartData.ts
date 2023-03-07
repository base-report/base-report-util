import { stringTuple } from './helpers'

type ChartData = [
	o: number,
	h: number,
	l: number,
	c: number,
	v: number,
	t: number
]
type Timeseries = ChartData[]
type CustomTimeseries = {
	name: string
	daily: Timeseries
}

const INTRADAY_CHART_TIME_FRAMES = [
	'1min',
	'5min',
	'15min',
	'30min',
	'1hour',
	'4hour'
]

const CHART_TIME_FRAMES = [
	'daily',
	'weekly',
	'monthly',
	...INTRADAY_CHART_TIME_FRAMES
]

const itfValues = stringTuple(...INTRADAY_CHART_TIME_FRAMES)
type IntradayChartTimeFrame = (typeof itfValues)[number] // '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour'

const tfValues = stringTuple(...CHART_TIME_FRAMES)
type ChartTimeFrame = (typeof tfValues)[number] // 'daily' | 'weekly' | 'monthly' | '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour'

type MarkedMove = {
	entry: ChartData
	exit: ChartData
}

export type {
	ChartData,
	ChartTimeFrame,
	IntradayChartTimeFrame,
	MarkedMove,
	Timeseries,
	CustomTimeseries
}
export { CHART_TIME_FRAMES, INTRADAY_CHART_TIME_FRAMES }
