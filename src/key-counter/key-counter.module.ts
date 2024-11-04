import { Module } from '@nestjs/common'
import { KeyCounterController } from './key-counter.controller'

@Module({
	controllers: [KeyCounterController]
})
export class KeyCounterModule {}
