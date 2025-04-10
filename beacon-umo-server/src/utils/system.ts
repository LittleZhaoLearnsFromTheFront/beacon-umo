import { Config } from "@/config"

export const isDev = process.env.NODE_ENV === 'development'

export const staticUrl = Config.prefix + Config.upload.file_prefix