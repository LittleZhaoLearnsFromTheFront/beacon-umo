import { Controller, Get } from "@nestjs/common";
import { HomeService } from "./home.service";
import { User, UserType } from "@/common/decorators/user.decorator";
import Result from "@/common/result/Result";

@Controller('home')
export class HomeController {
    constructor(
        private readonly homeService: HomeService,
    ) { }

    @Get()
    async getHomeConfig(@User() user: UserType) {
        const data = await this.homeService.getHomeConfig(user);
        return data
    }
}