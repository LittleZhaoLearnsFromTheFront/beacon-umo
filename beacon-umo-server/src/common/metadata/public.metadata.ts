import { SetMetadata } from "@nestjs/common"

export const PUBLIC_NAME = "AUTH_PUBLIC"

export const Public = () => SetMetadata(PUBLIC_NAME, true)