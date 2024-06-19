import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { Plus } from "lucide-react"
import { FormPopover } from "@/components/form/form-popover"
import { MobileSidebar } from "./mobile-sidebar"

export const Navbar = () => {
    return (
        <div className="w-full h-14 px-4 fixed top-0 z-50 border-b shadow-sm bg-white flex items-center">
            <MobileSidebar />
            <div className="flex items-center gap-x-4">
                <div className="hidden md:flex">
                    <Logo />
                </div>
                <FormPopover align="start" side="bottom" sideOffset={18}>
                    <Button variant='primary' size='sm' className="rounded-sm hidden md:block h-auto py-1.5 px-2">
                        Create
                    </Button>
                </FormPopover>
                <FormPopover>
                    <Button size='sm' className="rounded-sm block md:hidden" variant='primary'>
                        <Plus className="w-4 h-4" />
                    </Button>
                </FormPopover>
            </div>
            <div className="ml-auto flex items-center gap-x-2">
                <OrganizationSwitcher
                    hidePersonal
                    afterCreateOrganizationUrl='/organization/:id'
                    afterLeaveOrganizationUrl="/select-org"
                    afterSelectOrganizationUrl='/organization/:id'
                    appearance={{
                        elements: {
                            rootBox: {
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
                    }}
                />
                <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: {
                                width: 30,
                                height: 30
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}