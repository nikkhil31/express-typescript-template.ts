import z from 'zod'

export const createUser = z.object({
    body: z.object({
        firstName: z.string(),
        lastName: z.string(),
        type: z.number(),
    }),
})

export const editUser = createUser.merge(
    z.object({
        body: z.object({
            id: z.number(),
        }),
    }),
)
