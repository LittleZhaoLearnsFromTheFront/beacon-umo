import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CompleteUser } from "./dto/user.dto";
import { User, UserType } from "@/common/decorators/user.decorator";

@Controller("user")
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }


    @Post("complete")
    async completeUser(@Body() body: CompleteUser, @User() user: UserType) {
        return this.userService.completeUser(body, user);
    }

    @Get("validate-template")
    async validateTemplate(@User() user: UserType) {
        return this.userService.validateTemplate(user);
    }

}