import { IAnyObject } from "@/types";
import * as dayjs from "dayjs";

export const sqlWhere = (where: IAnyObject) => {
    const newWhere: IAnyObject = {}
    Object.entries(where).forEach(([key, value]) => {
        if (!value) return
        newWhere[key] = value
    })
    return newWhere
}

export const nowDate = () => dayjs().format('YYYY-MM-DD');
export const nowDateTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss');

export const stringifyError = (error: string[]) => {
    return error.join('^')
}

export const parseError = (error: string) => {
    return error.split('^')
}
