import { z } from 'zod'

export const UpdateBoard = z.object({
    id: z.string(),
    title: z.string({
        required_error: 'Title is Required',
        invalid_type_error: 'Title must be a string',
    }).min(3, {
        message: 'Title should have at least 3 characters'
    }),
})