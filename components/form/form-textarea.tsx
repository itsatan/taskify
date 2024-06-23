"use client"

import { Label } from "@radix-ui/react-label";
import { KeyboardEventHandler, forwardRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormErrors } from "@/components/form/form-errors";
import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";

interface FormTextareaProps {
    id: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(({
    id,
    label,
    placeholder,
    required,
    disabled,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
    defaultValue
}, ref) => {

    const { pending } = useFormStatus()

    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                {
                    label ? (
                        <Label
                            htmlFor={id}
                            className="text-xs font-semibold text-neutral-700"
                        >
                            {label}
                        </Label>
                    ) : null
                }
                <Textarea
                    ref={ref}
                    id={id}
                    name={id}
                    required={required}
                    placeholder={placeholder}
                    disabled={pending || disabled}
                    className={cn("resize-none focus-visible:right-0 focus-visible:ring-offset-0 right-0 focus:right-0 outline-none shadow-sm", className)}
                    defaultValue={defaultValue}
                    aria-describedby={`${id}-error`}
                    onBlur={onBlur}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                />
                <FormErrors id={id} errors={errors} />
            </div>
        </div>
    )
})

FormTextarea.displayName = "FormTextarea";