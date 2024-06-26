import { z } from 'zod'

export const UpdateCard = z.object({
    id: z.string(),
    boardId: z.string(),
    description: z.optional(
        z.string({
            required_error: 'Description is Required',
            invalid_type_error: 'Description must be a string'
        }).min(3, {
            message: 'Description is too short'
        })
    ),
    title: z.optional(
        z.string({
            required_error: 'Title is Required',
            invalid_type_error: 'Title must be a string',
        }).min(3, {
            message: 'Title is too short'
        })
    ),
})