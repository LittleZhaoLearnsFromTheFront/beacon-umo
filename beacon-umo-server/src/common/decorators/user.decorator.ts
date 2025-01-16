import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserOrigin } from '../entitys/users.entity';

type DefaultUserType<T extends UserOrigin> = {
    id: number,
    origin: T,
}

export type UserType<T extends UserOrigin = UserOrigin.Applet> = T extends UserOrigin.Applet ? DefaultUserType<T> & { openid: string } : {
    email: string
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
