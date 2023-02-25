import type { GenericObject } from './types/GenericObject'

const deepFreeze = (object: GenericObject) => {
	// Retrieve the property names defined on object
	const propNames = Object.getOwnPropertyNames(object)

	// Freeze properties before freezing self

	for (const name of propNames) {
		const value = object[name]

		if (value && typeof value === 'object') {
			deepFreeze(value)
		}
	}

	return Object.freeze(object)
}

const difference = (object: GenericObject, base: GenericObject) => {
	const result: GenericObject = {}
	const objectKeys = Object.keys(object)
	const baseKeys = Object.keys(base)

	objectKeys.forEach((key) => {
		if (!baseKeys.includes(key)) {
			result[key] = object[key]
		} else {
			const objectValue = object[key]
			const baseValue = base[key]

			if (typeof objectValue === 'object' && typeof baseValue === 'object') {
				const differenceObj = difference(objectValue, baseValue)
				if (Object.keys(differenceObj).length > 0) {
					result[key] = differenceObj
				}
			} else if (objectValue !== baseValue) {
				result[key] = objectValue
			}
		}
	})

	baseKeys.forEach((key) => {
		if (!objectKeys.includes(key)) {
			result[key] = base[key]
		}
	})

	return result
}

export { deepFreeze, difference }
