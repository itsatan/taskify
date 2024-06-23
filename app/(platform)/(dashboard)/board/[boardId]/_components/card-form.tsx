"use client"

import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFromProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFromProps>(({
    listId,
    isEditing,
    enableEditing,
    disableEditing
}, ref) => {

    const params = useParams()
    const formRef = useRef<ElementRef<'form'>>(null)

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created successfully`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    useOnClickOutside(formRef, disableEditing)
    useEventListener('keydown', onKeyDown)

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit()
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string
        const listId = formData.get('listId') as string
        const boardId = params.boardId as string
        execute({ title, listId, boardId })
    }

    if (isEditing) {
        return (
            <form
                ref={formRef}
                action={onSubmit}
                className="m-1 py-0.5 px-1 space-y-4"
            >
                <FormTextarea
                    ref={ref}
                    id="title"
                    placeholder="Enter a title for this card..."
                    onKeyDown={onTextareaKeyDown}
                    errors={fieldErrors}
                />
                <input hidden id="listId" name="listId" value={listId} />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button
                        size='sm'
                        variant='ghost'
                        onClick={disableEditing}
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className="pt-2 px-2">
            <Button
                size='sm'
                variant='ghost'
                onClick={enableEditing}
                className="w-full h-auto px-2 py-1.5 justify-start text-muted-foreground text-sm"
            >
                <Plus className="w-4 h-4 mr-2" />
                Add a card
            </Button>
        </div>
    )
})

CardForm.displayName = "CardForm";