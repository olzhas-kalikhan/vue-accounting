import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

const loginSchema = z.string().nonempty().max(100)
const tagsSchema = z.string().max(50)
const accountSchemaBase = z.object({ login: loginSchema, tags: tagsSchema })
export const accountSchema = z.discriminatedUnion('type', [
  accountSchemaBase.extend({
    type: z.literal('LDAP'),
    password: z.null().optional(),
  }),
  accountSchemaBase.extend({
    type: z.literal('local'),
    password: z.string().nonempty().max(100),
  }),
])

export type AccountSchema = z.infer<typeof accountSchema>
export const formValidationSchema = toTypedSchema(
  z.object({
    accounts: z.array(accountSchema),
  }),
)
