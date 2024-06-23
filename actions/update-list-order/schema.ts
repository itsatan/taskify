import { z } from 'zod'

export const UpdateListOrder = z.object({
    boardId: z.string(),
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            order: z.number(),
            createAt: z.date(),
            updateAt: z.date(),
        })
    )
})