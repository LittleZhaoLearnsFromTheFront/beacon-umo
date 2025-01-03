import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as xml from 'xml2js';

export class XMLMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const parse = new xml.Parser();
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            parse.parseString(data, (err: any, result: any) => {
                req.body = result;
                next();
            });
        });
        req.on('error', next);
    }
}