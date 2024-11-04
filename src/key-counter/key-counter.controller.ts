import {
	BadRequestException,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query
} from '@nestjs/common'
import { KeyCounterService } from './key-counter.service'
import { TextPlainBody } from './decorators/text-plain-body.decorator'

@Controller()
export class KeyCounterController {
	constructor(private readonly keyCounterService: KeyCounterService) {}

	/**
	 * @description
	 * Handles POST requests to `/input` to add or update a key's occurrence count.
	 * Does not return a response body, and instead returns a `204 No Content` status code.
	 */
	@Post('input')
	@HttpCode(HttpStatus.NO_CONTENT)
	async handleInput(@TextPlainBody() body: string): Promise<void> {
		this.keyCounterService.incrementKeyCount(body)
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

		return this.keyCounterService.getKeyCount(key)
	}
}
