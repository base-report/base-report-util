import { transform, isEqual, isObject } from 'lodash-es'
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

const difference = (object: GenericObject, base: GenericObject) =>
	transform(
		object,
		(result: GenericObject, value, key) => {
			if (!isEqual(value, base[key])) {
				result[key] =
					isObject(value) && isObject(base[key])
						? difference(value, base[key])
						: value
			}
		},
		transform(base, (result: GenericObject, value, key) => {
			if (!object.hasOwnProperty(key)) {
				result[key] = value
			}
		})
	)

export { deepFreeze, difference }
