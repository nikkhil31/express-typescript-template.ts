import z, { SafeParseError, ZodError } from 'zod'
import * as dotenv from 'dotenv'
dotenv.config() // { path: `.env.${process.env.NODE_ENV}` }

// const envVars = process.env

const envSchema = z.object({
    NODE_ENV: z.string(),
    PORT: z.string(),
    API_KEY_TOKEN: z.string(),
})

const envVars = envSchema.safeParse(process.env)

if (envVars.success === false) {
    const error = envVars.error.issues.map(e => `${e.path} - ${e.message}`).join(', ')
    throw new Error(`Config validation error: ${error}. \n This app requires env variables to work properly.`)
}

export default {
    env: envVars.data.NODE_ENV,
    port: envVars.data.PORT,
    xApiKey: envVars.data.API_KEY_TOKEN,
}
