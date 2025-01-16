import { Public } from "@/common/metadata/public.metadata";
import { Controller, Get } from "@nestjs/common";
import { DefaultService } from "./default.service";

@Controller()
export class DefaultController {

    constructor(
        private readonly defaultService: DefaultService
    ) { }

}