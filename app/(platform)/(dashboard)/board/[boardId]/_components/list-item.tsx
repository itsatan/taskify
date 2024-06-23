"use client"

import { ListWithCards } from "@/types"
import { ListHeader } from "./list-header"
import { ElementRef, useRef, useState } from "react"
import { CardForm } from "./card-form"
import { cn } from "@/lib/utils"
import { CardItem } from "./card-item"

interface ListItemProps {
    data: ListWithCards
    index: number
}

export const ListItem = ({
    data,
    index
}: ListItemProps) => {

    const textareaRef = useRef<ElementRef<'textarea'>>(null)

    const [isEditing, setIsEditing] = useState(false)

    const disableEditing = () => {
        setIsEditing(false)
    }

    const enableEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            textareaRef.current?.focus()
        })
    }

    return (
        <li className="shrink-0 h-full w-[272px] select-none">
            <div className="w-full rounded bg-[#f1f2f4] shadow-md pb-2">
                <ListHeader
                    data={data}
                    onAddCard={enableEditing}
                />
                <ol
                    className={cn(
                        'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                        data.cards.length > 0 ? 'mt-2' : 'mt-0'
                    )}
                >
                    {data.cards.map((card, index) => {
                        return (
                            <CardItem
                                key={card.id}
                                index={index}
                                data={card}
                            />
                        )
                    })}
                </ol>
                <CardForm
                    ref={textareaRef}
                    listId={data.id}
                    isEditing={isEditing}
                    enableEditing={enableEditing}
                    disableEditing={disableEditing}
                />
            </div>
        </li>
    )
}