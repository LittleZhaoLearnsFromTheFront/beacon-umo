import { secretOrKey } from "@/common/constant";
import { UserOrigin } from "@/common/entitys/users.entity";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('x-jwt'),
            ignoreExpiration: false,
            secretOrKey,
        })
    }

    async validate(payload: { sub: string, openid?: string, origin: UserOrigin, email?: string }) {
        const { sub, openid, origin, email } = payload
        if (origin === UserOrigin.Applet && !openid) return false
        if (origin === UserOrigin.Client && !email) return false
        return { id: sub, openid, origin, email };
    }
}