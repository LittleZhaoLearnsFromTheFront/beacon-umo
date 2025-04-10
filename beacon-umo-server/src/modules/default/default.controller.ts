import { Public } from "@/common/metadata/public.metadata";
import { Controller, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { DefaultService } from "./default.service";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class DefaultController {

    constructor(
        private readonly defaultService: DefaultService
    ) { }

    @Public()
    @Post('upload/:type/file')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('type') type: string, @UploadedFile() file: Express.Multer.File) {
        return this.defaultService.uploadFile(type, file);
    }
}