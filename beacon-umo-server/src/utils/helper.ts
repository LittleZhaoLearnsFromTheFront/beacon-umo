import { Config } from "@/config";
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

export const formatStaticUrl = (url: string) => {
    if (!url) return ''
    return "http://localhost:3000" + Config.prefix + Config.upload.file_prefix + url
}

export const validateEmail = (email: string) => {
    const re = /^(?!.*..)(?!.*.$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
