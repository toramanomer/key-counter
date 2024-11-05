import { Module } from '@nestjs/common'
import { KeyCounterModule } from './key-counter/key-counter.module'

@Module({
	imports: [KeyCounterModule]
})
export class AppModule {}
