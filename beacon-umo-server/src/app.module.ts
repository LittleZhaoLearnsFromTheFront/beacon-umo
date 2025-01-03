import { MiddlewareConsumer, Module, NestModule, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { DBModule } from './modules/db/db.module';
import { WXModule } from './modules/wx/wx.module';
import { CacheModule } from './modules/cache/cache.module';
import { XMLMiddleware } from './common/middlewares/xml.middleware';
import { WXController } from './modules/wx/wx.controller';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationException } from './common/exceptions';
import { stringifyError } from './utils';
import { BadRequestExceptionFilter, GlobalExceptionFilter, ValidationExceptionFilter } from './common/filters/global.filter';
import { UserModule } from './modules/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { secretOrKey } from './common/constant';

@Module({
  imports: [
    ConfigModule,
    DBModule,
    WXModule,
    CacheModule,
    AuthModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: secretOrKey,
      signOptions: {
        expiresIn: '30d'
      }
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory: (errors: ValidationError[]) => {
          const messages = errors
            .map((error) => Object.values(error.constraints))
            .flat();
          return new ValidationException(stringifyError(messages));
        },
      })
    }
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(XMLMiddleware).forRoutes(WXController)
  }

}
