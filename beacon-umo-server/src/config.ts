import { join } from "path";

export const Config = {
    upload: {
        path: join(__dirname, '../files'),
        file_prefix: '/file',
        max_age: 86400000 * 365
    },
    prefix: '/api',
}