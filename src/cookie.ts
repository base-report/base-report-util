import { parse } from 'cookie'

const getAccessToken = (request: Request) => {
	const cookies = parse(request.headers.get('cookie') || '')
	return cookies['supabase-auth-token'] || null
}

export { getAccessToken }
