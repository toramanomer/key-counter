import { Test, TestingModule } from '@nestjs/testing'
import { KeyCounterController } from './key-counter.controller'

describe('KeyCounterController', () => {
	let controller: KeyCounterController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [KeyCounterController]
		}).compile()

		controller = module.get<KeyCounterController>(KeyCounterController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
