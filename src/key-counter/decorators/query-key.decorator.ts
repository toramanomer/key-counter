import {
	BadRequestException,
	createParamDecorator,
	type ExecutionContext
} from '@nestjs/common'
import type { Request } from 'express'

/**
 * @description
 * Makes sure that the query parameter `key` is a non-empty string.
 *
 * @throws {BadRequestException} If the query parameter `key` is not a string or is empty.
 */
export const QueryKey = createParamDecorator(
	(data: void, ctx: ExecutionContext) => {
		const key = ctx.switchToHttp().getRequest<Request>().query.key

		if (typeof key !== 'string')
			throw new BadRequestException(
				"Query parameter 'key' must be a string"
			)
		if (key.trim().length === 0)
			throw new BadRequestException(
				"Query parameter 'key' must not be empty"
			)

		return key.trim()
	}
)
