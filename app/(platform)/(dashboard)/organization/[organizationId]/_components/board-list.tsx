import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {
    return (
        <div className="space-y-4">
            <div className="flex items-center font-semibold text-lg text-neutral-700">
                <User2 className="w-6 h-6 mr-2" />
                Your boards
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    role="button"
                    className="aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                >
                    <p className="text-sm">
                        Create new board
                    </p>
                    <span className="text-xs">
                        5 remaining
                    </span>
                    <Hint
                        sideOffset={40}
                        description={`
                            Free workspaces can have up to 5 open boards. For unlimited
                            boards upgrade this workspace.
                        `}
                    >
                        <HelpCircle className="w-[14px] h-[14px] absolute right-2 bottom-2" />
                    </Hint>
                </div>
            </div>
        </div>
    )
}