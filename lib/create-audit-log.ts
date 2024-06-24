import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { db } from "./db";


interface Props {
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
    action: ACTION;
}

export const createAuditLog = async (props: Props) => {
    try {
        const { orgId } = auth()
        const user = await currentUser()

        console.log(user,'user');

        if (!user || !orgId) {
            throw new Error("User or orgId not found")
        }

        const { entityId, entityType, entityTitle, action } = props

        await db.auditLog.create({
            data: {
                orgId,
                entityId,
                entityType,
                entityTitle,
                action,
                userId: user.id,
                userImage: user.imageUrl,
                userName: user.username!,
            }
        })

    } catch (error) {
        console.log("[AUDIT_LOG_ERROR]", error);
    }
}