import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import helmet from 'helmet'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule)
	app.useBodyParser('text')
	app.use(helmet())

	const PORT = process.env.PORT || 3000
	await app.listen(PORT)

	console.log(`Listening on port ${PORT}`)
	console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
}

bootstrap()
