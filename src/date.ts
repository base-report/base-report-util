const getWeek = (_d: Date): number => {
	const d = new Date(Date.UTC(_d.getFullYear(), _d.getMonth(), _d.getDate()))

	// Set to nearest Thursday: current date + 4 - current day number
	// Make Sunday's day number 7
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

	// Get first day of year
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))

	// Calculate full weeks to nearest Thursday
	const w = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
	return w > 52 ? 1 : w
}

// Compare a date string to see if it has surpassed the current date
// Set both to the same timezone to avoid any timezone issues
// Set both dates to the start of the day to avoid any time issues
const isDatePast = (date: string): boolean => {
	const now = new Date()
	const dateToCheck = new Date(date)

	now.setHours(0, 0, 0, 0)
	dateToCheck.setHours(0, 0, 0, 0)

	return now.getTime() > dateToCheck.getTime()
}

export { getWeek, isDatePast }
