import { describe, expect, test } from 'vitest'
import { getAccessToken } from '../src/cookie'

describe('getAccessToken', () => {
	test('returns null when no auth token is present', () => {
		const request = new Request('https://example.com')
		const result = getAccessToken(request)
		expect(result).toBeNull()
	})

	test('returns the auth token when present in cookies', () => {
		const request = new Request('https://example.com', {
			headers: {
				cookie: 'supabase-auth-token=abc123'
			}
		})
		const result = getAccessToken(request)
		expect(result).toBe('abc123')
	})
})
