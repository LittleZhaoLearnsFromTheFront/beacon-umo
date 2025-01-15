import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type UserType = {
    id: number,
    openid: string
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
