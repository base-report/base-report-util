import { describe, expect, test } from 'vitest'
import { deepFreeze, difference } from '../src/object'

describe('deepFreeze', () => {
	test('returns a frozen object', () => {
		const obj = { prop1: { prop2: 'value' } }
		const result = deepFreeze(obj)
		expect(Object.isFrozen(result)).toBe(true)
	})

	test('freezes nested objects', () => {
		const obj = { prop1: { prop2: 'value' } }
		const result = deepFreeze(obj)
		expect(Object.isFrozen(result.prop1)).toBe(true)
	})

	test('throws an error when trying to modify a frozen object', () => {
		const obj = { prop1: { prop2: 'value' } }
		const frozenObj = deepFreeze(obj)
		expect(() => {
			frozenObj.prop1.prop2 = 'new value'
		}).toThrow(TypeError)
	})
})

describe('difference', () => {
	test('should return an empty object when both objects are equal', () => {
		const object = { a: 1, b: 2 }
		const base = { a: 1, b: 2 }
		expect(difference(object, base)).toEqual({})
	})

	test('should return the difference between two objects', () => {
		const object = { a: 1, b: 2, c: 3 }
		const base = { a: 1, b: 4, d: 5 }
		expect(difference(object, base)).toEqual({ b: 2, c: 3, d: 5 })
	})

	test('should return nested differences between two objects', () => {
		const object = { a: { b: 1, c: 2 }, d: 3 }
		const base = { a: { b: 4, e: 5 }, f: 6 }
		expect(difference(object, base)).toEqual({
			a: { b: 1, c: 2, e: 5 },
			d: 3,
			f: 6
		})
	})

	test('should not return any differences when the base object is empty', () => {
		const object = { a: 1, b: { c: 2 } }
		const base = {}
		expect(difference(object, base)).toEqual({ a: 1, b: { c: 2 } })
	})
})
