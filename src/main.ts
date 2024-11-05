import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.useBodyParser('text')
	app.use(helmet())
	app.getHttpServer().setTimeout(1 * 1000)

	const PORT = process.env.PORT || 9000
	await app.listen(PORT)

	console.log(`Listening on port ${PORT}`)
}

bootstrap()
