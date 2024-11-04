import { Test, TestingModule } from '@nestjs/testing'
import { KeyCounterService } from './key-counter.service'

describe('KeyCounterService', () => {
	let service: KeyCounterService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [KeyCounterService]
		}).compile()

		service = module.get<KeyCounterService>(KeyCounterService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
