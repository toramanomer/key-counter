import type { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'
import { HttpStatus } from '@nestjs/common'

import { Test } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

describe('Key Counter (e2e)', () => {
	let app: NestExpressApplication

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile()

		app = moduleRef.createNestApplication()
		app.useBodyParser('text')
		app.use(helmet())
		app.getHttpServer().setTimeout(1 * 1000)
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	//////////////////////////////////////////////
	// POST /input - Unsupported Media Type
	//////////////////////////////////////////////
	it.each([
		{ body: 'input', test: 'when content type is missing' },
		{
			contentType: 'application/x-www-form-urlencoded',
			test: 'when content type is not text/plain'
		},
		{
			body: JSON.stringify({}),
			contentType: 'application/json',
			test: 'when body is string but content type is not text/plain'
		}
	])(
		`POST /input - should return ${HttpStatus.UNSUPPORTED_MEDIA_TYPE} $test`,
		async ({ body, contentType }) => {
			return request(app.getHttpServer())
				.post('/input')
				.set('Content-Type', contentType)
				.send(body)
				.expect(HttpStatus.UNSUPPORTED_MEDIA_TYPE, {
					statusCode: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
					message: 'Unsupported Media Type'
				})
		}
	)

	//////////////////////////////////////////////
	// POST /input - Bad Request
	//////////////////////////////////////////////
	it.each(['', '   '])(
		'POST /input - should return Bad Request when body is an empty string',
		async body => {
			return request(app.getHttpServer())
				.post('/input')
				.set('Content-Type', 'text/plain')
				.send(body)
				.expect(HttpStatus.BAD_REQUEST, {
					statusCode: HttpStatus.BAD_REQUEST,
					message: 'Body must not be empty',
					error: 'Bad Request'
				})
		}
	)

	//////////////////////////////////////////////
	// GET /query - Bad Request
	//////////////////////////////////////////////
	it('GET /query - should return Bad Request when key is missing', async () => {
		return request(app.getHttpServer())
			.get('/query')
			.expect(HttpStatus.BAD_REQUEST, {
				statusCode: HttpStatus.BAD_REQUEST,
				message: "Query parameter 'key' must be a string",
				error: 'Bad Request'
			})
	})

	it('GET /query - should return "0" for a non-existing key', async () => {
		return request(app.getHttpServer())
			.get('/query')
			.query({ key: 'nonExistingKey' })
			.expect(HttpStatus.OK, '0')
	})

	it('GET /query - should return the count for an existing key', async () => {
		const key = 'existingKey'

		await request(app.getHttpServer())
			.post('/input')
			.set('Content-Type', 'text/plain')
			.send(key)
			.expect(HttpStatus.NO_CONTENT)

		await request(app.getHttpServer())
			.get('/query')
			.query({ key })
			.expect(HttpStatus.OK, '1')

		// Increment the count
		await request(app.getHttpServer())
			.post('/input')
			.set('Content-Type', 'text/plain')
			.send(key)
			.expect(HttpStatus.NO_CONTENT)

		await request(app.getHttpServer())
			.get('/query')
			.query({ key })
			.expect(HttpStatus.OK, '2')
	})
})
