import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, UnauthorizedException } from "@nestjs/common";
import { ValidationException } from "../exceptions";
import { Response } from "express";
import Result from "../result/Result";
import { parseError } from "@/utils";
import { HttpStatus } from "../constant/HttpStatus";

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        res.status(HttpStatus.Validation).send(Result.Validation(undefined, parseError(exception.message)?.[0]));
    }
}

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        res.status(HttpStatus.BAD_REQUEST).send(Result.BadRequest(exception.message));
    }
}
@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
        const res = host.switchToHttp().getResponse<Response>();
        res.status(HttpStatus.UNAUTHORIZED).send(Result.Unauthorized());
    }
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception);
        const res = host.switchToHttp().getResponse<Response>();
        res.status(HttpStatus.BAD_REQUEST).send(Result.Error());
    }
}