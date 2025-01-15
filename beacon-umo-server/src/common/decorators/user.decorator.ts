import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserOrigin } from '../entitys/users.entity';

export type UserType = {
    id: number,
    openid: string,
    origin: UserOrigin
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
