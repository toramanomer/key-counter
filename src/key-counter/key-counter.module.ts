import { Module } from '@nestjs/common'
import { KeyCounterController } from './key-counter.controller'
import { KeyCounterService } from './key-counter.service'

@Module({
	controllers: [KeyCounterController],
	providers: [KeyCounterService]
})
export class KeyCounterModule {}
