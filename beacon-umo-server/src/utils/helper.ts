import { IAnyObject } from "@/types";

export const sqlWhere = (where: IAnyObject) => {
    const newWhere: IAnyObject = {}
    Object.entries(where).forEach(([key, value]) => {
        if (!value) return
        newWhere[key] = value
    })
    return newWhere
}