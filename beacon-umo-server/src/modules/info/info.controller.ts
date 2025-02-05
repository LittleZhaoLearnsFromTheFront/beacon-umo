import { Controller, Get } from "@nestjs/common";
import { InfoService } from "./info.service";
import { User, UserType } from "@/common/decorators/user.decorator";
import { UserOrigin } from "@/common/entitys/users.entity";

@Controller()
export class InfoController {

    constructor(private readonly infoService: InfoService) { }

    @Get('info')
    info(@User() user: UserType<UserOrigin.Client>) {
        return this.infoService.info(user);
    }
}