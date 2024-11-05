import {
	BadRequestException,
	createParamDecorator,
	UnsupportedMediaTypeException,
	type ExecutionContext
} from '@nestjs/common'
import type { Request } from 'express'

/**
 * @description
 * Makes sure that content type is `text/plain` and body is string.
 * Returns the trimmed body.
 *
 * @throws {UnsupportedMediaTypeException} If the content type is not `text/plain`.
 * @throws {BadRequestException} If the request body is not a string.
 */
export const TextPlainBody = createParamDecorator(
	(data: void, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest<Request>()
		if (!request.is('text/plain')) throw new UnsupportedMediaTypeException()

		const body = request.body
		if (typeof body !== 'string')
			throw new BadRequestException('Body must be a string')

		if (body.trim() === '')
			throw new BadRequestException('Body must not be empty')

		return body.trim()
	}
)
