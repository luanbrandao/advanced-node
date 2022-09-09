import './config/module-alias'

import 'reflect-metadata' // reflect-metadata, para rodar os testes do pg

import { app } from '@/main/config/app'
import { env } from '@/main/config/env'

app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
