import {
	BadRequestException,
	Body,
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	UnsupportedMediaTypeException
} from '@nestjs/common'

@Controller()
export class KeyCounterController {
	private keyCounts = new Map<string, number>()

	/**
	 * @description
	 * Handles POST requests to `/input` to add or update a key's occurrence count.
	 * Does not return a response body, and instead returns a `204 No Content` status code.
	 *
	 * @throws {UnsupportedMediaTypeException} If the content type is not `text/plain`.
	 * @throws {BadRequestException} If the request body is not a string.
	 */
	@Post('input')
	@HttpCode(HttpStatus.NO_CONTENT)
	handleInput(
		@Headers('content-type') contentType: string,
		@Body() body: any
	): void {
		if (contentType !== 'text/plain')
			throw new UnsupportedMediaTypeException()

		if (typeof body !== 'string')
			throw new BadRequestException('Request body must be a string')

		const count = this.keyCounts.get(body) ?? 0
		this.keyCounts.set(body, count + 1)
	}

	/**
	 * @description
	 * Handles GET requests to `/query` to retrieve the occurrence count of a key.
	 *
	 * @throws {BadRequestException} If the query parameter `key` is not a string.
	 */
	@Get('/query')
	async handleQuery(@Query('key') key: any): Promise<string> {
		if (typeof key !== 'string')
			throw new BadRequestException(
				"Query parameter 'key' must be a string"
			)

		const count = this.keyCounts.get(key) ?? 0
		return count.toString()
	}
}
