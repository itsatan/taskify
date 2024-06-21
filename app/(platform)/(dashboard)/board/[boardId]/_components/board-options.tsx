"use client"

import { deleteBoard } from "@/actions/delete-board"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useAction } from "@/hooks/use-action"
import { MoreHorizontal, X } from "lucide-react"
import { toast } from "sonner"

interface BoardOptionsProps {
    id: string
}

export const BoardOptions = ({
    id
}: BoardOptionsProps) => {

    const { execute, isLoading } = useAction(deleteBoard, {
        onError: () => {
            toast.error("Failed to delete board")
        }
    })

    const onDelete = () => {
        execute({ id })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant='transparent'
                    className="w-auto h-auto p-2"
                >
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="start"
                side="bottom"
                className="px-0 pt-3 pb-3"
            >
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    Board actions
                </div>
                <PopoverClose asChild >
                    <Button
                        variant='ghost'
                        className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    variant='ghost'
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    disabled={isLoading}
                    onClick={onDelete}
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    )
}