import { secretOrKey } from "@/common/constant";
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

    async validate(payload: { sub: string, openid: string }) {
        return { id: payload.sub, openid: payload.openid };
    }
}