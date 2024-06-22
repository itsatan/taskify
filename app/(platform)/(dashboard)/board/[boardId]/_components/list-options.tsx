"use client"

import { List } from "@prisma/client";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverClose
} from '@/components/ui/popover'
import { Button } from "@/components/ui/button";
import { MoreHorizontal, X } from "lucide-react";
import { FormSubmit } from "@/components/form/form-submit";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { deleteList } from "@/actions/delete-list";
import { toast } from "sonner";
import { ElementRef, useRef } from "react";
import { copyList } from "@/actions/copy-list";

interface ListOptionsProps {
    onAddCard: () => void;
    data: List;
}

export const ListOptions = ({
    onAddCard,
    data
}: ListOptionsProps) => {

    const closeRef = useRef<ElementRef<'button'>>(null)

    const { execute: executeDelete } = useAction(deleteList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" deleted successfully`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const { execute: executeCopy } = useAction(copyList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" copy successfully`)
            closeRef.current?.click()
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;
        executeDelete({ id, boardId })
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;
        executeCopy({ id, boardId })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="w-auto h-auto p-2" variant='ghost'>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="px-0 pt-3 pb-3" side='bottom' align='start'>
                <div className="text-sm font-medium text-center text-neutral-600 pb-4">
                    List actions
                </div>
                <PopoverClose asChild ref={closeRef}>
                    <Button className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600" variant='ghost'>
                        <X className="w-4 h-4" />
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                    variant='ghost'
                >
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input hidden id="id" name='id' value={data.id} />
                    <input hidden id='boardId' name='boardId' value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        variant='ghost'
                    >
                        Copy list...
                    </FormSubmit>
                </form>
                <Separator />
                <form action={onDelete}>
                    <input hidden id="id" name='id' value={data.id} />
                    <input hidden id='boardId' name='boardId' value={data.boardId} />
                    <FormSubmit
                        className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
                        variant='ghost'
                    >
                        Delete this list
                    </FormSubmit>
                </form>
            </PopoverContent>
        </Popover>
    )
}